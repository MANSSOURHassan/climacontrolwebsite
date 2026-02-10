
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Package, Search, MapPin, Calendar, CreditCard } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export default function OrderTrackingPage() {
    const [searchParams, setSearchParams] = useState({ numero: "", email: "" })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [order, setOrder] = useState<any | null>(null)

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!searchParams.numero || !searchParams.email) {
            setError("Veuillez remplir tous les champs")
            return
        }

        setLoading(true)
        setError(null)
        setOrder(null)

        try {
            const res = await fetch(`/api/commandes/suivi?numero=${searchParams.numero}&email=${searchParams.email}`)
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Une erreur est survenue")
            }

            setOrder(data.commande)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Suivi de Commande</h1>
                    <p className="mt-2 text-gray-600">Entrez votre numéro de commande et votre email pour suivre votre colis.</p>
                </div>

                {/* Search Form */}
                <Card className="shadow-lg border-primary/10">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="numero">Numéro de commande (ex: CMD2024...)</Label>
                                    <div className="relative">
                                        <Package className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="numero"
                                            placeholder="CMD202402-1234"
                                            className="pl-9"
                                            value={searchParams.numero}
                                            onChange={(e) => setSearchParams({ ...searchParams, numero: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email utilisé lors de la commande</Label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="client@exemple.com"
                                            className="pl-9"
                                            value={searchParams.email}
                                            onChange={(e) => setSearchParams({ ...searchParams, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
                                    {error}
                                </div>
                            )}

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Recherche en cours...
                                    </>
                                ) : (
                                    "Suivre ma commande"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Order Details */}
                {order && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">

                        {/* Status Card */}
                        <Card className="border-l-4 border-l-primary shadow-md">
                            <CardContent className="pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        Commande {order.numero_commande}
                                        <Badge variant={order.statut === 'livre' ? "default" : "secondary"}>
                                            {getStatusLabel(order.statut)}
                                        </Badge>
                                    </h3>
                                    <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                        <Calendar className="h-4 w-4" />
                                        Passée le {format(new Date(order.created_at || order.date_commande), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-primary">{Number(order.montant_ttc).toFixed(2)} €</div>
                                    <div className="text-sm text-gray-500 flex items-center justify-end gap-1">
                                        <CreditCard className="h-3 w-3" />
                                        Paiement: {order.mode_paiement || order.notes?.replace('Paiement: ', '') || "Non spécifié"}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Delivery & Items */}
                        <div className="grid md:grid-cols-3 gap-6">

                            {/* Delivery Info */}
                            <Card className="md:col-span-1 shadow-md h-full">
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-primary" />
                                        Adresse de livraison
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-sm space-y-1">
                                        <p className="font-semibold">{order.prenom} {order.nom}</p>
                                        <p className="whitespace-pre-line text-gray-600">
                                            {order.adresse_livraison}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Items List */}
                            <Card className="md:col-span-2 shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Package className="h-4 w-4 text-primary" />
                                        Contenu de la commande
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="divide-y">
                                        {order.items?.map((item: any, i: number) => (
                                            <div key={i} className="py-3 first:pt-0 last:pb-0 flex justify-between items-center">
                                                <div>
                                                    <p className="font-medium text-gray-900">{item.nom_produit}</p>
                                                    <p className="text-xs text-gray-500">Réf: {item.reference_produit || "N/A"}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-semibold">{Number(item.prix_unitaire_ht * item.quantite * 1.2).toFixed(2)} €</p>
                                                    <p className="text-xs text-gray-500">Qté: {item.quantite}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-4 border-t flex justify-between items-center text-sm font-medium">
                                        <span>Total commande</span>
                                        <span className="text-lg text-primary">{Number(order.montant_ttc).toFixed(2)} €</span>
                                    </div>
                                </CardContent>
                            </Card>

                        </div>

                        {/* Timeline Steps (Visual sugar) */}
                        <Card className="shadow-md">
                            <CardContent className="pt-8 pb-8">
                                <div className="relative">
                                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full hidden md:block"></div>
                                    <div className="flex justify-between relative z-10 flex-col md:flex-row gap-8 md:gap-0">
                                        {[
                                            { status: 'en_attente', label: 'Confirmée', date: order.created_at },
                                            { status: 'preparation', label: 'En préparation', date: null },
                                            { status: 'expedie', label: 'Expédiée', date: null },
                                            { status: 'livre', label: 'Livrée', date: null }
                                        ].map((step, idx) => {
                                            const isCompleted = getStepStatus(order.statut) >= idx;
                                            return (
                                                <div key={step.status} className="flex flex-col items-center group">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${isCompleted ? 'bg-primary border-primary text-white' : 'bg-white border-gray-300 text-gray-300'}`}>
                                                        {isCompleted ? <Package className="h-4 w-4" /> : <div className="h-2 w-2 rounded-full bg-gray-300" />}
                                                    </div>
                                                    <p className={`mt-2 text-sm font-medium ${isCompleted ? 'text-primary' : 'text-gray-400'}`}>{step.label}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                )}
            </div>
        </div>
    )
}

function getStatusLabel(status: string) {
    const labels: Record<string, string> = {
        'en_attente': 'En attente',
        'confirme': 'Confirmée',
        'preparation': 'En préparation',
        'expedie': 'Expédiée',
        'livre': 'Livrée',
        'annule': 'Annulée'
    }
    return labels[status] || status
}

function getStepStatus(status: string) {
    const steps = ['en_attente', 'preparation', 'expedie', 'livre'];
    // Map status to index in tracking steps
    // Adjust logic if your DB statuses are different
    if (status === 'confirme') return 0;
    return steps.indexOf(status);
}
