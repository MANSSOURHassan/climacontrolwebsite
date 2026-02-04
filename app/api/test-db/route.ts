import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  try {
    // Vérifier que les variables d'environnement sont définies
    if (!process.env.DB_HOST || !process.env.DB_NAME || !process.env.DB_USER) {
      throw new Error("Variables d'environnement manquantes. Vérifiez votre fichier .env.local")
    }

    console.log("[v0] Tentative de connexion à la base de données...")
    console.log("[v0] Host:", process.env.DB_HOST)
    console.log("[v0] Database:", process.env.DB_NAME)
    console.log("[v0] User:", process.env.DB_USER)

    // Test 1 : Connexion basique
    const [connectionTest] = (await query("SELECT 1 as test")) as any[]

    if (connectionTest.test !== 1) {
      throw new Error("Test de connexion échoué")
    }

    console.log("[v0] Connexion réussie !")

    // Test 2 : Compter les produits
    const [productCount] = (await query("SELECT COUNT(*) as count FROM produits")) as any[]

    // Test 3 : Compter les catégories
    const [categoryCount] = (await query("SELECT COUNT(*) as count FROM categories")) as any[]

    // Test 4 : Récupérer un produit exemple
    const products = (await query("SELECT nom, prix FROM produits LIMIT 1")) as any[]

    return NextResponse.json({
      success: true,
      message: "✅ Connexion à la base de données réussie !",
      database: process.env.DB_NAME,
      statistics: {
        produits: productCount.count,
        categories: categoryCount.count,
      },
      example_product: products[0] || null,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("[v0] DB Test Error:", error)

    let diagnostic = ""
    if (error.code === "ENOTFOUND") {
      diagnostic = "Le serveur MySQL n'est pas accessible. Vérifiez que XAMPP est démarré."
    } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
      diagnostic = "Accès refusé. Vérifiez le nom d'utilisateur et le mot de passe."
    } else if (error.code === "ER_BAD_DB_ERROR") {
      diagnostic =
        "La base de données 'climacontrol' n'existe pas. Importez le fichier climacontrol.sql dans phpMyAdmin."
    } else if (error.code === "ER_NO_SUCH_TABLE") {
      diagnostic = "Table manquante. Réimportez le fichier climacontrol.sql complet."
    } else if (error.message.includes("Cannot find module")) {
      diagnostic = "Module mysql2 manquant. Exécutez : npm install mysql2"
    }

    return NextResponse.json(
      {
        success: false,
        message: "❌ Erreur de connexion à la base de données",
        error: error.message,
        errorCode: error.code || "UNKNOWN",
        diagnostic: diagnostic || "Erreur inconnue. Vérifiez les logs du serveur.",
        config: {
          host: process.env.DB_HOST,
          database: process.env.DB_NAME,
          user: process.env.DB_USER,
          hasPassword: !!process.env.DB_PASSWORD,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
