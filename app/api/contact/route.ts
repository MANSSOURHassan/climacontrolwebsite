import { NextResponse } from "next/server"
import { query } from "@/lib/db"

/**
 * API pour gérer les demandes de contact
 * POST /api/contact
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { nom, prenom, email, telephone, sujet, message } = body

    // Validation
    if (!nom || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Nom, email et message sont obligatoires",
        },
        { status: 400 },
      )
    }

    // Valider l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Email invalide",
        },
        { status: 400 },
      )
    }

    // Créer un devis de type "Contact" pour garder trace des demandes
    const sql = `
      INSERT INTO devis (
        client_id,
        type_service,
        description,
        statut
      )
      SELECT 
        c.id,
        'contact',
        ?,
        'en_attente'
      FROM (
        SELECT id FROM clients WHERE email = ?
        UNION
        SELECT NULL
        LIMIT 1
      ) c
    `

    // Si le client n'existe pas, le créer d'abord
    const [existingClients] = (await query("SELECT id FROM clients WHERE email = ?", [email])) as any

    let clientId
    if (existingClients) {
      clientId = existingClients.id
    } else {
      const result = (await query(`INSERT INTO clients (nom, prenom, email, telephone) VALUES (?, ?, ?, ?)`, [
        nom,
        prenom || "",
        email,
        telephone || "",
      ])) as any
      clientId = result.insertId
    }

    // Créer la demande de contact
    await query(
      `INSERT INTO devis (client_id, type_service, description, statut)
       VALUES (?, 'contact', ?, 'en_attente')`,
      [clientId, `Sujet: ${sujet || "Non spécifié"}\n\nMessage: ${message}`],
    )

    return NextResponse.json({
      success: true,
      message: "Votre message a été envoyé avec succès. Nous vous contacterons rapidement.",
    })
  } catch (error: any) {
    console.error("[API Contact Error]", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'envoi du message",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
