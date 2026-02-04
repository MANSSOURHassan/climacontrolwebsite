"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle2, Package, Truck, Home, MapPin } from "lucide-react"

interface Commande {
  id: number
  numero_commande: string
  statut: string
  montant_ttc: number
  adresse_livraison: string
  created_at: string
}

interface Ligne {
  nom_produit: string
  quantite: number
  prix_unitaire_ht: number
}

export default function ConfirmationClient({ commandeId }: { commandeId: string }) {
  const [commande, setCommande] = useState<Commande | null>(null)
  const [lignes, setLignes] = useState<Ligne[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/commandes/${commandeId}`)
      .then((res) => res.json())
      .then((data) => {
        setCommande(data.commande)
        setLignes(data.lignes)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [commandeId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    )
  }

  if (!commande) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Commande non trouvée</p>
      </div>
    )
  }

  const statutSteps = [
    { key: "en_attente", label: "Confirmée", icon: CheckCircle2, color: "text-green-600" },
    { key: "en_preparation", label: "En préparation", icon: Package, color: "text-primary" },
    { key: "en_livraison", label: "En livraison", icon: Truck, color: "text-orange-600" },
    { key: "livree", label: "Livrée", icon: Home, color: "text-purple-600" },
  ]

  const currentStepIndex = statutSteps.findIndex((s) => s.key === commande.statut)

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-green-50 to-background">
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="border-2 border-green-600">
            <CardHeader className="text-center bg-green-50">
              <div className="mx-auto mb-4 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl text-green-600">Commande confirmée !</CardTitle>
              <p className="text-muted-foreground mt-2">
                Merci pour votre confiance. Votre commande a été enregistrée avec succès.
              </p>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Numéro de commande</p>
                    <p className="font-bold text-lg text-primary">{commande.numero_commande}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Montant total</p>
                    <p className="font-bold text-lg">{Number(commande.montant_ttc).toFixed(2)}€</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Adresse de livraison
                    </p>
                    <p className="font-medium">{commande.adresse_livraison}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4 text-primary">Suivi de votre commande</h3>
                <div className="relative">
                  <div className="absolute top-6 left-0 right-0 h-0.5 bg-border" />
                  <div className="relative flex justify-between">
                    {statutSteps.map((step, index) => {
                      const Icon = step.icon
                      const isCompleted = index <= currentStepIndex
                      const isCurrent = index === currentStepIndex

                      return (
                        <div key={step.key} className="flex flex-col items-center gap-2">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 bg-background ${isCompleted
                              ? `${step.color} border-current`
                              : "border-muted-foreground text-muted-foreground"
                              }`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <span
                            className={`text-xs text-center max-w-20 ${isCurrent ? "font-bold text-primary" : isCompleted ? "font-medium" : "text-muted-foreground"}`}
                          >
                            {step.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Détails de la commande</h3>
                <div className="space-y-3">
                  {lignes.map((ligne, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-accent/5 rounded-lg">
                      <div>
                        <p className="font-medium">{ligne.nom_produit}</p>
                        <p className="text-sm text-muted-foreground">Quantité: {ligne.quantite}</p>
                      </div>
                      <p className="font-semibold">
                        {(Number(ligne.prix_unitaire_ht) * ligne.quantite * 1.2).toFixed(2)}€
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button size="lg" className="flex-1" asChild>
                  <Link href="/compte/dashboard">Voir mes commandes</Link>
                </Button>
                <Button size="lg" variant="outline" className="flex-1 bg-transparent" asChild>
                  <Link href="/produits">Continuer mes achats</Link>
                </Button>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg text-sm">
                <p className="font-medium text-blue-900 mb-2">📧 Confirmation envoyée</p>
                <p className="text-blue-700">
                  Un email de confirmation avec tous les détails de votre commande et le lien de suivi a été envoyé à
                  votre adresse email.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
