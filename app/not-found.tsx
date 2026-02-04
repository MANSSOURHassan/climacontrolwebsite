import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Page non trouvée</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-5 w-5" />
              Retour à l'accueil
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
            <Link href="/produits">
              <Search className="h-5 w-5" />
              Voir nos produits
            </Link>
          </Button>
        </div>

        <div className="mt-12 pt-12 border-t">
          <h3 className="text-lg font-semibold mb-4">Besoin d'aide ?</h3>
          <p className="text-muted-foreground mb-4">Notre équipe est à votre disposition</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <a href="tel:0467200444" className="hover:text-primary transition-colors">
              📞 04 67 20 04 44
            </a>
            <a href="mailto:climacontrol.clim@gmail.com" className="hover:text-primary transition-colors">
              ✉️ climacontrol.clim@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
