
import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

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

        // 1. Récupérer la commande par son numéro et vérifier que l'email appartient au client
        // Attention: la structure exacte de la DB dépend de votre schéma.
        // On suppose ici que `commandes` a un `client_id` et `clients` a un `email`.
        // Si `commandes` a directement un `email_client`, adaptez la requête.

        // Version avec JOIN clients
        const result: any = await query(
            `SELECT c.*, cl.nom, cl.prenom, cl.email 
             FROM commandes c
             JOIN clients cl ON c.client_id = cl.id
             WHERE c.numero_commande = ? AND cl.email = ?`,
            [numero, email]
        )

        if (!result || result.length === 0) {
            return NextResponse.json(
                { error: "Commande introuvable ou informations incorrectes." },
                { status: 404 }
            )
        }

        const commande = result[0]

        // 2. Récupérer le contenu de la commande
        const items: any = await query(
            `SELECT * FROM commande_lignes WHERE commande_id = ?`,
            [commande.id]
        )

        return NextResponse.json({
            success: true,
            commande: {
                ...commande,
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
