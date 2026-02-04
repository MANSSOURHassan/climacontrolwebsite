import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const commande: any = await query(`SELECT * FROM commandes WHERE id = ?`, [params.id])

    if (commande.length === 0) {
      return NextResponse.json({ error: "Commande non trouvée" }, { status: 404 })
    }

    const lignes: any = await query(`SELECT * FROM commande_lignes WHERE commande_id = ?`, [params.id])

    return NextResponse.json({
      commande: commande[0],
      lignes,
    })
  } catch (error) {
    console.error("[v0] Erreur récupération commande:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération de la commande" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { statut } = body

    await query(`UPDATE commandes SET statut = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [statut, params.id])

    return NextResponse.json({ success: true, message: "Statut mis à jour" })
  } catch (error) {
    console.error("[v0] Erreur mise à jour commande:", error)
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 })
  }
}
