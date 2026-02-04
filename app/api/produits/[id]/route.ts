import { NextResponse } from "next/server"
import { query } from "@/lib/db"

/**
 * API pour récupérer un produit par ID
 * GET /api/produits/1
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const produitId = params.id

    const sql = `
      SELECT 
        p.*,
        c.nom as categorie_nom,
        c.slug as categorie_slug
      FROM produits p
      LEFT JOIN categories c ON p.categorie_id = c.id
      WHERE p.id = ? AND p.actif = 1
    `

    const produits = (await query(sql, [produitId])) as any[]

    if (produits.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Produit non trouvé",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      produit: produits[0],
    })
  } catch (error: any) {
    console.error("[API Produit Error]", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la récupération du produit",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
