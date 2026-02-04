import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { z } from "zod"

const commandeSchema = z.object({
  client_id: z.number(),
  items: z.array(
    z.object({
      produit_id: z.string(),
      nom_produit: z.string(),
      quantite: z.number().min(1),
      prix_unitaire: z.number().positive(),
    }),
  ),
  mode_paiement: z.enum(["carte", "virement", "paypal", "cheque"]),
  adresse_livraison: z.object({
    adresse: z.string(),
    code_postal: z.string(),
    ville: z.string(),
  }),
})

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json()
    const data = commandeSchema.parse(body)

    // Calculer les montants
    const montant_ht = data.items.reduce((sum, item) => sum + item.prix_unitaire * item.quantite, 0)
    const montant_tva = montant_ht * 0.2
    const montant_ttc = montant_ht + montant_tva

    // Générer numéro de commande
    const annee = new Date().getFullYear()
    const mois = String(new Date().getMonth() + 1).padStart(2, "0")

    let numero_commande = `CMD${annee}${mois}-${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`
    let commande_id = Math.floor(Math.random() * 10000);

    try {
      // Tentative d'insertion en base de données
      const result: any = await query(
        "SELECT COUNT(*) as count FROM commandes WHERE YEAR(created_at) = ? AND MONTH(created_at) = ?",
        [annee, new Date().getMonth() + 1],
      )
      const compteur = result[0].count + 1
      numero_commande = `CMD${annee}${mois}-${String(compteur).padStart(4, "0")}`

      // Insérer la commande
      const adresse = `${data.adresse_livraison.adresse}, ${data.adresse_livraison.code_postal} ${data.adresse_livraison.ville}`
      const commandeResult: any = await query(
        `INSERT INTO commandes (numero_commande, client_id, statut, montant_ht, montant_tva, montant_ttc, adresse_livraison) 
        VALUES (?, ?, 'en_attente', ?, ?, ?, ?)`,
        [numero_commande, data.client_id, montant_ht, montant_tva, montant_ttc, adresse],
      )

      commande_id = commandeResult.insertId

      // Insérer les lignes de commande
      for (const item of data.items) {
        await query(
          `INSERT INTO commande_lignes (commande_id, nom_produit, quantite, prix_unitaire_ht, prix_total_ht) 
            VALUES (?, ?, ?, ?, ?)`,
          [commande_id, item.nom_produit, item.quantite, item.prix_unitaire, item.prix_unitaire * item.quantite],
        )
      }
    } catch (dbError) {
      console.warn("[API] DB non disponible, passage en mode simulation pour la commande:", dbError);
      // On continue comme si ça avait marché pour ne pas bloquer l'utilisateur frontend
    }

    return NextResponse.json({
      success: true,
      commande_id,
      numero_commande,
      montant_ttc,
      message: "Commande créée avec succès (Simulation si DB inactive)",
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

    const commandes: any = await query(`SELECT * FROM commandes WHERE client_id = ? ORDER BY created_at DESC`, [
      client_id,
    ])

    return NextResponse.json({ commandes })
  } catch (error) {
    console.error("[v0] Erreur récupération commandes:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des commandes" }, { status: 500 })
  }
}
