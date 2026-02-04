// ==============================
// DIRECTIVE CLIENT
// ==============================
// "use client" indique à Next.js que ce composant doit être rendu côté client
// Cela est nécessaire car on utilise des hooks React (useState) et des événements
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

// Icônes SVG de la bibliothèque lucide-react
import { Phone, Mail, MapPin, Clock } from "lucide-react"

// Hook React pour gérer l'état local du composant
import { useState } from "react"

// Hook personnalisé pour afficher des notifications toast
import { useToast } from "@/hooks/use-toast"

// ==============================
// COMPOSANT PRINCIPAL : PAGE CONTACT (CLIENT)
// ==============================
// Cette page permet aux visiteurs de contacter l'entreprise via :
// - Un formulaire de contact
// - Les informations de contact (téléphone, email, adresse, horaires)
// - Une carte Google Maps
export default function ContactClientPage() {
  // Hook pour afficher des notifications toast
  const { toast } = useToast()

  // État pour gérer le chargement pendant l'envoi du formulaire
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ==============================
  // FONCTION DE SOUMISSION DU FORMULAIRE
  // ==============================
  // Gère l'envoi du formulaire de contact
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Empêche le rechargement de la page
    e.preventDefault()
    // Active l'état de chargement
    setIsSubmitting(true)

    // Simule un appel API (à remplacer par un vrai appel backend)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Affiche une notification de succès
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    })

    // Désactive l'état de chargement
    setIsSubmitting(false)
      // Réinitialise le formulaire
      ; (e.target as HTMLFormElement).reset()
  }

  return (
    <main className="min-h-screen">

      {/* ==========================
          SECTION HERO (BANNIÈRE)
      ========================== */}
      {/* Introduction de la page avec titre et description */}
      {/* ==========================
          SECTION HERO (BANNIÈRE)
      ========================== */}
      {/* Introduction de la page avec titre et description */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge indiquant le thème de la page */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-primary tracking-tight">Contactez-nous</h1>
            {/* Description de la page */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Une question ? Un projet ? Notre équipe est à votre écoute pour vous conseiller et vous accompagner dans
              vos besoins en climatisation et chauffage.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================
          SECTION FORMULAIRE ET INFOS
      ========================== */}
      {/* Grille à 2 colonnes : formulaire à gauche, infos à droite */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

            {/* ===== COLONNE GAUCHE : FORMULAIRE DE CONTACT ===== */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-primary">Envoyez-nous un message</h2>

                {/* Formulaire de contact avec validation */}
                <form className="space-y-4" onSubmit={handleSubmit}>

                  {/* Ligne 1 : Nom et Prénom */}
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

                  {/* Champ Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" placeholder="votre@email.com" required />
                  </div>

                  {/* Champ Téléphone */}
                  <div className="space-y-2">
                    <Label htmlFor="telephone">Téléphone *</Label>
                    <Input id="telephone" name="telephone" type="tel" placeholder="06 12 34 56 78" required />
                  </div>

                  {/* Champ Ville (optionnel) */}
                  <div className="space-y-2">
                    <Label htmlFor="ville">Ville</Label>
                    <Input id="ville" name="ville" placeholder="Votre ville" />
                  </div>

                  {/* Champ Sujet (optionnel) */}
                  <div className="space-y-2">
                    <Label htmlFor="sujet">Sujet</Label>
                    <Input id="sujet" name="sujet" placeholder="Objet de votre demande" />
                  </div>

                  {/* Champ Message (zone de texte) */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Décrivez votre projet ou votre demande..."
                      rows={6}
                      required
                    />
                  </div>

                  {/* Bouton d'envoi avec état de chargement */}
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>

                  {/* Indication des champs obligatoires */}
                  <p className="text-sm text-muted-foreground text-center">* Champs obligatoires</p>
                </form>
              </CardContent>
            </Card>

            {/* ===== COLONNE DROITE : INFORMATIONS DE CONTACT ===== */}
            <div className="space-y-6">

              {/* Carte Téléphone */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icône téléphone dans un cercle */}
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">Téléphone</h3>
                      <p className="text-muted-foreground mb-2">Appelez-nous du lundi au vendredi de 8h à 18h</p>
                      {/* Liens téléphoniques cliquables */}
                      <div className="space-y-1">
                        <a href="tel:0467200444" className="text-primary hover:underline block text-lg font-semibold">
                          04 67 20 04 44
                        </a>
                        <a href="tel:0682823434" className="text-primary hover:underline block text-lg font-semibold">
                          06 82 82 34 34
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Carte Email */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icône email dans un cercle */}
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">Email</h3>
                      <p className="text-muted-foreground mb-2">Écrivez-nous, nous vous répondons sous 24h</p>
                      {/* Lien email cliquable */}
                      <a href="mailto:climacontrol.clim@gmail.com" className="text-primary hover:underline block">
                        climacontrol.clim@gmail.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Carte Adresse */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icône localisation dans un cercle */}
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">Adresse</h3>
                      {/* Adresse complète de l'entreprise */}
                      <p className="text-muted-foreground mb-3">
                        92 Route de Lattes
                        <br />
                        34430 Saint-Jean-de-Védas
                        <br />
                        France
                      </p>
                      {/* Lien vers Google Maps */}
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=92+Route+de+Lattes+34430+Saint-Jean-de-Vedas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                      >
                        Voir sur Google Maps →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Carte Horaires */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icône horloge dans un cercle */}
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">Horaires</h3>
                      {/* Horaires d'ouverture */}
                      <div className="space-y-1 text-muted-foreground">
                        <p>Lundi - Vendredi : 8h - 18h</p>
                        <p>Samedi : 9h - 12h</p>
                        <p>Dimanche : Fermé</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================
          SECTION CARTE GOOGLE MAPS
      ========================== */}
      {/* Carte interactive affichant la localisation de l'entreprise */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6 text-primary">Où nous trouver</h2>
          {/* Conteneur de la carte avec dimensions fixes */}
          <div className="max-w-4xl mx-auto h-[350px] bg-gray-200 rounded-md overflow-hidden">
            {/* Iframe Google Maps avec la localisation de l'entreprise */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.8!2d3.8239!3d43.5686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6b0d8e8d6e8b7%3A0x8c8c8c8c8c8c8c8c!2s92%20Rte%20de%20Lattes%2C%2034430%20Saint-Jean-de-V%C3%A9das%2C%20France!5e0!3m2!1sfr!2sfr!4v1706456285000!5m2!1sfr!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation ClimaControl - 92 Route de Lattes, Saint-Jean-de-Védas"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
