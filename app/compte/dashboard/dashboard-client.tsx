"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, FileText, User, LogOut, ShoppingBag, Truck } from "lucide-react"
import type { Client } from "@/types/client"
import { supabase } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"

interface Order {
  id: number
  date_commande: string
  statut: string
  montant_total: number
}

export default function DashboardClient() {
  const router = useRouter()
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [appointments, setAppointments] = useState<any[]>([])

  useEffect(() => {
    const initDashboard = async () => {
      // 1. Get user from local storage (or supabase session if we fully migrated)
      // For now we stick to the existing hybrid approach the user has
      const clientData = localStorage.getItem("client")

      if (!clientData) {
        router.push("/compte")
        return
      }

      const clientObj = JSON.parse(clientData)
      setClient(clientObj)

      // 2. Fetch Orders
      const { data: ordersData } = await supabase
        .from('commandes')
        .select('*')
        .eq('client_id', clientObj.id)
        .order('date_commande', { ascending: false })

      if (ordersData) setOrders(ordersData)

      // 3. Fetch Appointments
      const { data: appointmentsData } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', clientObj.id)
        .order('date', { ascending: false })

      if (appointmentsData) setAppointments(appointmentsData)

      setLoading(false)
    }

    initDashboard()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("client")
    router.push("/")
  }

  if (loading) return <div className="p-20 text-center">Chargement de votre espace...</div>
  if (!client) return null

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Bonjour, {client.prenom}
            </h1>
            <p className="text-gray-500">Bienvenue sur votre espace client ClimaControl.</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-blue-50 border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">Commandes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700">{orders.length}</div>
              <p className="text-xs text-blue-600">Total commandes passées</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-900">Rendez-vous</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-700">{appointments.length}</div>
              <p className="text-xs text-purple-600">Interventions programmées</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-900">Mon Panier</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">-</div> {/* Todo: Connect to cart context if needed */}
              <Button variant="link" className="h-auto p-0 text-green-700" onClick={() => router.push('/panier')}>
                Voir mon panier &rarr;
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Historique des Commandes
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingBag className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                    <p>Vous n'avez pas encore passé de commande.</p>
                    <Button variant="link" onClick={() => router.push('/produits')}>Commencer mes achats</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div>
                          <div className="font-semibold">Commande #{order.id}</div>
                          <div className="text-sm text-gray-500">{new Date(order.date_commande).toLocaleDateString()}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{order.montant_total} €</div>
                          <Badge variant={order.statut === 'livré' ? 'secondary' : 'default'} className="capitalize">
                            {order.statut}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Mes Rendez-vous
                </CardTitle>
              </CardHeader>
              <CardContent>
                {appointments.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">Aucun rendez-vous planifié.</p>
                ) : (
                  <div className="space-y-4">
                    {appointments.map(apt => (
                      <div key={apt.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                        <div>
                          <div className="font-semibold capitalize">{apt.service_type}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            {new Date(apt.date).toLocaleDateString()}
                          </div>
                        </div>
                        <Badge>{apt.status}</Badge>
                      </div>
                    ))}
                  </div>
                )}
                <Button variant="outline" className="w-full mt-4" onClick={() => router.push('/rendez-vous')}>
                  Prendre un nouveau rendez-vous
                </Button>
              </CardContent>
            </Card>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mon Profil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                    {client.prenom[0]}{client.nom[0]}
                  </div>
                  <div>
                    <p className="font-medium">{client.prenom} {client.nom}</p>
                    <p className="text-sm text-gray-500">{client.email}</p>
                  </div>
                </div>
                {client.type_client === 'professionnel' && (
                  <Badge className="w-full justify-center bg-yellow-500 hover:bg-yellow-600">Compte PRO</Badge>
                )}
                <div className="text-sm text-gray-500 pt-2 border-t">
                  <p>Siret: {client.siret || 'N/A'}</p>
                  <p>Société: {client.company || 'N/A'}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
