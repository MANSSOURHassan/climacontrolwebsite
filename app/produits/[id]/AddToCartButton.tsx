"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function AddToCartButton({ product }: { product: any }) {
    const { addItem } = useCart()
    const { toast } = useToast()

    const handleAddToCart = () => {
        addItem({
            id: product.id.toString(),
            nom: product.nom,
            prix: product.prix_ttc,
            image: product.image_principale,
            categorie: product.categorie?.slug || "general",
        })
        toast({
            title: "Produit ajouté !",
            description: `${product.nom} a été ajouté au panier.`,
        })
    }

    return (
        <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-6 w-6" />
            Ajouter au panier
        </Button>
    )
}
