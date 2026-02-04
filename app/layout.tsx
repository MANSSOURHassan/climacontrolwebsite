// Import des types React (utile pour typer les composants et props)
import type React from "react"
// Import des types Next.js pour le SEO (metadata) et le viewport (responsive)
import type { Metadata, Viewport } from "next"
// Import des polices Google via Next.js (optimisées automatiquement)
import { Inter, Open_Sans } from "next/font/google"
// Import de l’outil Analytics de Vercel (statistiques de visites)
import { Analytics } from "@vercel/analytics/next"
// Import des styles globaux du site
import "./globals.css"
// Import des composants communs à toutes les pages
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
// Import du contexte panier (gestion globale du panier e-commerce)
import { CartProvider } from "@/lib/cart-context"
// Import du système de notifications (toast)
import { Toaster } from "@/components/ui/toaster"

// Configuration de la police Inter
// -> chargée une seule fois et injectée via une variable CSS
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Configuration de la police Open Sans
// -> utilisée souvent pour les titres ou textes importants
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"], // poids autorisés
})



// ======================
// METADATA (SEO GLOBAL)
// ======================
export const metadata: Metadata = {
  // URL de base du site (important pour le SEO et OpenGraph)
  metadataBase: new URL("https://climacontrol.fr"),

  // Titre du site (par défaut + template pour les autres pages)
  title: {
    default: "ClimaControl | Climatisation, Chauffage & Pompes à Chaleur Montpellier",
    template: "%s | ClimaControl",
  },

  // Description SEO affichée sur Google
  description:
    "CLIMACONTROL, entreprise de climatisation à Montpellier depuis 2009. Installation, entretien et dépannage de systèmes de climatisation, chauffage et pompes à chaleur. Devis gratuit.",

  generator: "v0.app",

  // Mots-clés SEO
  keywords: [
    "climatisation Montpellier",
    "chauffage Montpellier",
    "pompe à chaleur Montpellier",
    "installation climatisation",
    "dépannage climatisation",
    "HVAC Montpellier",
  ],

  authors: [{ name: "ClimaControl" }],
  creator: "ClimaControl",
  publisher: "ClimaControl",

  // Données pour le partage sur Facebook / LinkedIn
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

  // Données pour Twitter
  twitter: {
    card: "summary_large_image",
    title: "ClimaControl | Climatisation & Chauffage Montpellier",
    description: "Installation, entretien et dépannage HVAC.",
    images: ["/logo.jpg"],
  },

  // Autorisation d’indexation par Google
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icônes du site (favicon)
  icons: {
    icon: [
      { url: "/logo.jpg", media: "(prefers-color-scheme: light)" },
      { url: "/logo.jpg", media: "(prefers-color-scheme: dark)" },
    ],
  },
}



// ======================
// CONFIGURATION VIEWPORT
// ======================
export const viewport: Viewport = {
  themeColor: "#3B5998",      // Couleur du navigateur mobile
  width: "device-width",     // Responsive
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}



// ======================
// LAYOUT RACINE DU SITE
// ======================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode // Toutes les pages seront injectées ici
}>) {
  return (
    // Balise HTML globale
    <html lang="fr" className={`${inter.variable} ${openSans.variable}`}>

      {/* Corps du site */}
      <body className="font-sans antialiased">

        {/* Fournit le contexte panier à toute l’application */}
        <CartProvider>

          {/* Header affiché sur toutes les pages */}
          <Header />

          {/* Contenu spécifique de chaque page */}
          {children}

          {/* Footer affiché sur toutes les pages */}
          <Footer />

          {/* Notifications (toast messages) */}
          <Toaster />

        </CartProvider>

        {/* Analytics Vercel (statistiques) */}
        <Analytics />
      </body>
    </html>
  )
}
