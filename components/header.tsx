"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, Phone, Mail, X, ChevronRight, Home, Info, ShoppingBag, Calculator, Calendar, Wrench, Briefcase, MessageCircle, User, Truck } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { CartButton } from "@/components/cart-button"
import { useState, useEffect } from "react"

const menuItems = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/a-propos", label: "À Propos", icon: Info },
  { href: "/produits", label: "Produits", icon: ShoppingBag },
  { href: "/simulateur", label: "Simulateur", icon: Calculator },
  { href: "/rendez-vous", label: "Rendez-vous", icon: Calendar },
  { href: "/services", label: "Services", icon: Wrench },
  { href: "/pro", label: "Espace Pro", icon: Briefcase, highlight: true },
  { href: "/contact", label: "Contact", icon: MessageCircle },
]

export function Header() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <header className="h-32 md:h-40 border-b bg-white" />
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-lg">
      {/* Top bar - Masquée sur très petits écrans */}
      <div className="bg-gradient-to-r from-primary via-primary to-blue-700 text-white py-2">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-3 md:gap-6">
            <a href="tel:0467200444" className="flex items-center gap-1.5 hover:text-blue-200 transition-colors">
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline text-xs md:text-sm">04 67 20 04 44</span>
            </a>
            <a href="tel:0682823434" className="flex items-center gap-1.5 hover:text-blue-200 transition-colors">
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden lg:inline text-xs md:text-sm">06 82 82 34 34</span>
            </a>
            <a href="mailto:climacontrol.clim@gmail.com" className="flex items-center gap-1.5 hover:text-blue-200 transition-colors">
              <Mail className="h-3.5 w-3.5" />
              <span className="hidden md:inline text-xs md:text-sm">climacontrol.clim@gmail.com</span>
            </a>
          </div>
          <div className="text-xs md:text-sm font-medium hidden sm:block">
            Installation & Maintenance Pro
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container mx-auto px-4">
        <div className="flex h-20 md:h-28 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.jpg"
              alt="ClimaControl"
              width={280}
              height={93}
              className="h-14 md:h-24 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${item.highlight
                  ? "text-yellow-600 hover:bg-yellow-50 font-bold"
                  : "text-gray-700 hover:text-primary hover:bg-blue-50"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Bouton panier */}
            <CartButton />

            {/* Bouton compte - Desktop */}
            <Button asChild className="hidden md:flex bg-primary hover:bg-blue-700 shadow-md">
              <Link href="/compte">
                <User className="h-4 w-4 mr-2" />
                Mon Compte
              </Link>
            </Button>

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-2 border-primary/20 hover:bg-primary hover:text-white transition-all"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <Button asChild variant="outline" size="icon" className="lg:hidden h-10 w-10 border-2 border-primary/20 hover:bg-primary hover:text-white transition-all ml-2">
                <Link href="/compte">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Mon Compte</span>
                </Link>
              </Button>
              <SheetContent
                side="right"
                className="w-full sm:w-80 p-0 bg-gradient-to-b from-slate-50 to-white border-l-0"
              >
                {/* Header du menu mobile */}
                <div className="bg-gradient-to-r from-primary to-blue-700 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <Image
                      src="/logo.jpg"
                      alt="ClimaControl"
                      width={140}
                      height={47}
                      className="h-10 w-auto brightness-0 invert"
                    />
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 -mr-2">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetClose>
                  </div>
                  <p className="text-blue-100 text-sm">
                    Votre expert en climatisation
                  </p>
                </div>

                {/* Navigation mobile */}
                <nav className="p-4">
                  <div className="space-y-1">
                    {menuItems.map((item, index) => {
                      const Icon = item.icon
                      return (
                        <SheetClose asChild key={item.href}>
                          <Link
                            href={item.href}
                            className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${item.highlight
                              ? "bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 border border-yellow-200"
                              : "hover:bg-blue-50 text-gray-700 hover:text-primary"
                              }`}
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <div className={`p-2 rounded-lg ${item.highlight
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-blue-100 text-primary group-hover:bg-primary group-hover:text-white"
                              } transition-colors`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <span className="font-medium flex-1">{item.label}</span>
                            <ChevronRight className={`h-4 w-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all ${item.highlight ? "text-yellow-500" : "text-primary"
                              }`} />
                          </Link>
                        </SheetClose>
                      )
                    })}
                  </div>

                  {/* Bouton Mon Compte */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <SheetClose asChild>
                      <Button asChild className="w-full h-12 bg-gradient-to-r from-primary to-blue-700 hover:from-blue-700 hover:to-primary shadow-lg text-base font-semibold">
                        <Link href="/compte" className="flex items-center justify-center gap-2">
                          <User className="h-5 w-5" />
                          Mon Compte
                        </Link>
                      </Button>
                    </SheetClose>
                  </div>

                  {/* Contact rapide */}
                  <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Contactez-nous</p>
                    <div className="space-y-2">
                      <a
                        href="tel:0467200444"
                        className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors"
                      >
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <Phone className="h-4 w-4 text-primary" />
                        </div>
                        04 67 20 04 44
                      </a>
                      <a
                        href="mailto:climacontrol.clim@gmail.com"
                        className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors"
                      >
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>
                        <span className="truncate">climacontrol.clim@gmail.com</span>
                      </a>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
