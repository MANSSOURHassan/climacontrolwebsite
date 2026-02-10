// ==============================
// IMPORTS DES DÉPENDANCES
// ==============================
// Composants UI réutilisables de la bibliothèque shadcn/ui
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// Icônes SVG de la bibliothèque lucide-react
import { Check, Wrench, Shield, Clock, Phone } from "lucide-react"
// Composant Next.js pour la navigation sans rechargement de page
import Link from "next/link"

// ==============================
// METADATA SEO
// ==============================
// Métadonnées pour le référencement de la page Services
// Ces informations sont utilisées par Google et les réseaux sociaux
export const metadata = {
  title: "Services | ClimaControl - Installation et Entretien",
  description:
    "Installation, entretien et maintenance de climatisation, chauffage et pompes à chaleur par des techniciens experts. CLIMACONTROL entreprise à Montpellier depuis 2009.",
}

// ==============================
// COMPOSANT PRINCIPAL : PAGE SERVICES
// ==============================
// Cette page présente tous les services proposés par l'entreprise :
// Installation, Entretien, Dépannage et Conseil énergétique
export default function ServicesPage() {
  return (
    <main className="min-h-screen">

      {/* ==========================
          SECTION HERO (BANNIÈRE)
      ========================== */}
      {/* ==========================
          SECTION HERO (BANNIÈRE)
      ========================== */}
      {/* Introduction de la page avec titre, description et boutons d'action */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge indiquant le thème de la page */}
            <Badge className="mb-4 text-base px-4 py-1">Services Professionnels</Badge>
            {/* Titre principal H1 pour le SEO */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-primary tracking-tight">
              Nos solutions de climatisation & chauffage
            </h1>
            {/* Description courte des services */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              CLIMACONTROL vous accompagne de l'installation à la maintenance. Expertise technique et service premium à Montpellier depuis 2009.
            </p>
            {/* Boutons CTA : Devis gratuit et téléphone */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all" asChild>
                <Link href="/devis">Demander un devis gratuit</Link>
              </Button>
              <Link
                href="tel:0467200444"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 py-2 text-base font-bold bg-white border border-gray-300 rounded-md hover:bg-gray-100 shadow-sm transition-colors !text-black"
                style={{ color: '#000000', opacity: 1 }}
              >
                <Phone className="h-5 w-5 text-primary" style={{ opacity: 1 }} />
                <span style={{ color: '#000000', opacity: 1, visibility: 'visible' }}>Appelez-nous : 04 67 20 04 44</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================
          SECTION CARACTÉRISTIQUES CLÉS
      ========================== */}
      {/* Grille de 3 cartes présentant les points forts de l'entreprise */}
      <section className="py-20 border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Carte 1 : Techniciens experts */}
            <Card className="border-none shadow-lg bg-white">
              <CardContent className="pt-8 px-6 pb-8">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Wrench className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-primary">Techniciens experts</h3>
                <p className="text-gray-600 leading-relaxed">
                  Nos techniciens certifiés garantissent une installation et un entretien de qualité professionnelle.
                </p>
              </CardContent>
            </Card>

            {/* Carte 2 : Diagnostic précis */}
            <Card className="border-none shadow-lg bg-white">
              <CardContent className="pt-8 px-6 pb-8">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-primary">Diagnostic précis</h3>
                <p className="text-gray-600 leading-relaxed">
                  Diagnostic complet et réparation rapide pour assurer la performance optimale de votre système.
                </p>
              </CardContent>
            </Card>

            {/* Carte 3 : Installation de qualité */}
            <Card className="border-none shadow-lg bg-white">
              <CardContent className="pt-8 px-6 pb-8">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Check className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-primary">Installation de qualité</h3>
                <p className="text-gray-600 leading-relaxed">
                  Installation professionnelle de climatiseurs performants et écologiques selon les normes en vigueur.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ==========================
          SECTION SERVICES DÉTAILLÉS
      ========================== */}
      {/* Grille de 4 cartes présentant chaque service en détail */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Nos services professionnels</h2>
            <p className="text-lg text-gray-600">Découvrez l'ensemble de nos prestations dédiées à votre confort thermique.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

            {/* ===== SERVICE 1 : INSTALLATION ===== */}
            {/* Carte détaillant les prestations d'installation */}
            <Card className="overflow-hidden border-0 shadow-xl group hover:shadow-2xl transition-all duration-300">
              {/* En-tête coloré avec icône */}
              <div className="h-48 bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Wrench className="h-16 w-16 text-primary" />
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Installation</h3>
                {/* Liste des prestations incluses */}
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span className="text-gray-700">Installation de climatiseurs performants et écologiques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Pose de pompes à chaleur pour une meilleure efficacité énergétique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Installation de systèmes de chauffage et ventilation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Étude personnalisée et dimensionnement adapté</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Garantie sur l'installation et les équipements</span>
                  </li>
                </ul>
                {/* Bouton CTA pour ce service */}
                <Button asChild className="w-full">
                  <Link href="/devis">Demander un devis gratuit</Link>
                </Button>
              </CardContent>
            </Card>

            {/* ===== SERVICE 2 : ENTRETIEN & MAINTENANCE ===== */}
            {/* Carte détaillant les prestations d'entretien */}
            <Card className="overflow-hidden border-0 shadow-xl group hover:shadow-2xl transition-all duration-300">
              {/* En-tête coloré orange avec icône horloge */}
              <div className="h-48 bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                <Clock className="h-16 w-16 text-orange-600" />
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Entretien & Maintenance</h3>
                {/* Liste des prestations incluses */}
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span className="text-gray-700">Entretien annuel obligatoire de votre climatisation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span className="text-gray-700">Nettoyage des filtres et désinfection antibactérienne</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span className="text-gray-700">Contrôle de l'étanchéité et recharge en fluide frigorigène</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span className="text-gray-700">Diagnostic et réparation rapide en cas de panne</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span className="text-gray-700">Contrats d'entretien avec interventions prioritaires</span>
                  </li>
                </ul>
                {/* Bouton CTA pour ce service */}
                <Button asChild className="w-full h-12 text-base">
                  <Link href="/devis">Prendre rendez-vous</Link>
                </Button>
              </CardContent>
            </Card>

            {/* ===== SERVICE 3 : DÉPANNAGE ===== */}
            {/* Carte détaillant les prestations de dépannage urgent */}
            <Card className="overflow-hidden border-0 shadow-xl group hover:shadow-2xl transition-all duration-300">
              {/* En-tête coloré rouge avec icône bouclier */}
              <div className="h-48 bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                <Shield className="h-16 w-16 text-red-600" />
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Dépannage</h3>
                {/* Liste des prestations incluses */}
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span className="text-gray-700">Intervention rapide en cas de panne</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span className="text-gray-700">Diagnostic précis du problème</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span className="text-gray-700">Réparation sur place si possible</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span className="text-gray-700">Stock de pièces détachées disponibles</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span className="text-gray-700">Garantie sur les réparations effectuées</span>
                  </li>
                </ul>
                {/* Bouton CTA urgent pour appel direct */}
                <Button asChild variant="destructive" className="w-full h-12 text-base">
                  <Link href="tel:0682823434">Dépannage urgent</Link>
                </Button>
              </CardContent>
            </Card>

            {/* ===== SERVICE 4 : CONSEIL & AUDIT ===== */}
            {/* Carte détaillant les prestations de conseil énergétique */}
            <Card className="overflow-hidden border-0 shadow-xl group hover:shadow-2xl transition-all duration-300">
              {/* En-tête coloré vert avec icône check */}
              <div className="h-48 bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                <Check className="h-16 w-16 text-green-600" />
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Conseil & Audit énergétique</h3>
                {/* Liste des prestations incluses */}
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span className="text-gray-700">Audit énergétique de votre habitation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span className="text-gray-700">Conseil sur le choix du système adapté</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span className="text-gray-700">Information sur les aides et subventions disponibles</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span className="text-gray-700">Optimisation de votre consommation énergétique</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span className="text-gray-700">Suivi personnalisé de votre projet</span>
                  </li>
                </ul>
                {/* Bouton CTA pour demander un audit */}
                <Button asChild variant="secondary" className="w-full h-12 text-base">
                  <Link href="/contact">Demander un audit</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ==========================
          SECTION ZONE D'INTERVENTION
      ========================== */}
      {/* Section présentant les villes où l'entreprise intervient */}
      <section className="py-20 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-primary">Zone d'intervention</h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Basée à Saint-Jean-de-Védas, CLIMACONTROL intervient dans toute la région de Montpellier et ses environs
              pour vos installations, entretiens et dépannages de climatisation.
            </p>
            {/* Badges des villes couvertes */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Badge variant="outline" className="text-base py-2 px-4 hover:bg-primary hover:text-white transition-colors">Montpellier</Badge>
              <Badge variant="outline" className="text-base py-2 px-4 hover:bg-primary hover:text-white transition-colors">Saint-Jean-de-Védas</Badge>
              <Badge variant="outline" className="text-base py-2 px-4 hover:bg-primary hover:text-white transition-colors">Lattes</Badge>
              <Badge variant="outline" className="text-base py-2 px-4 hover:bg-primary hover:text-white transition-colors">Pérols</Badge>
              <Badge variant="outline" className="text-base py-2 px-4 hover:bg-primary hover:text-white transition-colors">Castelnau-le-Lez</Badge>
              <Badge variant="outline" className="text-base py-2 px-4 hover:bg-primary hover:text-white transition-colors">Juvignac</Badge>
              <Badge variant="outline" className="text-base py-2 px-4 hover:bg-primary hover:text-white transition-colors">Grabels</Badge>
              <Badge variant="outline" className="text-base py-2 px-4 hover:bg-primary hover:text-white transition-colors">Hérault (34)</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================
          SECTION CTA FINAL
      ========================== */}
      {/* Appel à l'action final pour demander un devis ou appeler */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Une prestation de qualité garantie</h2>
          <p className="text-gray-300 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
            Demandez un devis gratuit pour votre installation de climatisation, nous vous garantissons une prestation de
            qualité.
          </p>
          {/* Boutons d'action : Devis et téléphone */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 h-12 text-base" asChild>
              <Link href="/devis">Demander un devis gratuit</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 h-12 text-base"
              asChild
            >
              <Link href="tel:0467200444">Appelez-nous : 04 67 20 04 44</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
