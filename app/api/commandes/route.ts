import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { supabase } from "@/lib/supabase"
import { z } from "zod"
import { sendOrderConfirmationEmail } from "@/lib/email"

const commandeSchema = z.object({
  client_id: z.number().optional(),
  client: z.object({
    prenom: z.string(),
    nom: z.string(),
    email: z.string().email(),
    telephone: z.string().optional(),
  }),
  items: z.array(
    z.object({
      produit_id: z.string(),
      nom_produit: z.string(),
      quantite: z.number().min(1),
      prix_unitaire: z.number().nonnegative(),
    }),
  ),
  mode_paiement: z.string(), // z.enum([...]) removed to allow other payment methods added dynamically
  adresse_livraison: z.object({
    adresse: z.string(),
    code_postal: z.string(),
    ville: z.string(),
  }),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = commandeSchema.parse(body)

    // Calculer les montants
    const montant_ht = data.items.reduce((sum, item) => sum + item.prix_unitaire * item.quantite, 0)
    const montant_tva = montant_ht * 0.2
    const montant_ttc = montant_ht + montant_tva

    // Générer numéro de commande
    const annee = new Date().getFullYear()
    const mois = String(new Date().getMonth() + 1).padStart(2, "0")

    // Pour le numéro, on va compter les commandes du mois
    const { count } = await supabase
      .from('commandes')
      .select('*', { count: 'exact', head: true })

    const numero_commande = `CMD${annee}${mois}-${String((count || 0) + 1).padStart(4, "0")}`

    // Insérer la commande dans Supabase
    const adresse = `${data.adresse_livraison.adresse}, ${data.adresse_livraison.code_postal} ${data.adresse_livraison.ville}`
    const { data: newOrder, error: orderError } = await supabase
      .from('commandes')
      .insert([{
        numero_commande,
        client_id: data.client_id || 1,
        statut: 'en_attente',
        montant_ht,
        montant_tva,
        montant_ttc,
        adresse_livraison: adresse,
        mode_paiement: data.mode_paiement
      }])
      .select()
      .single()

    if (orderError) throw orderError

    const commande_id = newOrder.id

    // Insérer les lignes de commande
    const lignes = data.items.map(item => ({
      commande_id,
      nom_produit: item.nom_produit,
      quantite: item.quantite,
      prix_unitaire_ht: item.prix_unitaire,
      prix_total_ht: item.prix_unitaire * item.quantite
    }))

    const { error: linesError } = await supabase
      .from('commande_lignes')
      .insert(lignes)

    if (linesError) throw linesError


    // Récupérer les détails des produits depuis Supabase pour l'email
    const productIds = data.items.map(i => i.produit_id)
    const { data: productsDetails } = await supabase
      .from('produits')
      .select('id, nom, description, marque, caracteristiques')
      .in('id', productIds)

    // Fusionner les infos
    const enrichedItems = data.items.map(item => {
      const details = productsDetails?.find(p => p.id.toString() === item.produit_id.toString())
      return {
        ...item,
        description: details?.description,
        marque: details?.marque,
        caracteristiques: details?.caracteristiques
      }
    })

    // Envoyer l'email de confirmation
    await sendOrderConfirmationEmail({
      numero_commande,
      client: { ...data.client, adresse: adresse },
      items: enrichedItems,
      total: montant_ttc,
      date: new Date().toLocaleDateString('fr-FR')
    })

    return NextResponse.json({
      success: true,
      commande_id,
      numero_commande,
      montant_ttc,
      message: "Commande créée avec succès",
    })
  } catch (error) {
    console.error("[v0] Erreur création commande:", error)
    return NextResponse.json(
      {
        error: "Erreur lors de la création de la commande",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const client_id = searchParams.get("client_id")

    if (!client_id) {
      return NextResponse.json({ error: "client_id requis" }, { status: 400 })
    }

    const { data: commandes, error } = await supabase
      .from('commandes')
      .select('*')
      .eq('client_id', client_id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ commandes })
  } catch (error) {
    console.error("[v0] Erreur récupération commandes:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des commandes" }, { status: 500 })
  }
}
