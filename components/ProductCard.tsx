"use client" // Indique que ce composant sera rendu côté client (Next.js)

import { Button } from "@/components/ui/button" // Import du composant Button personnalisé
import { Card, CardContent, CardFooter } from "@/components/ui/card" // Import des composants Card pour structurer le produit
import { Badge } from "@/components/ui/badge" // Import du composant Badge pour afficher des étiquettes
import { Star, ShoppingCart, Info } from "lucide-react" // Import des icônes Star, ShoppingCart et Info
import Image from "next/image" // Import du composant Image pour les images optimisées
import Link from "next/link" // Import du composant Link pour la navigation côté client
import { useComparison } from "@/lib/comparison-context" // Import du hook de comparaison pour gérer les produits à comparer
import { ArrowRightLeft } from "lucide-react" // Import de l'icône de flèches pour le bouton de comparaison

import { useCart } from "@/lib/cart-context" // Import du hook pour gérer les actions du panier (ajout, suppression)
import { useToast } from "@/hooks/use-toast" // Import du hook pour afficher des notifications (toasts) à l'utilisateur

interface Product { // Définition de la structure de données pour un objet produit
  id: string // Identifiant unique du produit
  name: string // Nom complet du produit
  brand: string // Marque du fabricant du produit
  price: number // Prix unitaire du produit
  image: string // Chemin ou URL vers l'image du produit
  rating: number // Note moyenne attribuée par les utilisateurs
  features: string[] // Tableau contenant les caractéristiques techniques principales
  badge?: string // Étiquette optionnelle (ex: "Exclusif", "Dernier article")
  categorie: string // Catégorie à laquelle appartient le produit
}

export function ProductCard({ product }: { product: Product }) { // Composant exporté représentant une carte de produit
  const { addItem: addToCart } = useCart() // Destructuration de la fonction d'ajout au panier depuis le contexte
  const { toast } = useToast() // Initialisation de la fonction de notification

  const { addItem: addToComparison, removeItem: removeFromComparison, isInComparison } = useComparison() // Fonctions de gestion de omparaison

  const isComparing = isInComparison(product.id) // Vérification si le produit actuel est déjà dans la liste de comparaison

  const handleAddToCart = () => { // Définition du gestionnaire d'événement pour l'ajout au panier
    addToCart({ // Appel de la fonction pour ajouter l'article au panier
      id: product.id, // ID du produit à ajouter
      nom: product.name, // Nom à afficher dans le panier
      prix: product.price, // Prix stocké pour le calcul du total
      image: product.image, // Image pour le récapitulatif du panier
      categorie: product.categorie, // Catégorie pour le suivi ou filtrage
    })
    toast({ // Affichage de la notification après l'ajout réussi
      title: "Produit ajouté au panier", // Titre de la notification
      description: `${product.name} a été ajouté à votre panier`, // Message de confirmation avec le nom du produit
    })
  }

  const toggleComparison = (e: React.MouseEvent) => { // Gestionnaire pour ajouter/retirer de la comparaison sans naviguer ailleurs
    e.preventDefault() // Empêche le lien parent (si existant) de s'activer
    e.stopPropagation() // Empêche l'événement de remonter aux conteneurs parents
    if (isComparing) { // Si le produit est déjà marqué pour comparaison
      removeFromComparison(product.id) // On le retire de la liste de comparaison
    } else { // Si le produit n'est pas encore en comparaison
      addToComparison({ // On définit l'objet produit à ajouter à la comparaison
        id: product.id, // ID unique
        name: product.name, // Nom
        brand: product.brand, // Marque
        price: product.price, // Prix
        image: product.image, // Image
        features: product.features, // Caractéristiques
        categorie: product.categorie, // Catégorie
        rating: product.rating // Note
      })
    }
  }

  return ( // Section de rendu du composant
    <Card className="overflow-hidden hover:shadow-md transition-shadow border group"> {/* Structure de base Card avec effets hover */}
      {/* Conteneur de l'image du produit avec ses éléments superposés */}
      <div className="relative"> {/* Positionnement relatif pour placer les badges par-dessus */}
        <Image // Utilisation du composant Image optimisé de Next.js
          src={product.image || "/placeholder.jpg"} // Source de l'image ou image par défaut si non disponible
          alt={product.name} // Texte alternatif descriptif
          width={400} // Largeur fixe pour le chargement
          height={300} // Hauteur fixe pour le chargement
          // Styles CSS pour le redimensionnement et l'animation zoom
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.badge && <Badge className="absolute top-2 right-2">{product.badge}</Badge>} {/* Affichage conditionnel de l'étiquette en haut à droite */}

        {/* Bouton pour activer ou désactiver la comparaison de ce produit */}
        <button // Élément interactif de comparaison
          onClick={toggleComparison} // Liaison de la fonction de basculement au clic
          className={`absolute top-2 left-2 p-2 rounded-full shadow-sm transition-colors ${isComparing // Style dynamique selon l'état
            ? "bg-primary text-white" // Couleur pleine si sélectionné
            : "bg-white/90 text-gray-500 hover:text-primary hover:bg-white" // Couleur discrète par défaut
            }`}
          title={isComparing ? "Retirer du comparateur" : "Ajouter au comparateur"} // Texte d'aide au survol
        >
          <ArrowRightLeft className="h-4 w-4" /> {/* Icône visuelle de comparaison */}
        </button>
      </div>
      <CardContent className="p-4"> {/* Corps de la carte contenant les informations textuelles */}
        <p className="text-sm text-muted-foreground mb-1">{product.brand}</p> {/* Affichage de la marque en style secondaire */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 h-14">{product.name}</h3> {/* Titre du produit limité à deux lignes */}

        {/* Section affichant l'évaluation par étoiles du produit */}
        <div className="flex items-center gap-1 mb-3"> {/* Conteneur flexible pour les étoiles et la note */}
          {[...Array(5)].map((_, i) => ( // Création d'un tableau de 5 éléments pour générer les étoiles
            <Star // Composant icône pour une étoile
              key={i} // Identifiant unique pour React dans la boucle
              className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300" // Étoile pleine ou grise selon la note
                }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">({product.rating})</span> {/* Affichage de la note textuelle entre parenthèses */}
        </div>

        {/* Liste à puces montrant les deux premières caractéristiques pour la lisibilité */}
        <ul className="space-y-1 mb-4 min-h-[40px]"> {/* Liste verticale avec un espacement régulier */}
          {product.features.slice(0, 2).map((feature: string, index: number) => ( // Limitation aux deux premiers éléments du tableau
            <li key={index} className="text-sm text-muted-foreground flex items-center gap-2 truncate"> {/* Ligne de caractéristique avec icône personnalisée */}
              <div className="h-1 w-1 rounded-full bg-primary shrink-0" /> {/* Point de puce stylisé en rond aux couleurs de la marque */}
              <span className="truncate">{feature}</span> {/* Texte de la caractéristique, coupé si trop long */}
            </li>
          ))}
        </ul>

        {/* Affichage du prix du produit formaté pour la locale française */}
        <p className="text-xl font-bold text-gray-900">{product.price.toLocaleString('fr-FR')} €</p> {/* Prix en gras avec le symbole Euro */}
      </CardContent>

      {/* Section des boutons d'action au bas de la carte */}
      <CardFooter className="p-4 pt-0 flex gap-2"> {/* Pied de page avec espacement et flexbox pour les boutons */}
        <Button className="flex-1" onClick={handleAddToCart}> {/* Bouton principal prenant toute la place restante */}
          <ShoppingCart className="mr-2 h-4 w-4" /> {/* Icône de panier à gauche du texte */}
          Ajouter {/* Libellé du bouton */}
        </Button>
        <Button variant="outline" size="icon" asChild>
          <Link href={`/produits/${product.id}`} title="Voir détails">
            <Info className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
