import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import bcrypt from "bcryptjs"
import { z } from "zod"

const registerSchema = z.object({
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  siret: z.string().optional(),
  type_client: z.string().optional(),
  company: z.string().optional()
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("[v] Tentative d'inscription:", { ...body, password: "***" })

    // Validation des données
    const validatedData = registerSchema.parse(body)
    console.log("[v] Données validées")

    // Vérifier si l'email existe déjà
    const { data: existingUser } = await supabase
      .from('clients')
      .select('id')
      .eq('email', validatedData.email)
      .single()

    if (existingUser) {
      return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 400 })
    }

    // Hasher le mot de passe
    const passwordHash = await bcrypt.hash(validatedData.password, 10)
    console.log("[v] Mot de passe hashé")

    // Créer le client
    const { data: newClient, error: insertError } = await supabase
      .from('clients')
      .insert([
        {
          prenom: validatedData.prenom,
          nom: validatedData.nom,
          email: validatedData.email,
          password_hash: passwordHash,
          type_client: (body.type_client === 'professionnel') ? 'professionnel' : 'particulier',
          siret: body.siret || null,
          actif: true
        }
      ])
      .select()
      .single()

    if (insertError) {
      throw insertError
    }

    console.log("[v] Client créé, résultat:", newClient)

    return NextResponse.json(
      {
        success: true,
        message: "Compte créé avec succès",
        clientId: newClient.id,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("[v] Erreur inscription complète:", {
      message: error.message,
      code: error.code,
      details: error.details,
    })

    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Données invalides", details: error.errors }, { status: 400 })
    }

    return NextResponse.json(
      {
        error: "Erreur lors de la création du compte",
        details: error.message,
        code: error.code,
      },
      { status: 500 },
    )
  }
}
