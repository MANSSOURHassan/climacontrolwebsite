import { NextResponse } from "next/server"
import { query } from "@/lib/db"

/**
 * API pour récupérer toutes les catégories avec le nombre de produits
 * GET /api/categories
 */
export async function GET() {
  try {
    const sql = `
      SELECT 
        c.*,
        COUNT(p.id) as nombre_produits
      FROM categories c
      LEFT JOIN produits p ON c.id = p.categorie_id AND p.actif = 1
      WHERE c.actif = 1
      GROUP BY c.id
      ORDER BY c.ordre ASC, c.nom ASC
    `

    const categories = await query(sql)

    return NextResponse.json({
      success: true,
      count: (categories as any[]).length,
      categories,
    })
  } catch (error: any) {
    console.error("[API Categories Error]", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la récupération des catégories",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
