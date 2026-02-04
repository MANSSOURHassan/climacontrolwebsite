// ==============================
// IMPORTS DES DÉPENDANCES
// ==============================
// Composants UI réutilisables de la bibliothèque shadcn/ui
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// Icônes SVG de la bibliothèque lucide-react
import { Award, Users, MapPin, Sparkles } from "lucide-react"
// Composants Next.js pour la navigation et l'optimisation d'images
import Link from "next/link"
import Image from "next/image"

// ==============================
// METADATA SEO
// ==============================
// Métadonnées pour le référencement de la page À propos
// Ces informations sont utilisées par Google et les réseaux sociaux
export const metadata = {
  title: "À Propos | ClimaControl - Spécialiste Climatisation Montpellier",
  description:
    "CLIMACONTROL, entreprise de climatisation à Montpellier depuis 2009. Techniciens experts en installation, entretien et dépannage de systèmes HVAC.",
}

// ==============================
// COMPOSANT PRINCIPAL : PAGE À PROPOS
// ==============================
// Cette page présente l'entreprise, son histoire, ses valeurs et ses engagements
export default function AProposPage() {
  return (
    <main className="min-h-screen">

      {/* ==========================
          SECTION HERO (BANNIÈRE)
      ========================== */}
      {/* Introduction de la page avec badge, titre et description */}
      {/* ==========================
          SECTION HERO (BANNIÈRE)
      ========================== */}
      {/* Introduction de la page avec badge, titre et description */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge indiquant le thème de la page */}
            <Badge className="mb-4 text-base px-4 py-1">Notre Histoire</Badge>
            {/* Titre principal H1 pour le SEO */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-primary tracking-tight">
              ClimaControl, experts en climatisation depuis 2009
            </h1>
            {/* Description courte de l'entreprise */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Vivez l'expérience d'un confort optimal. Notre mission : vous offrir un confort
              thermique parfait en toute saison.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================
          SECTION NOTRE ENTREPRISE
      ========================== */}
      {/* Présentation détaillée de l'entreprise avec texte et image */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Colonne texte avec description et bouton d'action */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary">Une entreprise à votre service</h2>
              <div className="prose prose-lg text-gray-600">
                {/* Paragraphes descriptifs de l'entreprise */}
                <p className="mb-4 leading-relaxed">
                  Depuis 2009, CLIMACONTROL est votre partenaire de confiance pour tous vos besoins en climatisation,
                  chauffage et pompes à chaleur dans la région de Montpellier.
                </p>
                <p className="mb-4 leading-relaxed">
                  Nous sommes spécialisés dans l'installation de climatiseurs performants et écologiques, ainsi que de
                  pompes à chaleur pour une meilleure efficacité énergétique.
                </p>
                <p className="mb-8 leading-relaxed">
                  Notre équipe de techniciens experts certifiés vous garantit une prestation de qualité, du conseil
                  personnalisé jusqu'à l'installation et l'entretien de votre équipement.
                </p>
              </div>
              {/* Bouton CTA vers la page services */}
              <Button size="lg" className="px-8 h-12 text-base" asChild>
                <Link href="/services">Découvrir nos services</Link>
              </Button>
            </div>
            {/* Colonne image du magasin */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/magasin-climacontrol.png"
                alt="Magasin ClimaControl - Saint-Jean-de-Védas"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================
          SECTION NOS VALEURS
      ========================== */}
      {/* Grille de cartes présentant les 4 valeurs principales de l'entreprise */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary">Nos valeurs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Carte Valeur 1 : Qualité */}
            <Card className="border-0 shadow-lg text-center bg-white group hover:-translate-y-1 transition-transform">
              <CardContent className="pt-10 px-6 pb-10">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-3">Qualité</h3>
                <p className="text-gray-600 leading-relaxed">Installation et entretien selon les normes les plus strictes</p>
              </CardContent>
            </Card>

            {/* Carte Valeur 2 : Expertise */}
            <Card className="border-0 shadow-lg text-center bg-white group hover:-translate-y-1 transition-transform">
              <CardContent className="pt-10 px-6 pb-10">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-3">Expertise</h3>
                <p className="text-gray-600 leading-relaxed">Techniciens certifiés avec 15 ans d'expérience</p>
              </CardContent>
            </Card>

            {/* Carte Valeur 3 : Innovation */}
            <Card className="border-0 shadow-lg text-center bg-white group hover:-translate-y-1 transition-transform">
              <CardContent className="pt-10 px-6 pb-10">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-3">Innovation</h3>
                <p className="text-gray-600 leading-relaxed">Solutions écologiques et performantes</p>
              </CardContent>
            </Card>

            {/* Carte Valeur 4 : Proximité */}
            <Card className="border-0 shadow-lg text-center bg-white group hover:-translate-y-1 transition-transform">
              <CardContent className="pt-10 px-6 pb-10">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-3">Proximité</h3>
                <p className="text-gray-600 leading-relaxed">Service local et interventions rapides</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ==========================
          SECTION NOS ENGAGEMENTS
      ========================== */}
      {/* Liste des 4 engagements de l'entreprise envers ses clients */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary">Nos engagements</h2>
            <div className="grid md:grid-cols-2 gap-10">

              {/* Engagement 1 : Devis gratuit */}
              <div className="flex gap-6 items-start">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-primary">Devis gratuit et détaillé</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Étude personnalisée de vos besoins avec proposition adaptée à votre budget
                  </p>
                </div>
              </div>

              {/* Engagement 2 : Garantie */}
              <div className="flex gap-6 items-start">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-primary">Garantie constructeur</h3>
                  <p className="text-gray-600 leading-relaxed">Tous nos équipements sont garantis avec un SAV réactif</p>
                </div>
              </div>

              {/* Engagement 3 : Installation certifiée */}
              <div className="flex gap-6 items-start">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-primary">Installation certifiée</h3>
                  <p className="text-gray-600 leading-relaxed">Respect des normes RT2012 et garantie décennale</p>
                </div>
              </div>

              {/* Engagement 4 : Accompagnement */}
              <div className="flex gap-6 items-start">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-primary">Accompagnement complet</h3>
                  <p className="text-gray-600 leading-relaxed">Conseil, installation, formation à l'utilisation et entretien</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================
          SECTION LOCALISATION
      ========================== */}
      {/* Informations sur l'emplacement de l'entreprise et zone d'intervention */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Icône de localisation */}
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-primary">Notre localisation</h2>
            {/* Adresse complète de l'entreprise */}
            <p className="text-xl font-medium mb-2 text-primary">
              92 Route de Lattes, 34430 Saint-Jean-de-Védas
            </p>
            {/* Zone d'intervention */}
            <p className="text-gray-600 mb-10 text-lg">
              Nous intervenons dans toute la région de Montpellier et ses environs : Lattes, Pérols, Castelnau-le-Lez,
              Juvignac, Grabels et tout l'Hérault (34).
            </p>
            {/* Boutons d'action : Contact et téléphone */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="px-8 h-12 text-base" asChild>
                <Link href="/contact">Nous contacter</Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 h-12 text-base" asChild>
                <a href="tel:0467200444">04 67 20 04 44</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================
          SECTION CTA FINAL
      ========================== */}
      {/* Appel à l'action final pour demander un devis */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Bénéficiez d'un confort thermique optimal</h2>
          <p className="text-gray-300 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
            Demandez un devis gratuit, nous vous garantissons une prestation de qualité
          </p>
          {/* Bouton principal pour demander un devis */}
          <Button size="lg" variant="secondary" className="px-10 h-14 text-lg" asChild>
            <Link href="/devis">Demander un devis gratuit</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

