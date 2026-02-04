"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Clock, CalendarDays, Wrench } from "lucide-react"

export default function BookingPage() {
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [serviceType, setServiceType] = useState("")
    const [timeSlot, setTimeSlot] = useState("")
    const [contact, setContact] = useState({ name: "", phone: "", address: "", notes: "" })
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!date || !serviceType || !timeSlot) {
            toast({ title: "Incomplet", description: "Veuillez remplir tous les champs obligatoires.", variant: "destructive" })
            return
        }

        setLoading(true)

        // Check auth
        const { data: { user } } = await supabase.auth.getUser()

        // Insert appointment
        const { error } = await supabase.from('appointments').insert([{
            user_id: user?.id || null, // Allow guest booking if user columns allows null (need to update table def if strictly linked, but let's assume mixed usage or logged in)
            // Actually for now let's assume we store guest info in notes if not logged in, or require login.
            // Let's just put guest info in notes for simplicity in this demo.
            service_type: serviceType,
            date: format(date, 'yyyy-MM-dd'),
            time_slot: timeSlot,
            notes: `Contact: ${contact.name} - ${contact.phone} - ${contact.address}\nNotes: ${contact.notes}`,
            status: 'pending'
        }])

        setLoading(false)

        if (error) {
            console.error(error)
            toast({ title: "Erreur", description: "Erreur lors de la prise de rendez-vous.", variant: "destructive" })
        } else {
            toast({ title: "Confirmé !", description: "Votre demande de rendez-vous a été envoyée." })
            // Reset form
            setContact({ name: "", phone: "", address: "", notes: "" })
            setDate(undefined)
        }
    }

    return (
        <main className="min-h-screen py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-5xl">
                <h1 className="text-4xl font-bold text-center mb-4">Prendre Rendez-vous</h1>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Planifiez une installation, un entretien ou un devis gratuit avec nos experts certifiés.
                </p>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Calendar Section */}
                    <Card className="lg:col-span-1 h-fit">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CalendarDays className="w-5 h-5 text-primary" />
                                Choisir une date
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border mx-auto"
                                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6} // No weekends
                                locale={fr}
                            />
                        </CardContent>
                    </Card>

                    {/* Form Section */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Wrench className="w-5 h-5 text-primary" />
                                Détails de l'intervention
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Type de service</Label>
                                        <Select onValueChange={setServiceType}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="devis">Devis à domicile (Gratuit)</SelectItem>
                                                <SelectItem value="installation">Installation</SelectItem>
                                                <SelectItem value="entretien">Entretien / Maintenance</SelectItem>
                                                <SelectItem value="depannage">Dépannage</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Créneau horaire</Label>
                                        <Select onValueChange={setTimeSlot}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Préférence..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="matin">Matin (8h - 12h)</SelectItem>
                                                <SelectItem value="apres-midi">Après-midi (13h - 17h)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t">
                                    <h3 className="font-medium">Vos coordonnées</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Nom complet</Label>
                                            <Input id="name" value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Téléphone</Label>
                                            <Input id="phone" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Adresse d'intervention</Label>
                                        <Input id="address" value={contact.address} onChange={e => setContact({ ...contact, address: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="notes">Notes complémentaires (Code porte, étage...)</Label>
                                        <Textarea id="notes" value={contact.notes} onChange={e => setContact({ ...contact, notes: e.target.value })} />
                                    </div>
                                </div>

                                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                                    {loading ? "Envoi..." : "Confirmer le rendez-vous"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    )
}
