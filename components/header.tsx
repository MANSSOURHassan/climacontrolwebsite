"use client" // Indique que ce composant sera rendu côté client (Next.js)

import Link from "next/link" // Import du composant Link pour la navigation côté client
import Image from "next/image" // Import du composant Image pour les images optimisées
import { Button } from "@/components/ui/button" // Import du composant Button personnalisé
import { Menu, Phone, Mail } from "lucide-react" // Import des icônes Menu, Phone et Mail
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet" // Import des composants Sheet pour le menu mobile
import { CartButton } from "@/components/cart-button" // Import du bouton panier personnalisé

import { useState, useEffect } from "react"

export function Header() { // Déclaration du composant Header
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <header className="h-40 border-b bg-white" /> // Shell minimaliste pour éviter le saut de contenu
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      {/* Header sticky en haut avec bordure et ombre légère */}

      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2">
        {/* Barre supérieure avec fond primaire et texte clair */}
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          {/* Conteneur centré avec flex pour espacer les éléments */}
          <div className="flex items-center gap-4">
            {/* Numéros de téléphone */}
            <a href="tel:0467200444" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="h-4 w-4" /> {/* Icône téléphone */}
              <span className="hidden sm:inline">04 67 20 04 44</span> {/* Affiché à partir du breakpoint sm */}
            </a>
            <a href="tel:0682823434" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="h-4 w-4" />
              <span className="hidden lg:inline">06 82 82 34 34</span> {/* Affiché à partir du breakpoint lg */}
            </a>
            {/* Email */}
            <a
              href="mailto:climacontrol.clim@gmail.com"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden md:inline">climacontrol.clim@gmail.com</span> {/* Affiché à partir du breakpoint md */}
            </a>
          </div>
          <div className="text-sm">Installation & Maintenance Professionnelle</div> {/* Slogan */}
        </div>
      </div>

      {/* Main nav */}
      <div className="container mx-auto px-4">
        <div className="flex h-28 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo.jpg" alt="ClimaControl" width={320} height={107} className="h-24 w-auto" priority />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Navigation affichée sur desktop */}
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Accueil</Link>
            <Link href="/a-propos" className="text-sm font-medium hover:text-primary transition-colors">À Propos</Link>
            <Link href="/produits" className="text-sm font-medium hover:text-primary transition-colors">Produits</Link>
            <Link href="/simulateur" className="text-sm font-medium hover:text-primary transition-colors">Simulateur</Link>
            <Link href="/rendez-vous" className="text-sm font-medium hover:text-primary transition-colors">Rendez-vous</Link>
            <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">Services</Link>
            <Link href="/pro" className="text-sm font-medium hover:text-primary text-yellow-600 font-bold transition-colors">Espace Pro</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-2">
            {/* Bouton panier */}
            <CartButton />
            {/* Bouton compte */}
            <Button asChild className="hidden sm:flex">
              <Link href="/compte">Mon Compte</Link>
            </Button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                {/* Bouton menu mobile */}
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span> {/* Accessibilité */}
                </Button>
              </SheetTrigger>
              <SheetContent>
                {/* Contenu du menu mobile */}
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">Accueil</Link>
                  <Link href="/a-propos" className="text-lg font-medium hover:text-primary transition-colors">À Propos</Link>
                  <Link href="/produits" className="text-lg font-medium hover:text-primary transition-colors">Produits</Link>
                  <Link href="/simulateur" className="text-lg font-medium hover:text-primary transition-colors">Simulateur</Link>
                  <Link href="/rendez-vous" className="text-lg font-medium hover:text-primary transition-colors">Rendez-vous</Link>
                  <Link href="/services" className="text-lg font-medium hover:text-primary transition-colors">Services</Link>
                  <Link href="/pro" className="text-lg font-medium hover:text-primary text-yellow-600 transition-colors">Espace Pro</Link>
                  <Link href="/contact" className="text-lg font-medium hover:text-primary transition-colors">Contact</Link>
                  <Button asChild className="mt-4">
                    <Link href="/compte">Mon Compte</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
