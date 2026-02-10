// ==============================
// DIRECTIVE CLIENT
// ==============================
// "use client" indique que ce composant utilise des fonctionnalités côté client
// (hooks React, événements utilisateur, navigation dynamique)
"use client"

// ==============================
// IMPORTS DES DÉPENDANCES
// ==============================
// Type React pour typer les événements
import type React from "react"

// Hook React pour gérer l'état local
import { useState, useEffect } from "react"

// Composants UI réutilisables de la bibliothèque shadcn/ui
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Hook personnalisé pour gérer le panier
import { useCart } from "@/lib/cart-context"

// Hook Next.js pour la navigation programmatique
import { useRouter } from "next/navigation"

// Icônes SVG de la bibliothèque lucide-react
import { ShoppingCart, CreditCard, Truck, CheckCircle2, AlertCircle } from "lucide-react"

// Composant Next.js pour l'optimisation d'images
import Image from "next/image"

// Hook personnalisé pour afficher des notifications toast
import { useToast } from "@/hooks/use-toast"

// ==============================
// COMPOSANT PRINCIPAL : PAGE CHECKOUT (CLIENT)
// ==============================
// Cette page permet de finaliser une commande en 3 étapes :
// 1. Informations de livraison
// 2. Mode de paiement
// 3. Confirmation
export default function CheckoutClient() {
  // Récupère les données et fonctions du panier
  const { items, total, clearCart } = useCart()
  // Hook pour naviguer entre les pages
  const router = useRouter()
  // Hook pour afficher des notifications
  const { toast } = useToast()

  // ==============================
  // ÉTATS LOCAUX
  // ==============================
  // Étape actuelle du processus de commande (1, 2 ou 3)
  const [step, setStep] = useState(1)
  // État de chargement pendant le traitement de la commande
  const [loading, setLoading] = useState(false)

  // Données du formulaire de commande
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
    code_postal: "",
    ville: "",
    mode_paiement: "carte", // Mode de paiement par défaut
    carte_nom: "",
    carte_numero: "",
    carte_expiration: "",
    carte_cvc: "",
    paypal_email: "",
    virement_titulaire: "",
    cheque_emetteur: "",
    cheque_banque: "",
  })

  // ==============================
  // GESTIONNAIRE DE CHANGEMENT D'INPUT
  // ==============================
  // Met à jour les données du formulaire quand l'utilisateur tape
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Récupérer les données du client connecté
  useEffect(() => {
    const clientData = localStorage.getItem("client")
    if (clientData) {
      const client = JSON.parse(clientData)
      setFormData((prev) => ({
        ...prev,
        prenom: client.prenom || "",
        nom: client.nom || "",
        email: client.email || "",
        telephone: client.telephone || "",
      }))
    }
  }, [])

  // ==============================
  // FONCTION DE SOUMISSION DE COMMANDE
  // ==============================
  // Traite le paiement et enregistre la commande
  const handleSubmitOrder = async () => {
    setLoading(true)

    const clientData = localStorage.getItem("client")
    const loggedClient = clientData ? JSON.parse(clientData) : null

    // Validation des champs de paiement
    if (formData.mode_paiement === "carte") {
      if (!formData.carte_nom || !formData.carte_numero || !formData.carte_expiration || !formData.carte_cvc) {
        toast({ title: "Erreur", description: "Veuillez remplir tous les champs bancaires", variant: "destructive" })
        setLoading(false); return
      }
    } else if (formData.mode_paiement === "paypal") {
      if (!formData.paypal_email) {
        toast({ title: "Erreur", description: "Veuillez entrer votre email PayPal", variant: "destructive" })
        setLoading(false); return
      }
    } else if (formData.mode_paiement === "virement") {
      if (!formData.virement_titulaire) {
        toast({ title: "Erreur", description: "Veuillez entrer le nom du titulaire du compte", variant: "destructive" })
        setLoading(false); return
      }
    } else if (formData.mode_paiement === "cheque") {
      if (!formData.cheque_emetteur || !formData.cheque_banque) {
        toast({ title: "Erreur", description: "Veuillez remplir les informations du chèque", variant: "destructive" })
        setLoading(false); return
      }
    }

    try {
      // Simule le traitement de paiement (délai de 2 secondes)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Appel API pour créer la commande en base de données
      const response = await fetch("/api/commandes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: loggedClient?.id || 1,
          // Formatage des articles du panier pour l'API
          items: items.map((item) => ({
            produit_id: item.id,
            nom_produit: item.nom,
            quantite: item.quantite,
            prix_unitaire: item.prix ?? 0,
          })),
          mode_paiement: formData.mode_paiement,
          client: {
            prenom: formData.prenom,
            nom: formData.nom,
            email: formData.email,
            telephone: formData.telephone,
          },
          // Adresse de livraison
          adresse_livraison: {
            adresse: formData.adresse,
            code_postal: formData.code_postal,
            ville: formData.ville,
          },
        }),
      })

      const data = await response.json()

      // Si la commande est réussie
      if (data.success) {
        // Vide le panier
        clearCart()
        // Affiche une notification de succès
        toast({
          title: "Commande confirmée !",
          description: `Votre commande ${data.numero_commande} a été enregistrée avec succès.`,
        })
        // Redirige vers la page de confirmation
        router.push(`/commande/confirmation/${data.commande_id}`)
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      // En cas d'erreur, affiche une notification d'erreur
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la commande",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // ==============================
  // REDIRECTION SI PANIER VIDE
  // ==============================
  // Si le panier est vide, redirige vers la page panier
  useEffect(() => {
    if (items.length === 0) {
      router.push("/panier")
    }
  }, [items, router])

  if (items.length === 0) {
    return null
  }

  // Calcul du total TTC (ajout de 20% de TVA)
  const totalTTC = total * 1.2

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Titre de la page */}
            <h1 className="text-4xl font-bold mb-8 text-primary text-center">Finaliser ma commande</h1>

            {/* ==========================
                INDICATEUR D'ÉTAPES
            ========================== */}
            {/* Affiche les 3 étapes du processus de commande */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center gap-4">
                {/* Étape 1 : Livraison */}
                <div className={`flex items-center gap-2 ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-white" : "bg-muted"}`}
                  >
                    1
                  </div>
                  <span className="font-medium hidden sm:inline">Livraison</span>
                </div>
                <div className="w-12 h-0.5 bg-border" />
                {/* Étape 2 : Paiement */}
                <div className={`flex items-center gap-2 ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-white" : "bg-muted"}`}
                  >
                    2
                  </div>
                  <span className="font-medium hidden sm:inline">Paiement</span>
                </div>
                <div className="w-12 h-0.5 bg-border" />
                {/* Étape 3 : Confirmation */}
                <div className={`flex items-center gap-2 ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-white" : "bg-muted"}`}
                  >
                    3
                  </div>
                  <span className="font-medium hidden sm:inline">Confirmation</span>
                </div>
              </div>
            </div>

            {/* Grille à 3 colonnes : Formulaire (2 colonnes) + Récapitulatif (1 colonne) */}
            <div className="grid lg:grid-cols-3 gap-8">

              {/* ===== COLONNE GAUCHE : FORMULAIRES ===== */}
              <div className="lg:col-span-2 space-y-6">

                {/* ========== ÉTAPE 1 : INFORMATIONS DE LIVRAISON ========== */}
                {step === 1 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Truck className="h-6 w-6 text-primary" />
                        Informations de livraison
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Prénom et Nom */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="prenom">Prénom *</Label>
                          <Input
                            id="prenom"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="nom">Nom *</Label>
                          <Input id="nom" name="nom" value={formData.nom} onChange={handleInputChange} required />
                        </div>
                      </div>
                      {/* Email */}
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      {/* Téléphone */}
                      <div>
                        <Label htmlFor="telephone">Téléphone *</Label>
                        <Input
                          id="telephone"
                          name="telephone"
                          type="tel"
                          value={formData.telephone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      {/* Adresse */}
                      <div>
                        <Label htmlFor="adresse">Adresse *</Label>
                        <Input
                          id="adresse"
                          name="adresse"
                          value={formData.adresse}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      {/* Code postal et Ville */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="code_postal">Code postal *</Label>
                          <Input
                            id="code_postal"
                            name="code_postal"
                            value={formData.code_postal}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="ville">Ville *</Label>
                          <Input id="ville" name="ville" value={formData.ville} onChange={handleInputChange} required />
                        </div>
                      </div>
                      {/* Bouton pour passer à l'étape 2 */}
                      <Button size="lg" className="w-full" onClick={() => setStep(2)}>
                        Continuer vers le paiement
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* ========== ÉTAPE 2 : MODE DE PAIEMENT ========== */}
                {step === 2 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-6 w-6 text-primary" />
                        Mode de paiement
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Groupe de boutons radio pour le mode de paiement */}
                      <RadioGroup
                        value={formData.mode_paiement}
                        onValueChange={(val) => setFormData({ ...formData, mode_paiement: val })}
                      >
                        {/* Option Carte bancaire */}
                        <div className={`p-4 border rounded-lg hover:border-primary cursor-pointer transition-all ${formData.mode_paiement === "carte" ? "border-primary bg-primary/5" : ""}`}>
                          <div className="flex items-center space-x-3 mb-4">
                            <RadioGroupItem value="carte" id="carte" />
                            <Label htmlFor="carte" className="flex-1 cursor-pointer">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold">Carte bancaire</p>
                                  <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                                </div>
                                <CreditCard className="h-6 w-6 text-primary" />
                              </div>
                            </Label>
                          </div>

                          {formData.mode_paiement === "carte" && (
                            <div className="grid gap-4 pl-7 animate-in fade-in slide-in-from-top-2">
                              <div className="grid gap-2">
                                <Label htmlFor="carte_nom">Nom du titulaire</Label>
                                <Input
                                  id="carte_nom"
                                  name="carte_nom"
                                  placeholder="M. Jean Dupont"
                                  value={formData.carte_nom || ""}
                                  onChange={handleInputChange}
                                  required={formData.mode_paiement === "carte"}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="carte_numero">Numéro de carte</Label>
                                <Input
                                  id="carte_numero"
                                  name="carte_numero"
                                  placeholder="0000 0000 0000 0000"
                                  value={formData.carte_numero || ""}
                                  onChange={handleInputChange}
                                  required={formData.mode_paiement === "carte"}
                                  maxLength={19}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="carte_expiration">Date d'expiration</Label>
                                  <Input
                                    id="carte_expiration"
                                    name="carte_expiration"
                                    placeholder="MM/AA"
                                    value={formData.carte_expiration || ""}
                                    onChange={handleInputChange}
                                    required={formData.mode_paiement === "carte"}
                                    maxLength={5}
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="carte_cvc">CVC</Label>
                                  <Input
                                    id="carte_cvc"
                                    name="carte_cvc"
                                    placeholder="123"
                                    value={formData.carte_cvc || ""}
                                    onChange={handleInputChange}
                                    required={formData.mode_paiement === "carte"}
                                    maxLength={3}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Option PayPal */}
                        <div className={`p-4 border rounded-lg hover:border-primary cursor-pointer transition-all ${formData.mode_paiement === "paypal" ? "border-primary bg-primary/5" : ""}`}>
                          <div className="flex items-center space-x-3 mb-4">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold">PayPal</p>
                                  <p className="text-sm text-muted-foreground">Paiement sécurisé via PayPal</p>
                                </div>
                                <span className="text-2xl font-bold text-[#0070ba]">PayPal</span>
                              </div>
                            </Label>
                          </div>
                          {formData.mode_paiement === "paypal" && (
                            <div className="grid gap-4 pl-7 animate-in fade-in slide-in-from-top-2">
                              <div className="grid gap-2">
                                <Label htmlFor="paypal_email">Email PayPal</Label>
                                <Input
                                  id="paypal_email"
                                  name="paypal_email"
                                  type="email"
                                  placeholder="exemple@email.com"
                                  value={formData.paypal_email || ""}
                                  onChange={handleInputChange}
                                  required={formData.mode_paiement === "paypal"}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Option Virement bancaire */}
                        <div className={`p-4 border rounded-lg hover:border-primary cursor-pointer transition-all ${formData.mode_paiement === "virement" ? "border-primary bg-primary/5" : ""}`}>
                          <div className="flex items-center space-x-3 mb-4">
                            <RadioGroupItem value="virement" id="virement" />
                            <Label htmlFor="virement" className="flex-1 cursor-pointer">
                              <div>
                                <p className="font-semibold">Virement bancaire</p>
                                <p className="text-sm text-muted-foreground">
                                  Instructions envoyées par email après commande
                                </p>
                              </div>
                            </Label>
                          </div>
                          {formData.mode_paiement === "virement" && (
                            <div className="grid gap-4 pl-7 animate-in fade-in slide-in-from-top-2">
                              <div className="grid gap-2">
                                <Label htmlFor="virement_titulaire">Nom du titulaire du compte émetteur</Label>
                                <Input
                                  id="virement_titulaire"
                                  name="virement_titulaire"
                                  placeholder="M. Jean Dupont"
                                  value={formData.virement_titulaire || ""}
                                  onChange={handleInputChange}
                                  required={formData.mode_paiement === "virement"}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Option Chèque */}
                        <div className={`p-4 border rounded-lg hover:border-primary cursor-pointer transition-all ${formData.mode_paiement === "cheque" ? "border-primary bg-primary/5" : ""}`}>
                          <div className="flex items-center space-x-3 mb-4">
                            <RadioGroupItem value="cheque" id="cheque" />
                            <Label htmlFor="cheque" className="flex-1 cursor-pointer">
                              <div>
                                <p className="font-semibold">Chèque</p>
                                <p className="text-sm text-muted-foreground">Envoi par courrier - délai 5 jours</p>
                              </div>
                            </Label>
                          </div>
                          {formData.mode_paiement === "cheque" && (
                            <div className="grid gap-4 pl-7 animate-in fade-in slide-in-from-top-2">
                              <div className="grid gap-2">
                                <Label htmlFor="cheque_emetteur">Nom de l'émetteur</Label>
                                <Input
                                  id="cheque_emetteur"
                                  name="cheque_emetteur"
                                  placeholder="M. Jean Dupont"
                                  value={formData.cheque_emetteur || ""}
                                  onChange={handleInputChange}
                                  required={formData.mode_paiement === "cheque"}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="cheque_banque">Banque</Label>
                                <Input
                                  id="cheque_banque"
                                  name="cheque_banque"
                                  placeholder="Nom de la banque"
                                  value={formData.cheque_banque || ""}
                                  onChange={handleInputChange}
                                  required={formData.mode_paiement === "cheque"}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </RadioGroup>

                      {/* Message de sécurité */}
                      <div className="bg-accent/10 p-4 rounded-lg flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium mb-1">Paiement sécurisé</p>
                          <p className="text-muted-foreground">
                            Toutes les transactions sont cryptées et sécurisées. Vos informations bancaires ne sont
                            jamais stockées.
                          </p>
                        </div>
                      </div>

                      {/* Boutons Retour et Payer */}
                      <div className="flex gap-4">
                        <Button size="lg" variant="outline" onClick={() => setStep(1)} className="flex-1">
                          Retour
                        </Button>
                        <Button size="lg" onClick={handleSubmitOrder} disabled={loading} className="flex-1">
                          {loading ? "Traitement..." : `Payer ${totalTTC.toFixed(2)}€`}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* ===== COLONNE DROITE : RÉCAPITULATIF DE COMMANDE ===== */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Récapitulatif
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Liste des articles avec scroll si trop nombreux */}
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3 pb-3 border-b last:border-0">
                          {/* Image du produit */}
                          <div className="relative w-16 h-16 shrink-0 rounded overflow-hidden bg-muted">
                            <Image
                              src={item.image || "/placeholder.jpg"}
                              alt={item.nom}
                              fill
                              className="object-cover"
                            />
                          </div>
                          {/* Détails du produit */}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{item.nom}</p>
                            <p className="text-sm text-muted-foreground">Qté: {item.quantite}</p>
                            <p className="text-sm font-semibold text-primary">
                              {(item.prix * item.quantite).toFixed(2)}€
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Détails des prix */}
                    <div className="space-y-2 pt-4 border-t">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Sous-total HT</span>
                        <span className="font-medium">{total.toFixed(2)}€</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">TVA (20%)</span>
                        <span className="font-medium">{(total * 0.2).toFixed(2)}€</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Livraison</span>
                        <span className="font-medium text-green-600">Gratuite</span>
                      </div>
                    </div>

                    {/* Total TTC */}
                    <div className="flex justify-between text-lg font-bold pt-4 border-t">
                      <span>Total TTC</span>
                      <span className="text-primary">{totalTTC.toFixed(2)}€</span>
                    </div>

                    {/* Avantages inclus */}
                    <div className="bg-accent/10 p-3 rounded-lg space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span>Livraison gratuite</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span>Garantie constructeur incluse</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span>Support technique gratuit</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
