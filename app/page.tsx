// ==========================================
// 1. IMPORTS DES DÉPENDANCES ET COMPOSANTS
// ==========================================

// On importe les composants de base de l'interface utilisateur (boutons, cartes, badges) depuis Shadcn UI
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Link permet la navigation entre les pages sans rechargement complet du navigateur (Next.js)
import Link from "next/link"

// Image optimise le chargement des visuels locaux ou distants (format, taille, lazy loading)
import Image from "next/image"

// On importe les icônes nécessaires de Lucide React pour illustrer les différentes sections
import {
  Shield,         // Icône de protection/confiance
  Clock,          // Icône pour la rapidité/entretien
  Phone,          // Icône pour le contact
  CheckCircle2,   // Icône de validation
  Star,           // Icône d'étoile pour les notes
  Award,          // Icône de trophée pour l'expertise
  Users,          // Icône de groupe pour les clients
  TrendingDown,   // Icône de baisse (économies d'énergie)
  ShoppingCart    // Icône de panier
} from "lucide-react"

// On importe la liste des produits depuis le fichier de données centralisé
import { products } from "@/data/products"
// On importe le composant réutilisable pour afficher un produit sous forme de carte
import { ProductCard } from "@/components/ProductCard"

// ==========================================
// 2. CONFIGURATION SEO (MÉTADONNÉES)
// ==========================================

// Ces métadonnées sont lues par les moteurs de recherche (Google) et les réseaux sociaux
export const metadata = {
  // Le titre qui apparaîtra dans l'onglet du navigateur et dans les résultats Google
  title: "ClimaControl | Climatisation & Chauffage Montpellier - Expert depuis 2009",
  // La description courte qui s'affichera dans les résultats de recherche Google
  description:
    "CLIMACONTROL entreprise de climatisation à Montpellier depuis 2009. Installation, entretien et dépannage de climatisation, chauffage et pompes à chaleur. Devis gratuit.",
}

// ==========================================
// 3. COMPOSANT PRINCIPAL DE LA PAGE ACCUEIL
// ==========================================

// HomePage est la fonction exportée par défaut qui définit tout le contenu de la page d'accueil
export default function HomePage() {
  return (
    // 'main' est la balise sémantique principale. 'min-h-screen' assure un affichage correct sur toute la hauteur.
    <main className="min-h-screen">

      {/* ==========================================
          SECTION HERO (BANNIÈRE D'ACCUEIL)
      ========================================== */}
      {/* Cette section est la première chose que l'utilisateur voit à son arrivée */}
      <section className="relative min-h-[500px] flex items-center bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* Côté gauche : Message d'accueil et Appels à l'action */}
            <div>
              {/* Badge pour mettre en avant l'expérience locale et la date de création */}
              <Badge className="mb-3">Depuis 2009 à Montpellier</Badge>

              {/* Titre principal H1 (très important pour le référencement naturel) */}
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-primary mb-4">
                Votre confort climatique, notre priorité
              </h1>

              {/* Paragraphe décrivant les services principaux pour clarifier l'offre */}
              <p className="text-lg text-gray-600 mb-6">
                Installation, entretien et dépannage de systèmes de climatisation, chauffage et pompes à chaleur.
              </p>

              {/* Boutons d'action principaux (CTA - Call To Action) */}
              <div className="flex flex-wrap gap-3">
                {/* Bouton redirigeant vers la boutique (catalogue de produits) */}
                <Button size="lg" asChild>
                  <Link href="/produits">Visiter la boutique</Link>
                </Button>

                {/* Bouton redirigeant vers le formulaire de devis (génération de contacts) */}
                <Button size="lg" variant="outline" asChild>
                  <Link href="/devis">Devis gratuit</Link>
                </Button>
              </div>
            </div>

            {/* Côté droit : Image d'illustration d'une installation moderne */}
            <div className="relative h-[350px] lg:h-[400px]">
              <Image
                src="/clim-murale.jpg"
                alt="Installation climatisation ClimaControl"
                fill // L'image s'adapte automatiquement à la taille du conteneur parent
                className="object-cover rounded-md shadow-lg"
                priority // Priorité de chargement car l'image est en haut de page
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION CHIFFRES CLÉS (RASSURANCE CLIENT)
      ========================================== */}
      {/* Cette section sert à prouver le sérieux et l'expérience de l'entreprise */}
      <section className="py-12 border-y bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">

            {/* Statistique 1 : Ancienneté sur le marché */}
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">15+</div>
              <div className="text-sm text-gray-500">Années d'expérience</div>
            </div>

            {/* Statistique 2 : Nombre de clients satisfaits */}
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">450+</div>
              <div className="text-sm text-gray-500">Clients satisfaits</div>
            </div>

            {/* Statistique 3 : Note moyenne des avis clients */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="text-2xl font-bold text-primary">4.8</span>
              </div>
              <div className="text-sm text-gray-500">Note moyenne</div>
            </div>

            {/* Statistique 4 : Disponibilité pour les interventions */}
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-gray-500">Service urgence</div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION BESTSELLERS (MEILLEURES VENTES)
      ========================================== */}
      {/* Mise en avant dynamique des produits préférés des clients */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-3">Nos Produits Phares</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Les Meilleures Ventes du Moment</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez les produits de climatisation et chauffage préférés de nos clients, alliant performance et économies.
            </p>
          </div>

          {/* Grille de produits : on filtre les données pour n'afficher que 4 produits stars */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {[
              ...products.climatisation.filter(p => p.badge === "Bestseller"), // On prend les clims "Bestseller"
              ...products.chauffage.filter(p => p.badge === "Bestseller"),     // On prend les chauffages "Bestseller"
              ...products.climatisation.filter(p => p.badge === "Premium")     // Et les clims "Premium"
            ].slice(0, 4).map((product) => ( // On limite à 4 produits maximum
              // On affiche chaque produit en utilisant le composant ProductCard
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Bouton redirigeant vers le catalogue complet des produits */}
          <div className="text-center">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" asChild>
              <Link href="/produits">Voir tout le catalogue</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION PRÉSENTATION (NOTRE EXPERTISE)
      ========================================== */}
      {/* Illustration de l'historique et du savoir-faire de l'entreprise */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* Image d'une installation extérieure réelle */}
            <div className="relative h-[350px] rounded-md overflow-hidden shadow-md">
              <Image
                src="/installation-exterieur.jpg"
                alt="Technicien ClimaControl en intervention"
                fill
                className="object-cover"
              />
            </div>

            {/* Contenu textuel sur l'expertise HVAC */}
            <div>
              <Badge className="mb-3">Notre Expertise</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
                CLIMACONTROL, votre spécialiste HVAC depuis 2009
              </h2>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Spécialistes en installation de climatisation et pompes à chaleur performantes et écologiques.
                Nous intervenons sur tout le bassin montpelliérain pour garantir votre confort thermique toute l'année.
              </p>

              {/* Bouton redirigeant vers la page détaillée sur l'historique de l'entreprise */}
              <Button asChild size="lg">
                <Link href="/a-propos">En savoir plus sur nous</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION CALL TO ACTION (CTA FINAL)
      ========================================== */}
      {/* Dernière étape pour inciter l'utilisateur à passer à l'action */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à améliorer votre confort ?
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {/* Premier choix : conversion commerciale via le devis gratuit */}
            <Button size="lg" variant="secondary" className="px-8" asChild>
              <Link href="/devis">Demander un devis</Link>
            </Button>

            {/* Deuxième choix : demande d'information via la page contact */}
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8" asChild>
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>

    </main>
  )
}
