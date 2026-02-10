// Importation du type React depuis la bibliothèque "react" (pour typer les enfants et les props)
import type React from "react"
// Importation des types Metadata et Viewport de Next.js (pour le SEO et le responsive)
import type { Metadata, Viewport } from "next"
// Importation des polices Inter et Open Sans depuis Google Fonts (optimisées via Next.js)
import { Inter, Open_Sans } from "next/font/google"
// Importation du composant Analytics de Vercel (pour le suivi des statistiques de visites)
import { Analytics } from "@vercel/analytics/next"
// Importation des styles CSS globaux de l'application
import "./globals.css"
// Importation du composant d'en-tête (Navigation)
import { Header } from "@/components/header"
// Importation du composant de pied de page
import { Footer } from "@/components/footer"
// Importation du contexte du panier (pour gérer les articles ajoutés partout dans l'app)
import { CartProvider } from "@/lib/cart-context"
// Importation du contexte de comparaison (pour la fonctionnalité de comparaison de produits)
import { ComparisonProvider } from "@/lib/comparison-context"
// Importation du composant de barre flottante servant à la comparaison
import { ComparisonFloatingBar } from "@/components/comparison-floating-bar"
// Importation du système de notifications "toast" (pour les messages de succès/erreur)
import { Toaster } from "@/components/ui/toaster"

// Configuration de la police Inter : charger le jeu de caractères latin et définir une variable CSS
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Configuration de la police Open Sans : charger le jeu latin, définir une variable CSS et les graisses nécessaires
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
})

// Définition des métadonnées SEO globales pour l'ensemble du site web
export const metadata: Metadata = {
  // Définition de l'URL de base pour résoudre les chemins relatifs des images et liens SEO
  metadataBase: new URL("https://climacontrol.fr"),

  // Configuration des titres des pages (titre par défaut et modèle pour les autres pages)
  title: {
    default: "ClimaControl | Climatisation, Chauffage & Pompes à Chaleur Montpellier",
    template: "%s | ClimaControl",
  },

  // Description principale affichée dans les résultats de recherche Google
  description:
    "CLIMACONTROL, entreprise de climatisation à Montpellier depuis 2009. Installation, entretien et dépannage de systèmes de climatisation, chauffage et pompes à chaleur. Devis gratuit.",

  // Identifiant de l'outil générateur du site
  generator: "v0.app",

  // Liste de mots-clés stratégiques pour améliorer le référencement naturel (SEO)
  keywords: [
    "climatisation Montpellier",
    "chauffage Montpellier",
    "pompe à chaleur Montpellier",
    "installation climatisation",
    "dépannage climatisation",
    "HVAC Montpellier",
  ],

  // Informations sur l'auteur du contenu
  authors: [{ name: "ClimaControl" }],
  // Nom du créateur technique du site
  creator: "ClimaControl",
  // Nom de l'éditeur du site
  publisher: "ClimaControl",

  // Configuration Open Graph pour optimiser l'affichage lors des partages sur réseaux sociaux (Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://climacontrol.fr",
    siteName: "ClimaControl",
    title: "ClimaControl | Spécialiste Climatisation & Chauffage Montpellier",
    description:
      "Entreprise de climatisation à Montpellier depuis 2009. Installation, maintenance et dépannage.",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "ClimaControl - Climatisation et Chauffage",
      },
    ],
  },

  // Configuration spécifique pour le partage sur Twitter (X)
  twitter: {
    card: "summary_large_image",
    title: "ClimaControl | Climatisation & Chauffage Montpellier",
    description: "Installation, entretien et dépannage HVAC.",
    images: ["/logo.jpg"],
  },

  // Instructions pour les robots d'indexation des moteurs de recherche
  robots: {
    index: true, // Autorise l'indexation
    follow: true, // Autorise le suivi des liens
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Configuration des icônes de favoris (favicons) pour le site
  icons: {
    icon: [
      { url: "/logo.jpg", media: "(prefers-color-scheme: light)" },
      { url: "/logo.jpg", media: "(prefers-color-scheme: dark)" },
    ],
  },
}

// Configuration du viewport pour le comportement de la fenêtre sur les appareils mobiles
export const viewport: Viewport = {
  themeColor: "#3B5998",      // Couleur de la barre d'adresse du navigateur mobile
  width: "device-width",     // Ajuste la largeur à celle de l'écran
  initialScale: 1,           // Zoom initial à 100%
  maximumScale: 5,           // Empêche un zoom trop important (mais permet l'accessibilité)
  userScalable: true,        // Autorise l'utilisateur à zoomer/dézoomer
}

// Composant de Layout Racine : c'est le squelette qui englobe toutes les pages du site
export default function RootLayout({
  children, // Représente le contenu de la page actuellement affichée
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // Balise racine HTML avec la langue française et l'injection des variables de polices Google
    <html lang="fr" className={`${inter.variable} ${openSans.variable}`}>
      {/* Corps du document avec la police sans-serif configurée et une lissage des polices (antialiased) */}
      <body className="font-sans antialiased">
        {/* Enveloppe l'application avec le fournisseur de panier pour qu'il soit accessible partout */}
        <CartProvider>
          {/* Enveloppe l'application avec le fournisseur de comparaison de produits */}
          <ComparisonProvider>
            {/* Affiche l'en-tête (menu de navigation) sur chaque page */}
            <Header />

            {/* Affiche le contenu spécifique de la page visitée */}
            {children}

            {/* Affiche la barre flottante de comparaison (uniquement si des produits sont sélectionnés) */}
            <ComparisonFloatingBar />

            {/* Affiche le pied de page sur chaque page */}
            <Footer />

            {/* Affiche le conteneur pour les notifications temporaires (toasts) */}
            <Toaster />
          </ComparisonProvider>
        </CartProvider>

        {/* Intègre l'outil d'analyse d'audience de Vercel */}
        <Analytics />
      </body>
    </html>
  )
}
