// ==============================
// IMPORTS DES DÉPENDANCES
// ==============================
// Composant ProductCard pour afficher chaque produit dans une carte
import { ProductCard } from "@/components/ProductCard"
// Composants UI réutilisables de la bibliothèque shadcn/ui
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// Données des produits depuis le fichier de données
import { products } from "@/data/products"
// Composants Next.js pour la navigation
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductSearch from "./ProductSearch"

// ==============================
// METADATA SEO
// ==============================
// Métadonnées pour le référencement de la page Produits
// Ces informations sont utilisées par Google et les réseaux sociaux
export const metadata = {
  title: "Produits | ClimaControl - Climatisation, Chauffage, PAC",
  description:
    "Découvrez notre gamme complète de climatiseurs, systèmes de chauffage, pompes à chaleur et accessoires. Installation et garantie incluses.",
}

// ==============================
// COMPOSANT PRINCIPAL : PAGE PRODUITS
// ==============================
// Cette page affiche le catalogue de produits organisé par catégories :
// Climatisation, Chauffage, Pompes à Chaleur (PAC) et Accessoires
export default function ProduitsPage() {
  return (
    <main className="min-h-screen">

      {/* ==========================
          SECTION HERO (BANNIÈRE)
      ========================== */}
      {/* Introduction de la page avec titre et description du catalogue */}
      {/* ==========================
          SECTION HERO (BANNIÈRE)
      ========================== */}
      {/* Introduction de la page avec titre et description du catalogue */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge indiquant le thème de la page */}
            <Badge className="mb-4 text-base px-4 py-1">Catalogue Produits</Badge>
            {/* Titre principal H1 pour le SEO */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-primary tracking-tight">
              Nos solutions climatisation & chauffage
            </h1>
            {/* Description courte du catalogue */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Découvrez notre gamme complète de produits performants et écologiques. Installation professionnelle et
              garantie incluses.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================
          SECTION CATALOGUE PRODUITS
      ========================== */}
      <section className="py-20 border-b">
        <div className="container mx-auto px-4">
          <ProductSearch />
        </div>
      </section>

      {/* ==========================
          SECTION CTA (CALL TO ACTION)
      ========================== */}
      {/* Section incitant les visiteurs à contacter l'entreprise pour des conseils */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Besoin de conseils personnalisés ?</h2>
          <p className="text-gray-300 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
            Nos experts sont à votre disposition pour vous guider vers le système de climatisation le plus adapté à vos besoins et à votre budget.
          </p>
          {/* Bouton de contact */}
          <Button size="lg" className="px-8 h-12 text-base bg-white text-gray-900 hover:bg-gray-100" asChild>
            <Link href="/contact">Contactez un expert</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
