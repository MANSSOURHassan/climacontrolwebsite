import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import bcrypt from "bcryptjs"
import { z } from "zod"

const resetPasswordSchema = z.object({
    token: z.string().min(1, "Jeton requis"),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
})

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { token, password } = resetPasswordSchema.parse(body)

        // 1. Trouver l'utilisateur avec ce jeton et vérifier s'il n'est pas expiré
        const { data: client, error: clientError } = await supabase
            .from('clients')
            .select('id, email, reset_password_expires')
            .eq('reset_password_token', token)
            .single()

        if (clientError || !client) {
            return NextResponse.json({ error: "Jeton invalide ou expiré" }, { status: 400 })
        }

        // 2. Vérifier l'expiration (au cas où Supabase ne le ferait pas dans la requête)
        const now = new Date()
        const expires = new Date(client.reset_password_expires)

        if (now > expires) {
            return NextResponse.json({ error: "Jeton expiré" }, { status: 400 })
        }

        // 3. Hasher le nouveau mot de passe
        const salt = await bcrypt.genSalt(10)
        const password_hash = await bcrypt.hash(password, salt)

        // 4. Mettre à jour le mot de passe et effacer le jeton
        const { error: updateError } = await supabase
            .from('clients')
            .update({
                password_hash: password_hash,
                reset_password_token: null,
                reset_password_expires: null
            })
            .eq('id', client.id)

        if (updateError) {
            console.error("[Reset Password] Error updating password:", updateError)
            throw updateError
        }

        return NextResponse.json({
            success: true,
            message: "Votre mot de passe a été réinitialisé avec succès."
        })
    } catch (error: any) {
        console.error("[Reset Password] Error:", error)

        if (error.name === "ZodError") {
            return NextResponse.json({ error: "Données invalides", details: error.errors }, { status: 400 })
        }

        return NextResponse.json({ error: "Une erreur est survenue lors de la réinitialisation." }, { status: 500 })
    }
}
