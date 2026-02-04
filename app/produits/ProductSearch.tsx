"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/ProductCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, Loader2 } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function ProductSearch() {
    const [mounted, setMounted] = useState(false)
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setMounted(true)
    }, [])
    const [searchQuery, setSearchQuery] = useState("")
    const [filters, setFilters] = useState({
        minPrice: 0,
        maxPrice: 5000,
        categories: [] as string[],
        brands: [] as string[],
    })

    // Debounce search query to avoid too many API calls
    const debouncedSearch = useDebounce(searchQuery, 500)
    const debouncedFilters = useDebounce(filters, 500)

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const params = new URLSearchParams()
                if (debouncedSearch) params.set("q", debouncedSearch)
                if (debouncedFilters.minPrice > 0) params.set("minPrice", debouncedFilters.minPrice.toString())
                if (debouncedFilters.maxPrice < 5000) params.set("maxPrice", debouncedFilters.maxPrice.toString())

                // Note: The API we built currently supports single category/brand for simplicity, 
                // but for a full filter implementation we might want to support multiple. 
                // For now, if multiple are selected, we might only send one or need to update API.
                // Let's stick to single selection support in UI logic for now or update API later.
                // Actually, let's update logic to support the current API which takes one 'category' param.
                // If we want multiple, we need OR logic in API.
                // For this first version, let's pick the first selected category if any.

                if (debouncedFilters.categories.length > 0) {
                    params.set("category", debouncedFilters.categories[0])
                }

                if (debouncedFilters.brands.length > 0) {
                    params.set("brand", debouncedFilters.brands[0])
                }

                const res = await fetch(`/api/products/search?${params.toString()}`)
                const data = await res.json()

                if (data.products) {
                    // Map DB keys to ProductCard expected props
                    const mappedProducts = data.products.map((p: any) => ({
                        id: p.id.toString(),
                        name: p.nom,
                        brand: p.marque || "Générique",
                        price: p.prix_ttc,
                        image: p.image_principale || "/placeholder.jpg",
                        rating: 4.5, // Mock rating for now
                        features: [p.puissance ? `${p.puissance}` : null, p.reference].filter(Boolean),
                        categorie: p.categorie?.slug || "general",
                        badge: p.en_vedette ? "Populaire" : undefined
                    }))
                    setProducts(mappedProducts)
                }
            } catch (error) {
                console.error("Failed to fetch products", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [debouncedSearch, debouncedFilters])

    const handleCategoryChange = (category: string) => {
        setFilters(prev => {
            const newCategories = prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [category] // Single selection for now to match API
            return { ...prev, categories: newCategories }
        })
    }

    const handleBrandChange = (brand: string) => {
        setFilters(prev => {
            const newBrands = prev.brands.includes(brand)
                ? prev.brands.filter(b => b !== brand)
                : [brand] // Single selection
            return { ...prev, brands: newBrands }
        })
    }

    return (
        <div className="grid lg:grid-cols-4 gap-8 min-h-[400px]">
            {!mounted ? (
                <div className="lg:col-span-4 flex justify-center items-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <>
                    {/* Sidebar Filters */}
                    <aside className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <h3 className="font-bold text-lg mb-4">Filtres</h3>

                            {/* Categories */}
                            <div className="mb-6">
                                <h4 className="font-medium mb-3">Catégories</h4>
                                <div className="space-y-2">
                                    {['climatisation', 'chauffage', 'pompes-a-chaleur', 'ventilation', 'accessoires'].map((cat) => (
                                        <div key={cat} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={cat}
                                                checked={filters.categories.includes(cat)}
                                                onCheckedChange={() => handleCategoryChange(cat)}
                                            />
                                            <Label htmlFor={cat} className="capitalize">{cat.replace(/-/g, ' ')}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Brands */}
                            <div className="mb-6">
                                <h4 className="font-medium mb-3">Marques</h4>
                                <div className="space-y-2">
                                    {['GREE', 'DAIKIN', 'MITSUBISHI', 'ATLANTIC'].map((brand) => (
                                        <div key={brand} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={brand}
                                                checked={filters.brands.includes(brand)}
                                                onCheckedChange={() => handleBrandChange(brand)}
                                            />
                                            <Label htmlFor={brand}>{brand}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h4 className="font-medium mb-3">Prix</h4>
                                <Slider
                                    defaultValue={[0, 5000]}
                                    max={5000}
                                    step={100}
                                    value={[filters.minPrice, filters.maxPrice]}
                                    onValueChange={(val) => setFilters({ ...filters, minPrice: val[0], maxPrice: val[1] })}
                                    className="mb-2"
                                />
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>{filters.minPrice}€</span>
                                    <span>{filters.maxPrice}€</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Search Bar & Sort */}
                        <div className="mb-6 flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Rechercher un produit..."
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Trier par" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pertinence">Pertinence</SelectItem>
                                    <SelectItem value="prix_asc">Prix croissant</SelectItem>
                                    <SelectItem value="prix_desc">Prix décroissant</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Results */}
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed">
                                <p className="text-lg text-gray-500">Aucun produit ne correspond à votre recherche.</p>
                                <Button variant="link" onClick={() => setFilters({ minPrice: 0, maxPrice: 5000, categories: [], brands: [] })}>
                                    Réinitialiser les filtres
                                </Button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}
