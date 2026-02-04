// ==============================
// DIRECTIVE CLIENT
// ==============================
// "use client" indique que ce composant utilise des fonctionnalités côté client
// (hooks React, événements utilisateur, etc.)
"use client"

// ==============================
// IMPORTS DES DÉPENDANCES
// ==============================
// Composants UI réutilisables de la bibliothèque shadcn/ui
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
// Composants Next.js pour la navigation et l'optimisation d'images
import Link from "next/link"
// Icônes SVG de la bibliothèque lucide-react
import { ShoppingCart, ArrowRight, Trash2, Plus, Minus } from "lucide-react"
import Image from "next/image"
// Hook personnalisé pour gérer le panier
import { useCart } from "@/lib/cart-context"

// ==============================
// COMPOSANT PRINCIPAL : PAGE PANIER
// ==============================
// Cette page affiche le contenu du panier et permet de :
// - Voir tous les articles dans le panier
// - Modifier les quantités
// - Supprimer des articles
// - Voir le récapitulatif et passer à la commande
export default function PanierPage() {
  // Récupère les fonctions et données du contexte panier
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()

  // ==============================
  // AFFICHAGE PANIER VIDE
  // ==============================
  // Si le panier est vide, affiche un message et des boutons d'action
  if (items.length === 0) {
    return (
      <main className="min-h-screen">
        {/* Section Hero - Bannière avec titre */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              {/* Icône panier */}
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Votre panier</h1>
            </div>
          </div>
        </section>

        {/* Section contenu - Message panier vide */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card>
              <CardContent className="p-12 text-center">
                {/* Grande icône panier vide */}
                <ShoppingCart className="h-20 w-20 mx-auto mb-6 text-muted-foreground" />
                <h2 className="text-2xl font-bold mb-4">Votre panier est vide</h2>
                <p className="text-muted-foreground mb-8">
                  Découvrez notre gamme complète de produits de climatisation et chauffage
                </p>
                {/* Boutons d'action */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/produits">
                      Voir nos produits
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/devis">Demander un devis</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    )
  }

  // ==============================
  // AFFICHAGE PANIER AVEC ARTICLES
  // ==============================
  return (
    <main className="min-h-screen">
      {/* Section Hero - Bannière avec titre et nombre d'articles */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Votre panier</h1>
            {/* Affiche le nombre d'articles */}
            <p className="text-xl text-muted-foreground">{items.length} article(s) dans votre panier</p>
          </div>
        </div>
      </section>

      {/* Section contenu - Grille à 2 colonnes */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* ===== COLONNE GAUCHE : LISTE DES ARTICLES ===== */}
            <div className="lg:col-span-2 space-y-4">
              {/* Boucle sur chaque article du panier */}
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Image du produit */}
                      <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-muted">
                        <Image src={item.image || "/placeholder.jpg"} alt={item.nom} fill className="object-cover" />
                      </div>

                      {/* Informations produit */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{item.nom}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{item.categorie}</p>
                        <p className="text-xl font-bold text-primary">{item.prix}€</p>
                      </div>

                      {/* Actions : Supprimer et Quantité */}
                      <div className="flex flex-col items-end justify-between">
                        {/* Bouton supprimer */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>

                        {/* Sélecteur de quantité */}
                        <div className="flex items-center gap-2 border rounded-lg">
                          {/* Bouton moins */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantite - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          {/* Quantité actuelle */}
                          <span className="w-8 text-center font-medium">{item.quantite}</span>
                          {/* Bouton plus */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantite + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Boutons d'action en bas de la liste */}
              <div className="flex justify-between items-center pt-4">
                {/* Bouton vider le panier */}
                <Button variant="outline" onClick={clearCart}>
                  Vider le panier
                </Button>
                {/* Bouton continuer les achats */}
                <Button variant="ghost" asChild>
                  <Link href="/produits">Continuer mes achats</Link>
                </Button>
              </div>
            </div>

            {/* ===== COLONNE DROITE : RÉCAPITULATIF DE COMMANDE ===== */}
            <div className="lg:col-span-1">
              {/* Carte sticky qui reste visible lors du scroll */}
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-6">
                  <h2 className="text-2xl font-bold">Récapitulatif</h2>

                  {/* Détails des prix */}
                  <div className="space-y-3 pb-4 border-b">
                    {/* Sous-total HT */}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span className="font-medium">{total.toFixed(2)}€</span>
                    </div>
                    {/* Livraison */}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Livraison</span>
                      <span className="font-medium">Gratuite</span>
                    </div>
                    {/* TVA */}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">TVA (20%)</span>
                      <span className="font-medium">{(total * 0.2).toFixed(2)}€</span>
                    </div>
                  </div>

                  {/* Total TTC */}
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total TTC</span>
                    <span className="text-primary">{(total * 1.2).toFixed(2)}€</span>
                  </div>

                  {/* Boutons d'action */}
                  <div className="space-y-3">
                    {/* Bouton finaliser la commande */}
                    <Button size="lg" className="w-full" asChild>
                      <Link href="/commande">
                        Finaliser ma commande
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    {/* Bouton demander un devis */}
                    <Button size="lg" variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/devis">Demander un devis</Link>
                    </Button>
                  </div>

                  {/* Informations de confiance */}
                  <div className="text-xs text-muted-foreground text-center pt-4 border-t">
                    Paiement sécurisé • Livraison gratuite • Garantie incluse
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
