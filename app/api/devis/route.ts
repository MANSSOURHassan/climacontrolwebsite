import { NextResponse } from "next/server"
import { query, transaction } from "@/lib/db"

/**
 * API pour créer un nouveau devis
 * POST /api/devis
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { client, type_service, adresse, description, produits } = body

    // Validation
    if (!client?.nom || !client?.email || !type_service) {
      return NextResponse.json(
        {
          success: false,
          message: "Informations manquantes",
        },
        { status: 400 },
      )
    }

    // Créer le devis dans une transaction
    const result = await transaction(async (conn) => {
      // 1. Vérifier ou créer le client
      let clientId

      const [existingClients] = await conn.execute("SELECT id FROM clients WHERE email = ?", [client.email])

      if ((existingClients as any[]).length > 0) {
        clientId = (existingClients as any[])[0].id
      } else {
        const [clientResult] = await conn.execute(
          `INSERT INTO clients (nom, prenom, email, telephone, adresse, ville, code_postal)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            client.nom,
            client.prenom || "",
            client.email,
            client.telephone || "",
            adresse || "",
            client.ville || "",
            client.code_postal || "",
          ],
        )
        clientId = (clientResult as any).insertId
      }

      // 2. Créer le devis
      const [devisResult] = await conn.execute(
        `INSERT INTO devis (client_id, type_service, adresse_intervention, description, statut)
         VALUES (?, ?, ?, ?, 'en_attente')`,
        [clientId, type_service, adresse || "", description || ""],
      )

      const devisId = (devisResult as any).insertId

      // 3. Ajouter les lignes de produits si présentes
      if (produits && produits.length > 0) {
        for (const produit of produits) {
          await conn.execute(
            `INSERT INTO devis_lignes (devis_id, produit_id, quantite, prix_unitaire)
             VALUES (?, ?, ?, ?)`,
            [devisId, produit.id, produit.quantite || 1, produit.prix],
          )
        }
      }

      return { devisId, clientId }
    })

    return NextResponse.json({
      success: true,
      message: "Devis créé avec succès",
      devis_id: result.devisId,
      client_id: result.clientId,
    })
  } catch (error: any) {
    console.error("[API Devis Error]", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la création du devis",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

/**
 * API pour récupérer tous les devis
 * GET /api/devis
 */
export async function GET() {
  try {
    const sql = `
      SELECT 
        d.*,
        c.nom as client_nom,
        c.email as client_email,
        c.telephone as client_telephone
      FROM devis d
      LEFT JOIN clients c ON d.client_id = c.id
      ORDER BY d.date_creation DESC
      LIMIT 50
    `

    const devis = await query(sql)

    return NextResponse.json({
      success: true,
      count: (devis as any[]).length,
      devis,
    })
  } catch (error: any) {
    console.error("[API Devis Error]", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la récupération des devis",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
