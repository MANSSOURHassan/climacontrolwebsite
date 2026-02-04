"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import { ArrowRight, Calculator, CheckCircle, HelpCircle } from "lucide-react"

export default function SimulatorPage() {
    const [step, setStep] = useState(1)
    const [result, setResult] = useState<number | null>(null)

    const [formData, setFormData] = useState({
        roomType: "bedroom", // bedroom, living, office
        surface: 20,
        height: 2.5,
        isolation: "good", // bad, medium, good, bbc
        exposure: "north", // north, south, east, west
    })

    const calculatePower = () => {
        // Formula: Volume x Coeff Isolation + Exposure Bonus
        // Coeffs (W/m3): BBC=25, Good=35, Medium=45, Bad=60

        let coeff = 45 // updated below
        switch (formData.isolation) {
            case "bbc": coeff = 25; break;
            case "good": coeff = 35; break;
            case "medium": coeff = 45; break;
            case "bad": coeff = 60; break;
        }

        const volume = formData.surface * formData.height
        let power = volume * coeff

        // Exposure adjustment
        if (formData.exposure === "south") power *= 1.2
        if (formData.exposure === "west") power *= 1.1

        setResult(Math.ceil(power / 100) * 100) // Round to nearest 100W
        setStep(3) // Go to result step
    }

    return (
        <main className="min-h-screen py-16 bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-primary mb-4">Simulateur de Puissance</h1>
                    <p className="text-xl text-gray-600">
                        Trouvez la climatisation idéale pour votre pièce en 3 questions.
                    </p>
                </div>

                <Card className="shadow-2xl border-0 overflow-hidden">
                    <div className="bg-primary h-2 w-full">
                        <div
                            className="bg-accent h-full transition-all duration-500"
                            style={{ width: `${(step / 3) * 100}%` }}
                        />
                    </div>

                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                                {step}
                            </span>
                            {step === 1 && "Votre Pièce"}
                            {step === 2 && "Détails Techniques"}
                            {step === 3 && "Votre Résultat"}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-8">
                        {step === 1 && (
                            <div className="space-y-6">
                                <div>
                                    <Label className="mb-3 block text-lg">Quelle pièce souhaitez-vous climatiser ?</Label>
                                    <RadioGroup
                                        value={formData.roomType}
                                        onValueChange={(v) => setFormData({ ...formData, roomType: v })}
                                        className="grid grid-cols-3 gap-4"
                                    >
                                        {['bedroom', 'living', 'office'].map((type) => (
                                            <div key={type} className={`border-2 rounded-xl p-4 cursor-pointer hover:border-primary transition-all text-center ${formData.roomType === type ? 'border-primary bg-primary/5' : 'border-gray-100'}`}>
                                                <RadioGroupItem value={type} id={type} className="sr-only" />
                                                <Label htmlFor={type} className="cursor-pointer block">
                                                    <div className="font-semibold capitalize text-lg mb-1">{type === 'bedroom' ? 'Chambre' : type === 'living' ? 'Salon / Séjour' : 'Bureau'}</div>
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <div>
                                    <Label className="mb-3 block text-lg">Surface de la pièce (m²)</Label>
                                    <div className="flex items-center gap-4">
                                        <Slider
                                            value={[formData.surface]}
                                            max={100}
                                            step={1}
                                            onValueChange={(v) => setFormData({ ...formData, surface: v[0] })}
                                            className="flex-1"
                                        />
                                        <span className="font-bold text-2xl w-16 text-center">{formData.surface}</span>
                                    </div>
                                </div>

                                <div>
                                    <Label className="mb-3 block text-lg">Hauteur sous plafond (m)</Label>
                                    <div className="flex items-center gap-4">
                                        <Slider
                                            value={[formData.height]}
                                            max={5}
                                            min={2}
                                            step={0.1}
                                            onValueChange={(v) => setFormData({ ...formData, height: v[0] })}
                                            className="flex-1"
                                        />
                                        <span className="font-bold text-2xl w-16 text-center">{formData.height}</span>
                                    </div>
                                </div>

                                <Button onClick={() => setStep(2)} className="w-full h-12 text-lg">
                                    Suivant <ArrowRight className="ml-2" />
                                </Button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-8">
                                <div>
                                    <Label className="mb-3 block text-lg">Qualité de l'isolation</Label>
                                    <p className="text-sm text-gray-500 mb-4">Une bonne isolation permet de réduire la puissance nécessaire.</p>

                                    <RadioGroup
                                        value={formData.isolation}
                                        onValueChange={(v) => setFormData({ ...formData, isolation: v })}
                                        className="space-y-3"
                                    >
                                        {[
                                            { val: 'bbc', label: 'Excellent (RT2012 / RE2020)', desc: 'Maison très récente ou rénovée récemment' },
                                            { val: 'good', label: 'Bonne', desc: 'Maison de moins de 15 ans avec double vitrage' },
                                            { val: 'medium', label: 'Moyenne', desc: 'Maison des années 90-2000' },
                                            { val: 'bad', label: 'Faible', desc: 'Ancienne, simple vitrage ou isolation d\'époque' }
                                        ].map((opt) => (
                                            <div key={opt.val} className={`flex items-center space-x-3 border p-4 rounded-lg cursor-pointer hover:bg-gray-50 ${formData.isolation === opt.val ? 'border-primary ring-1 ring-primary' : ''}`}>
                                                <RadioGroupItem value={opt.val} id={opt.val} />
                                                <Label htmlFor={opt.val} className="flex-1 cursor-pointer">
                                                    <div className="font-semibold">{opt.label}</div>
                                                    <div className="text-sm text-gray-500">{opt.desc}</div>
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <div>
                                    <Label className="mb-3 block text-lg">Orientation de la fenêtre principale</Label>
                                    <RadioGroup
                                        value={formData.exposure}
                                        onValueChange={(v) => setFormData({ ...formData, exposure: v })}
                                        className="grid grid-cols-4 gap-2"
                                    >
                                        {['north', 'east', 'south', 'west'].map(dir => (
                                            <div key={dir} className={`border rounded-lg p-3 text-center cursor-pointer ${formData.exposure === dir ? 'bg-primary text-white border-primary' : 'hover:bg-gray-50'}`}>
                                                <RadioGroupItem value={dir} id={dir} className="sr-only" />
                                                <Label htmlFor={dir} className="cursor-pointer capitalize block w-full">
                                                    {dir === 'north' ? 'Nord' : dir === 'south' ? 'Sud' : dir === 'east' ? 'Est' : 'Ouest'}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <div className="flex gap-4">
                                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12">Retour</Button>
                                    <Button onClick={calculatePower} className="flex-1 h-12">
                                        Calculer <Calculator className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {step === 3 && result && (
                            <div className="text-center py-8">
                                <div className="mb-8">
                                    <p className="text-lg text-gray-500 mb-2">Puissance recommandée</p>
                                    <div className="text-6xl font-extrabold text-primary mb-2">
                                        {(result / 1000).toFixed(1)} kW
                                    </div>
                                    <p className="text-sm text-gray-400">({result} Watts)</p>
                                </div>

                                <div className="bg-green-50 p-6 rounded-xl border border-green-100 mb-8 max-w-sm mx-auto">
                                    <h3 className="font-semibold text-green-900 mb-2 flex items-center justify-center gap-2">
                                        <CheckCircle className="w-5 h-5" /> Notre conseil
                                    </h3>
                                    <p className="text-green-800">
                                        Pour une surface de {formData.surface}m², nous vous recommandons un climatiseur d'au moins
                                        <span className="font-bold"> {result < 2500 ? '2.5 kW' : result < 3500 ? '3.5 kW' : result < 5000 ? '5.0 kW' : '7.0 kW'}</span>.
                                    </p>
                                </div>

                                <Button size="lg" className="w-full sm:w-auto px-8" asChild>
                                    <Link href={`/produits?minPower=${Math.floor(result / 1000)}`}>
                                        Voir les modèles compatibles
                                    </Link>
                                </Button>

                                <div className="mt-8">
                                    <Button variant="link" onClick={() => setStep(1)} className="text-gray-500">
                                        Recommencer la simulation
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
