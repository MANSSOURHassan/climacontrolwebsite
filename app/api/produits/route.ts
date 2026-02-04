import { NextResponse } from "next/server"
import { query } from "@/lib/db"

/**
 * API pour récupérer tous les produits
 * GET /api/produits
 * GET /api/produits?categorie=climatisation
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categorie = searchParams.get("categorie")

    let sql = `
      SELECT 
        p.id,
        p.reference,
        p.nom,
        p.description,
        p.prix,
        p.prix_promo,
        p.stock,
        p.image_url,
        p.marque,
        p.garantie_mois,
        p.caracteristiques,
        c.nom as categorie_nom,
        c.slug as categorie_slug
      FROM produits p
      LEFT JOIN categories c ON p.categorie_id = c.id
      WHERE p.actif = 1
    `

    const params: any[] = []

    if (categorie) {
      sql += " AND c.slug = ?"
      params.push(categorie)
    }

    sql += " ORDER BY p.ordre ASC, p.nom ASC"

    const produits = await query(sql, params)

    return NextResponse.json({
      success: true,
      count: (produits as any[]).length,
      produits,
    })
  } catch (error: any) {
    console.error("[API Produits Error]", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la récupération des produits",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
