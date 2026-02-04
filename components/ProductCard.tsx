"use client" // Indique que ce composant sera rendu côté client (Next.js)

import { Button } from "@/components/ui/button" // Import du composant Button personnalisé
import { Card, CardContent, CardFooter } from "@/components/ui/card" // Import des composants Card pour structurer le produit
import { Badge } from "@/components/ui/badge" // Import du composant Badge pour afficher des étiquettes
import { Star, ShoppingCart, Info } from "lucide-react" // Import des icônes Star, ShoppingCart et Info
import Image from "next/image" // Import du composant Image pour les images optimisées
import Link from "next/link" // Import du composant Link pour la navigation côté client
import { useCart } from "@/lib/cart-context" // Import du hook pour gérer le panier
import { useToast } from "@/hooks/use-toast" // Import du hook pour afficher des notifications toast

// Définition de l'interface Product
interface Product {
  id: string
  name: string
  brand: string
  price: number
  image: string
  rating: number
  features: string[]
  badge?: string
  categorie: string
}

export function ProductCard({ product }: { product: Product }) { // Composant ProductCard
  const { addItem } = useCart() // Récupère la fonction pour ajouter un produit au panier
  const { toast } = useToast() // Récupère la fonction pour afficher une notification

  // Fonction pour ajouter le produit au panier et afficher un toast
  const handleAddToCart = () => {
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

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow border">
      {/* Carte du produit avec effet hover */}
      <div className="relative">
        <Image
          src={product.image || "/placeholder.jpg"} // Image du produit ou placeholder
          alt={product.name} // Texte alternatif
          width={400}
          height={300}
          className="w-full h-48 object-cover" // Dimension et style de l'image
        />
        {product.badge && <Badge className="absolute top-2 right-2">{product.badge}</Badge>}
        {/* Badge affiché si défini */}
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-1">{product.brand}</p> {/* Marque */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3> {/* Nom du produit */}

        {/* Évaluation par étoiles */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
        </div>

        {/* Liste des caractéristiques */}
        <ul className="space-y-1 mb-4">
          {product.features.map((feature: string, index: number) => (
            <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary" /> {/* Petit point avant chaque caractéristique */}
              {feature}
            </li>
          ))}
        </ul>

        {/* Prix */}
        <p className="text-xl font-bold text-gray-900">{product.price}€</p>
      </CardContent>

      {/* Footer avec boutons */}
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button className="flex-1" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Ajouter au panier
        </Button>
        <Button variant="outline" size="icon" asChild>
          <Link href="/devis">
            <Info className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
