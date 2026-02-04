import { User } from "lucide-react"
import CompteClient from "./compte-client"

export const metadata = {
  title: "Mon Compte | ClimaControl",
  description: "Accédez à votre espace client ClimaControl",
}

export default function ComptePage() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <User className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Mon espace client</h1>
            <p className="text-xl text-muted-foreground">Accédez à vos commandes, devis et informations personnelles</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-md">
          <CompteClient />
        </div>
      </section>
    </main>
  )
}
