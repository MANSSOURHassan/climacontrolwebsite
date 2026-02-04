// ==============================
// IMPORTS DES COMPOSANTS UI
// ==============================
// Ici, on importe des composants réutilisables de l'UI (boutons, cartes, badges)
// depuis la bibliothèque interne "shadcn/ui" pour structurer visuellement la page.
// On importe aussi Link de Next.js pour la navigation sans rechargement de page,
// Image pour optimiser les images (lazy loading, responsive), et des icônes SVG.
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import {
  Shield,
  Clock,
  Phone,
  CheckCircle2,
  Star,
  Award,
  Users,
  TrendingDown,
  ShoppingCart
} from "lucide-react"
import { products } from "@/data/products"
import { ProductCard } from "@/components/ProductCard"

// ==============================
// METADATA SEO
// ==============================
// Définition des métadonnées pour la page d'accueil (titre et description)
// Ceci est utile pour le référencement (SEO) afin que Google et autres moteurs
// comprennent le contenu et le thème du site.
export const metadata = {
  title: "ClimaControl | Climatisation & Chauffage Montpellier - Expert depuis 2009",
  description:
    "CLIMACONTROL entreprise de climatisation à Montpellier depuis 2009. Installation, entretien et dépannage de climatisation, chauffage et pompes à chaleur. Devis gratuit.",
}

// ==============================
// COMPOSANT PRINCIPAL : PAGE HOME
// ==============================
// C'est le composant React qui représente la page d'accueil.
// Il est exporté par défaut pour être utilisé par Next.js comme page.
export default function HomePage() {
  return (
    <main className="min-h-screen">

      {/* ==========================
          HERO SECTION (BANNIÈRE)
      ========================== */}
      {/* Section principale avec un texte accrocheur et une image */}
      <section className="relative min-h-[500px] flex items-center bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* Texte principal avec badge, titre, description et boutons CTA */}
            <div>
              <Badge className="mb-3">Depuis 2009 à Montpellier</Badge>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-primary mb-4">
                Votre confort climatique, notre priorité
              </h1>

              <p className="text-lg text-gray-600 mb-6">
                Installation, entretien et dépannage de systèmes de climatisation, chauffage et pompes à chaleur.
              </p>

              {/* Boutons d'action : Devis et appel téléphonique */}
              <div className="flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link href="/produits">Visiter la boutique</Link>
                </Button>

                <Button size="lg" variant="outline" asChild>
                  <Link href="/devis">Devis gratuit</Link>
                </Button>
              </div>
            </div>

            {/* Image principale de la bannière */}
            <div className="relative h-[350px] lg:h-[400px]">
              <Image
                src="/clim-murale.jpg"
                alt="Installation climatisation ClimaControl"
                fill
                className="object-cover rounded-md shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================
          STATISTIQUES CLÉS
      ========================== */}
      {/* Section avec chiffres clés : expérience, clients, note moyenne et disponibilité */}
      <section className="py-12 border-y bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">

            {/* Chaque bloc représente une statistique importante */}
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">15+</div>
              <div className="text-sm text-gray-500">Années d'expérience</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-primary">450+</div>
              <div className="text-sm text-gray-500">Clients satisfaits</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="text-2xl font-bold text-primary">4.8</span>
              </div>
              <div className="text-sm text-gray-500">Note moyenne</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-gray-500">Service urgence</div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================
          SECTION BESTSELLERS (MEILLEURES VENTES)
      ========================== */}
      {/* Mise en avant des produits phares pour inciter à l'achat direct */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-3">Nos Produits Phares</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Les Meilleures Ventes du Moment</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez les produits de climatisation et chauffage préférés de nos clients, alliant performance et économies.
            </p>
          </div>

          {/* Grille de produits */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* On filtre les produits pour n'afficher que ceux avec le badge 'Bestseller' ou 'Premium' (limité à 4) */}
            {[
              ...products.climatisation.filter(p => p.badge === "Bestseller"),
              ...products.chauffage.filter(p => p.badge === "Bestseller"),
              ...products.climatisation.filter(p => p.badge === "Premium")
            ].slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" asChild>
              <Link href="/produits">Voir tout le catalogue</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ==========================
          SECTION À PROPOS
      ========================== */}
      {/* Présentation de l'entreprise avec image et texte explicatif */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* Image illustrant l'expertise */}
            <div className="relative h-[350px] rounded-md overflow-hidden shadow-md">
              <Image
                src="/installation-exterieur.jpg"
                alt="Technicien ClimaControl"
                fill
                className="object-cover"
              />
            </div>

            {/* Texte descriptif avec badge et bouton vers page à propos */}
            <div>
              <Badge className="mb-3">Notre Expertise</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
                CLIMACONTROL, votre spécialiste HVAC depuis 2009
              </h2>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Spécialistes en installation de climatisation et pompes à chaleur performantes et écologiques.
              </p>

              <Button asChild size="lg">
                <Link href="/a-propos">En savoir plus sur nous</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================
          CALL TO ACTION FINAL
      ========================== */}
      {/* Section finale pour inciter l'utilisateur à demander un devis ou contacter l'entreprise */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à améliorer votre confort ?
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" className="px-8" asChild>
              <Link href="/devis">Demander un devis</Link>
            </Button>

            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8" asChild>
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>

    </main>
  )
}
