
import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const numero = searchParams.get("numero")
        const email = searchParams.get("email")

        if (!numero || !email) {
            return NextResponse.json(
                { error: "Numéro de commande et email requis" },
                { status: 400 }
            )
        }

        // 1. Récupérer la commande par son numéro
        const { data: orders, error: orderError } = await supabase
            .from('commandes')
            .select('*, clients!inner(*)')
            .eq('numero_commande', numero)
            .eq('clients.email', email)

        if (orderError || !orders || orders.length === 0) {
            return NextResponse.json(
                { error: "Commande introuvable ou informations incorrectes." },
                { status: 404 }
            )
        }

        const commande = orders[0]
        // Aplatir les infos client si nécessaire
        const enrichedCommande = {
            ...commande,
            prenom: commande.clients?.prenom,
            nom: commande.clients?.nom,
            email: commande.clients?.email
        }

        // 2. Récupérer le contenu de la commande
        const { data: items, error: itemsError } = await supabase
            .from('commande_lignes')
            .select('*')
            .eq('commande_id', commande.id)

        if (itemsError) throw itemsError

        return NextResponse.json({
            success: true,
            commande: {
                ...enrichedCommande,
                items
            }
        })

    } catch (error: any) {
        console.error("[API Suivi] Erreur:", error)
        return NextResponse.json(
            { error: "Erreur serveur lors de la recherche." },
            { status: 500 }
        )
    }
}
