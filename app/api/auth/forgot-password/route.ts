import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import crypto from "crypto"
import { sendPasswordResetEmail } from "@/lib/email"

export async function POST(request: Request) {
    try {
        const { email } = await request.json()

        if (!email) {
            return NextResponse.json({ error: "Email requis" }, { status: 400 })
        }

        // 1. Vérifier si l'utilisateur existe
        const { data: client, error: clientError } = await supabase
            .from('clients')
            .select('id, email, prenom')
            .eq('email', email)
            .single()

        if (clientError || !client) {
            // Pour des raisons de sécurité, on ne confirme pas si l'email existe ou non
            return NextResponse.json({
                success: true,
                message: "Si cet email est associé à un compte, un lien de réinitialisation a été envoyé."
            })
        }

        // 2. Générer un jeton de réinitialisation
        const token = crypto.randomBytes(32).toString("hex")
        const expires = new Date(Date.now() + 3600000) // 1 heure

        // 3. Enregistrer le jeton (On suppose que les colonnes existent ou on utilise un contournement)
        // IMPORTANT: Si les colonnes n'existent pas, cette étape échouera.
        // Dans une application réelle, on ajouterait les colonnes reset_password_token et reset_password_expires.

        const { error: updateError } = await supabase
            .from('clients')
            .update({
                reset_password_token: token,
                reset_password_expires: expires.toISOString()
            })
            .eq('id', client.id)

        if (updateError) {
            console.error("[Forgot Password] Error updating client with token:", updateError)
            return NextResponse.json({
                error: "Erreur de base de données. Avez-vous ajouté les colonnes 'reset_password_token' et 'reset_password_expires' ?",
                details: updateError.message
            }, { status: 500 })
        }

        // 4. Envoyer l'email
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
        const resetLink = `${siteUrl}/compte/reset-password?token=${token}`

        try {
            await sendPasswordResetEmail(client.email, client.prenom, resetLink)
        } catch (emailError: any) {
            console.error("[Forgot Password] Email send error:", emailError)
            return NextResponse.json({
                error: "Erreur lors de l'envoi de l'email de réinitialisation.",
                details: emailError.message
            }, { status: 500 })
        }

        return NextResponse.json({
            success: true,
            message: "Si cet email est associé à un compte, un lien de réinitialisation a été envoyé."
        })
    } catch (error: any) {
        console.error("[Forgot Password] Error:", error)
        return NextResponse.json({
            error: "Une erreur interne est survenue.",
            details: error.message
        }, { status: 500 })
    }
}
