"use client" // Indique que ce composant sera rendu côté client (Next.js)

import { ShoppingCart } from "lucide-react" // Import de l'icône de panier depuis la librairie Lucide
import { Button } from "@/components/ui/button" // Import du composant Button personnalisé
import { Badge } from "@/components/ui/badge" // Import du composant Badge pour afficher le nombre d'articles
import { useCart } from "@/lib/cart-context" // Import du hook personnalisé pour accéder au contexte du panier
import { useState, useEffect } from "react"
import Link from "next/link" // Import du composant Link de Next.js pour la navigation côté client

export function CartButton() { // Déclaration du composant CartButton
  const { itemCount } = useCart() // Récupération du nombre d'articles dans le panier depuis le contexte
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Button variant="outline" size="icon" className="relative bg-transparent" asChild>
      {/* Le bouton utilise le composant Link comme enfant pour la navigation */}
      <Link href="/panier">
        <ShoppingCart className="h-5 w-5" /> {/* Icône du panier */}
        {mounted && itemCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
            {/* Badge affichant le nombre d'articles si > 0 */}
            {itemCount}
          </Badge>
        )}
      </Link>
    </Button>
  )
}
