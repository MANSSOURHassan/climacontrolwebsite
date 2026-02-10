"use client"

import { useComparison } from "@/lib/comparison-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ShoppingCart, Check, Minus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function ComparateurPage() {
    const { items, removeItem, clearComparison } = useComparison()
    const { addItem } = useCart()
    const { toast } = useToast()

    const handleAddToCart = (product: any) => {
        addItem({
            id: product.id,
            nom: product.name,
            prix: product.price,
            image: product.image,
            categorie: product.categorie,
        })
        toast({
            title: "Produit ajouté au panier",
            description: `${product.name} a été ajouté à votre panier`,
        })
    }

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold mb-6">Comparateur de Produits</h1>
                <p className="text-gray-600 mb-8">Vous n'avez pas encore sélectionné de produits à comparer.</p>
                <Button asChild>
                    <Link href="/produits">Parcourir le catalogue</Link>
                </Button>
            </div>
        )
    }

    // Feature list normalization logic would go here if needed
    // For now we assume features are strings. We could extract common features if structured.
    // Or just display the features list row.

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Comparateur</h1>
                <Button variant="outline" onClick={clearComparison} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <X className="mr-2 h-4 w-4" /> Vider le comparateur
                </Button>
            </div>

            <div className="overflow-x-auto pb-8">
                <table className="w-full border-collapse min-w-[800px]">
                    <thead>
                        <tr>
                            <th className="p-4 border-b w-1/5 bg-gray-50 text-left font-semibold text-gray-500">Caractéristiques</th>
                            {items.map((item) => (
                                <th key={item.id} className="p-4 border-b w-1/5 relative bg-white">
                                    <div className="absolute top-2 right-2">
                                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="relative h-32 w-full mb-4">
                                            <Image
                                                src={item.image || "/placeholder.jpg"}
                                                alt={item.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <Link href={`/produits/${item.id}`} className="text-lg font-bold hover:text-primary text-center mb-1 line-clamp-2 h-14">
                                            {item.name}
                                        </Link>
                                        <span className="text-sm text-gray-500 mb-2">{item.brand}</span>
                                        <p className="text-xl font-bold text-primary mb-4">{item.price.toLocaleString('fr-FR')} €</p>
                                        <Button className="w-full" onClick={() => handleAddToCart(item)}>
                                            <ShoppingCart className="mr-2 h-4 w-4" /> Ajouter
                                        </Button>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Marques */}
                        <tr className="border-b hover:bg-gray-50">
                            <td className="p-4 font-medium text-gray-700">Marque</td>
                            {items.map((item) => (
                                <td key={item.id} className="p-4 text-center">{item.brand}</td>
                            ))}
                        </tr>

                        {/* Catégorie */}
                        <tr className="border-b hover:bg-gray-50">
                            <td className="p-4 font-medium text-gray-700">Catégorie</td>
                            {items.map((item) => (
                                <td key={item.id} className="p-4 text-center capitalise">
                                    <Badge variant="secondary">{item.categorie}</Badge>
                                </td>
                            ))}
                        </tr>

                        {/* Note */}
                        <tr className="border-b hover:bg-gray-50">
                            <td className="p-4 font-medium text-gray-700">Avis clients</td>
                            {items.map((item) => (
                                <td key={item.id} className="p-4 text-center font-bold text-yellow-500">
                                    {item.rating} / 5
                                </td>
                            ))}
                        </tr>

                        {/* Fonctionnalités / Caractéristiques (liste brute pour l'instant) */}
                        <tr className="border-b hover:bg-gray-50">
                            <td className="p-4 font-medium text-gray-700 align-top">Caractéristiques</td>
                            {items.map((item) => (
                                <td key={item.id} className="p-4 align-top">
                                    <ul className="text-sm space-y-2 text-left list-disc pl-5">
                                        {item.features.map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                </td>
                            ))}
                        </tr>

                        {/* Ligne "Vider" en bas aussi pour ergonomie */}
                        <tr>
                            <td className="p-4"></td>
                            {items.map((item) => (
                                <td key={item.id} className="p-4 text-center">
                                    <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="text-red-500 hover:bg-red-50">
                                        Retirer
                                    </Button>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
