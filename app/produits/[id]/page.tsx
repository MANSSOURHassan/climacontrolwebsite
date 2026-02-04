import { notFound } from "next/navigation"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Truck, ShieldCheck, Thermometer, ShoppingCart } from "lucide-react"
import AddToCartButton from "./AddToCartButton" // We'll create this helper
import ReviewsSection from "./ReviewsSection" // We'll create this

export const revalidate = 60 // Revalidate every minute

async function getProduct(id: string) {
    const { data: product } = await supabase
        .from("produits")
        .select("*, categorie:categories(nom, slug)")
        .eq("id", id)
        .single()

    return product
}

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;

    // Si l'ID n'est pas un nombre, c'est probablement un asset manquant (ex: logo.png) 
    // qui a été capturé par la route dynamique. On retourne 404 au lieu de faire planter le SQL.
    if (isNaN(Number(params.id))) {
        notFound()
    }

    const product = await getProduct(params.id)

    if (!product) {
        notFound()
    }

    return (
        <main className="min-h-screen py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden border">
                    <div className="grid md:grid-cols-2 gap-0">
                        {/* Image Section */}
                        <div className="p-8 bg-gray-100 flex items-center justify-center relative min-h-[400px]">
                            <div className="relative w-full h-full min-h-[400px]">
                                <Image
                                    src={product.image_principale || "/placeholder.jpg"}
                                    alt={product.nom}
                                    fill
                                    className="object-contain hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            {product.en_vedette && (
                                <Badge className="absolute top-6 left-6 text-lg py-2 px-4 shadow-md">
                                    Best Seller
                                </Badge>
                            )}
                        </div>

                        {/* Content Section */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <div className="mb-6">
                                <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">
                                    {product.categorie?.nom || "Non catégorisé"} • {product.marque}
                                </p>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                                    {product.nom}
                                </h1>

                                {/* Rating Placeholder */}
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="flex text-yellow-500">
                                        <Star className="fill-current w-5 h-5" />
                                        <Star className="fill-current w-5 h-5" />
                                        <Star className="fill-current w-5 h-5" />
                                        <Star className="fill-current w-5 h-5" />
                                        <Star className="fill-current w-5 h-5 opacity-50" />
                                    </div>
                                    <span className="text-gray-500 text-sm font-medium">(4.5/5 basé sur 24 avis)</span>
                                </div>

                                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                    {product.description}
                                </p>

                                {/* Features Grid */}
                                {product.caracteristiques && (
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        {Object.entries(product.caracteristiques).map(([key, value]) => (
                                            <div key={key} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                <Thermometer className="w-5 h-5 text-primary" />
                                                <div>
                                                    <span className="text-xs text-gray-500 uppercase block">{key}</span>
                                                    <span className="font-semibold text-gray-900">{value as string}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="mt-auto border-t pt-8">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-sm line-through decoration-red-400">{(product.prix_ttc * 1.1).toFixed(2)} €</span>
                                        <span className="text-4xl font-bold text-primary">{product.prix_ttc} €</span>
                                        <span className="text-sm text-green-600 font-medium">En stock, expédié sous 24h</span>
                                    </div>
                                    <AddToCartButton product={product} />
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Truck className="w-5 h-5 text-primary" />
                                        Livraison offerte dès 500€
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="w-5 h-5 text-primary" />
                                        Garantie constructeur 5 ans
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <ReviewsSection productId={product.id} />
            </div>
        </main>
    )
}
