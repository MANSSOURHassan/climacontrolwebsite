// ==============================
// DIRECTIVE CLIENT
// ==============================
// "use client" indique que ce composant utilise des fonctionnalités côté client
// (hooks React, événements utilisateur, formulaires interactifs)
"use client"

// ==============================
// IMPORTS DES DÉPENDANCES
// ==============================
// Type React pour typer les événements de formulaire
import type React from "react"

// Composants UI réutilisables de la bibliothèque shadcn/ui
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

// Icônes SVG de la bibliothèque lucide-react
import { CheckCircle, Phone, Clock, Shield, ThumbsUp } from "lucide-react"

// Hook React pour gérer l'état local
import { useState } from "react"

// Hook personnalisé pour afficher des notifications toast
import { useToast } from "@/hooks/use-toast"

// ==============================
// COMPOSANT PRINCIPAL : PAGE DEVIS (CLIENT)
// ==============================
// Cette page permet aux visiteurs de demander un devis gratuit
// en remplissant un formulaire détaillé sur leur projet
export default function DevisClientPage() {
  // Hook pour afficher des notifications toast
  const { toast } = useToast()
  // État pour gérer le chargement pendant l'envoi du formulaire
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ==============================
  // FONCTION DE SOUMISSION DU FORMULAIRE
  // ==============================
  // Gère l'envoi de la demande de devis
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Empêche le rechargement de la page
    e.preventDefault()
    // Active l'état de chargement
    setIsSubmitting(true)

    // Simule un appel API (à remplacer par un vrai appel backend)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Affiche une notification de succès
    toast({
      title: "Demande envoyée avec succès !",
      description: "Nous vous contacterons dans les 24h pour établir votre devis personnalisé.",
    })

    // Désactive l'état de chargement et réinitialise le formulaire
    setIsSubmitting(false)
      ; (e.target as HTMLFormElement).reset()
  }

  return (
    <main className="min-h-screen">

      {/* ==========================
          SECTION HERO (BANNIÈRE)
      ========================== */}
      {/* Introduction de la page avec badge, titre et statistiques */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge indiquant que le service est gratuit */}
            <Badge className="mb-4 text-base py-2 px-4">Gratuit & Sans engagement</Badge>
            {/* Titre principal H1 pour le SEO */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance text-primary">
              Demandez votre devis gratuit
            </h1>
            {/* Description du service */}
            <p className="text-xl md:text-2xl text-muted-foreground text-pretty leading-relaxed">
              Décrivez votre projet et recevez une estimation personnalisée sous 24h. Nos experts analysent vos besoins
              pour vous proposer la solution idéale.
            </p>

            {/* Statistiques de confiance */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-10">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Réponse en 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">15 ans d'expérience</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">+2000 clients satisfaits</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================
          SECTION FORMULAIRE DE DEVIS
      ========================== */}
      {/* Grille à 2 colonnes : formulaire à gauche, sidebar à droite */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">

            {/* ===== COLONNE GAUCHE : FORMULAIRE ===== */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-2 border-primary/20 bg-gradient-to-br from-background to-muted/20">
                <CardContent className="p-8 md:p-10">
                  <form className="space-y-8" onSubmit={handleSubmit}>

                    {/* ========== SECTION TYPE DE PROJET ========== */}
                    {/* Checkboxes pour sélectionner le type de prestation */}
                    <div>
                      <h3 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Type de projet *
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Option Climatisation */}
                        <label className="flex items-center gap-3 p-5 border-2 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 hover:shadow-md transition-all duration-200 bg-background">
                          <Checkbox id="clim" name="type" />
                          <Label htmlFor="clim" className="cursor-pointer font-medium text-base">
                            Climatisation
                          </Label>
                        </label>
                        {/* Option Chauffage */}
                        <label className="flex items-center gap-3 p-5 border-2 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 hover:shadow-md transition-all duration-200 bg-background">
                          <Checkbox id="chauffage" name="type" />
                          <Label htmlFor="chauffage" className="cursor-pointer font-medium text-base">
                            Chauffage
                          </Label>
                        </label>
                        {/* Option Pompe à chaleur */}
                        <label className="flex items-center gap-3 p-5 border-2 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 hover:shadow-md transition-all duration-200 bg-background">
                          <Checkbox id="pac" name="type" />
                          <Label htmlFor="pac" className="cursor-pointer font-medium text-base">
                            Pompe à chaleur
                          </Label>
                        </label>
                        {/* Option Entretien */}
                        <label className="flex items-center gap-3 p-5 border-2 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 hover:shadow-md transition-all duration-200 bg-background">
                          <Checkbox id="entretien" name="type" />
                          <Label htmlFor="entretien" className="cursor-pointer font-medium text-base">
                            Entretien
                          </Label>
                        </label>
                      </div>
                    </div>

                    {/* ========== SECTION TYPE DE BIEN ========== */}
                    {/* Sélecteur pour le type de propriété */}
                    <div className="space-y-2">
                      <Label htmlFor="typeBien">Type de bien *</Label>
                      <Select required>
                        <SelectTrigger id="typeBien">
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maison">Maison individuelle</SelectItem>
                          <SelectItem value="appartement">Appartement</SelectItem>
                          <SelectItem value="local-commercial">Local commercial</SelectItem>
                          <SelectItem value="bureau">Bureau</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* ========== SECTION SURFACE ========== */}
                    {/* Champs pour la surface et le nombre de pièces */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="surface">Surface (m²) *</Label>
                        <Input id="surface" name="surface" type="number" placeholder="Ex: 80" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pieces">Nombre de pièces</Label>
                        <Input id="pieces" name="pieces" type="number" placeholder="Ex: 4" />
                      </div>
                    </div>

                    {/* ========== SECTION COORDONNÉES ========== */}
                    {/* Informations personnelles du demandeur */}
                    <div className="pt-6 border-t-2">
                      <h3 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Vos coordonnées
                      </h3>
                      {/* Nom et prénom */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nom">Nom *</Label>
                          <Input id="nom" name="nom" placeholder="Votre nom" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="prenom">Prénom *</Label>
                          <Input id="prenom" name="prenom" placeholder="Votre prénom" required />
                        </div>
                      </div>
                      {/* Email et téléphone */}
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input id="email" name="email" type="email" placeholder="votre@email.com" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telephone">Téléphone *</Label>
                          <Input id="telephone" name="telephone" type="tel" placeholder="06 12 34 56 78" required />
                        </div>
                      </div>
                      {/* Adresse complète */}
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="adresse">Adresse du projet *</Label>
                        <Input id="adresse" name="adresse" placeholder="Adresse complète" required />
                      </div>
                      {/* Code postal et ville */}
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="codePostal">Code postal *</Label>
                          <Input id="codePostal" name="codePostal" placeholder="34000" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ville">Ville *</Label>
                          <Input id="ville" name="ville" placeholder="Montpellier" required />
                        </div>
                      </div>
                    </div>

                    {/* ========== SECTION DÉLAI ========== */}
                    {/* Sélecteur pour le délai souhaité */}
                    <div className="space-y-2">
                      <Label htmlFor="delai">Délai souhaité</Label>
                      <Select>
                        <SelectTrigger id="delai">
                          <SelectValue placeholder="Quand souhaitez-vous réaliser les travaux ?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent">Urgent (moins d'1 mois)</SelectItem>
                          <SelectItem value="1-3mois">1 à 3 mois</SelectItem>
                          <SelectItem value="3-6mois">3 à 6 mois</SelectItem>
                          <SelectItem value="plus-6mois">Plus de 6 mois</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* ========== SECTION MESSAGE ========== */}
                    {/* Zone de texte pour les détails du projet */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Détails de votre projet</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Décrivez-nous votre projet, vos besoins spécifiques, vos contraintes..."
                        rows={6}
                      />
                    </div>

                    {/* ========== BOUTON D'ENVOI ========== */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full text-lg py-7 shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande de devis"}
                    </Button>

                    {/* Mention légale */}
                    <p className="text-sm text-muted-foreground text-center leading-relaxed">
                      En soumettant ce formulaire, vous acceptez d'être contacté par ClimaControl concernant votre
                      demande.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* ===== COLONNE DROITE : SIDEBAR ===== */}
            {/* Cartes d'information complémentaires */}
            <div className="space-y-6">

              {/* Carte Avantages */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-5">Pourquoi nous choisir ?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">Devis gratuit et sans engagement</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">Réponse personnalisée sous 24h</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">Visite technique gratuite</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">15 ans d'expérience</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">Garantie décennale</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">SAV réactif</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Carte Contact rapide */}
              <Card className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6">
                  <Phone className="h-12 w-12 mb-4" />
                  <h3 className="font-bold text-xl mb-2">Besoin d'une réponse rapide ?</h3>
                  <p className="text-sm opacity-90 mb-4 leading-relaxed">
                    Appelez-nous directement, nous sommes à votre écoute
                  </p>
                  {/* Numéros de téléphone */}
                  <div className="space-y-3">
                    <a href="tel:0467200444" className="block text-xl font-bold hover:underline">
                      04 67 20 04 44
                    </a>
                    <a href="tel:0682823434" className="block text-xl font-bold hover:underline">
                      06 82 82 34 34
                    </a>
                  </div>
                  {/* Horaires */}
                  <p className="text-xs opacity-75 mt-4">
                    Lundi - Vendredi : 8h - 18h
                    <br />
                    Samedi : 9h - 12h
                  </p>
                </CardContent>
              </Card>

              {/* Carte Aides financières */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-3">Aides financières</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Profitez des aides de l'État pour financer votre projet
                  </p>
                  <ul className="text-sm space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>MaPrimeRénov'</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>CEE (Certificats d'Économie d'Énergie)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>Éco-PTZ</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>TVA réduite à 5,5%</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
