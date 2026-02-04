import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import bcrypt from "bcryptjs"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validation des données
    const validatedData = loginSchema.parse(body)

    // Récupérer le client
    const { data: client, error } = await supabase
      .from('clients')
      .select('id, email, password_hash, prenom, nom, telephone, actif')
      .eq('email', validatedData.email)
      .single()

    if (error || !client) {
      // Supabase returns an error if .single() finds no rows
      return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 })
    }

    // Vérifier si le compte est actif
    if (!client.actif) {
      return NextResponse.json({ error: "Ce compte a été désactivé" }, { status: 403 })
    }

    // Vérifier le mot de passe
    const passwordMatch = await bcrypt.compare(validatedData.password, client.password_hash)

    if (!passwordMatch) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 })
    }

    // Retourner les infos du client (sans le hash du mot de passe)
    const { password_hash, ...clientData } = client

    return NextResponse.json({
      success: true,
      message: "Connexion réussie",
      client: clientData,
    })
  } catch (error: any) {
    console.error("[v] Erreur connexion:", error)

    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Données invalides", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Erreur lors de la connexion" }, { status: 500 })
  }
}
