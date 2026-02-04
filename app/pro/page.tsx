"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle, Briefcase, TrendingUp, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function ProPage() {
    const [formData, setFormData] = useState({
        prenom: "",
        nom: "",
        email: "",
        password: "",
        siret: "",
        company: ""
    })
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    type_client: 'professionnel'
                })
            })
            const data = await res.json()

            if (!res.ok) throw new Error(data.error || "Erreur inscription")

            toast({ title: "Bienvenue !", description: "Votre compte PRO a été créé." })
            router.push('/compte/dashboard')
        } catch (error: any) {
            toast({ title: "Erreur", description: error.message, variant: "destructive" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <BadgePro />
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-4">L'Espace dédié aux Professionnels</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                        Installeurs, architectes, revendeurs : accédez à nos tarifs préférentiels et services exclusifs.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16 -mt-10">
                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Left: Benefits */}
                    <div className="space-y-8">
                        <Card className="border-l-4 border-l-primary shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-2xl">
                                    <TrendingUp className="text-primary w-8 h-8" />
                                    Pourquoi devenir partenaire ?
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <Benefit
                                    title="Tarifs Préférentiels"
                                    desc="Jusqu'à -30% sur le catalogue public et remises sur volume."
                                />
                                <Benefit
                                    title="Support Prioritaire"
                                    desc="Ligne directe dédiée aux pros pour assistance technique et SAV."
                                />
                                <Benefit
                                    title="Paiement Différé"
                                    desc="Conditions de paiement à 30 jours (sur dossier)."
                                />
                                <Benefit
                                    title="Outils Exclusifs"
                                    desc="Accès à nos simulateurs avancés et configurateurs de devis."
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Registration Form */}
                    <Card className="shadow-2xl">
                        <CardHeader className="bg-white">
                            <CardTitle>Créer un compte PRO gratuit</CardTitle>
                            <CardDescription>Accès immédiat après validation du SIRET</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Prénom</Label>
                                        <Input value={formData.prenom} onChange={e => setFormData({ ...formData, prenom: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Nom</Label>
                                        <Input value={formData.nom} onChange={e => setFormData({ ...formData, nom: e.target.value })} required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Société / Raison Sociale</Label>
                                    <Input value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} required />
                                </div>

                                <div className="space-y-2">
                                    <Label>Numéro SIRET</Label>
                                    <Input value={formData.siret} onChange={e => setFormData({ ...formData, siret: e.target.value })} placeholder="123 456 789 00012" required />
                                </div>

                                <div className="space-y-2">
                                    <Label>Email Professionnel</Label>
                                    <Input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                                </div>

                                <div className="space-y-2">
                                    <Label>Mot de passe</Label>
                                    <Input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required minLength={8} />
                                </div>

                                <Button type="submit" className="w-full h-12 text-lg mt-4" disabled={loading}>
                                    {loading ? "Création du compte..." : "S'inscrire comme PRO"}
                                </Button>

                                <p className="text-xs text-center text-gray-400 mt-4">
                                    En vous inscrivant, vous acceptez nos CGV Pro.
                                </p>
                            </form>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </main>
    )
}

function Benefit({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="flex gap-4">
            <div className="mt-1">
                <CheckCircle className="text-green-500 w-6 h-6" />
            </div>
            <div>
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-gray-600">{desc}</p>
            </div>
        </div>
    )
}

function BadgePro() {
    return (
        <span className="inline-flex items-center gap-1 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Briefcase className="w-3 h-3" /> Espace Pro
        </span>
    )
}
