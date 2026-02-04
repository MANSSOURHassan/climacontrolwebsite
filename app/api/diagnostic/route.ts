import { NextResponse } from "next/server"
import { getPool } from "@/lib/db"

export async function GET() {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    tests: [] as any[],
    success: true,
  }

  // Test 1: Variables d'environnement
  try {
    const envVars = {
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_NAME: process.env.DB_NAME,
      DB_USER: process.env.DB_USER,
      DB_PASSWORD: process.env.DB_PASSWORD ? "***configuré***" : "MANQUANT",
    }

    diagnostics.tests.push({
      test: "Variables d'environnement",
      status: "OK",
      details: envVars,
    })
  } catch (error: any) {
    diagnostics.success = false
    diagnostics.tests.push({
      test: "Variables d'environnement",
      status: "ERREUR",
      error: error.message,
    })
  }

  // Test 2: Connexion MySQL
  try {
    const pool = getPool()
    const connection = await pool.getConnection()
    await connection.ping()
    connection.release()

    diagnostics.tests.push({
      test: "Connexion MySQL",
      status: "OK",
      details: "Connexion établie avec succès",
    })
  } catch (error: any) {
    diagnostics.success = false
    diagnostics.tests.push({
      test: "Connexion MySQL",
      status: "ERREUR",
      error: error.message,
      code: error.code,
      suggestion:
        error.code === "ECONNREFUSED"
          ? "XAMPP MySQL n'est pas démarré"
          : error.code === "ER_ACCESS_DENIED_ERROR"
            ? "Identifiants MySQL incorrects"
            : "Vérifiez votre configuration MySQL",
    })
  }

  // Test 3: Base de données existe
  try {
    const pool = getPool()
    const [databases]: any = await pool.query("SHOW DATABASES LIKE 'climacontrol'")

    if (databases.length === 0) {
      diagnostics.success = false
      diagnostics.tests.push({
        test: "Base de données 'climacontrol'",
        status: "MANQUANTE",
        suggestion: "Importez le fichier climacontrol.sql dans phpMyAdmin",
      })
    } else {
      diagnostics.tests.push({
        test: "Base de données 'climacontrol'",
        status: "OK",
      })
    }
  } catch (error: any) {
    diagnostics.success = false
    diagnostics.tests.push({
      test: "Base de données 'climacontrol'",
      status: "ERREUR",
      error: error.message,
    })
  }

  // Test 4: Table clients existe
  try {
    const pool = getPool()
    const [tables]: any = await pool.query("SHOW TABLES LIKE 'clients'")

    if (tables.length === 0) {
      diagnostics.success = false
      diagnostics.tests.push({
        test: "Table 'clients'",
        status: "MANQUANTE",
        suggestion: "La table clients n'existe pas. Importez climacontrol.sql",
      })
    } else {
      diagnostics.tests.push({
        test: "Table 'clients'",
        status: "OK",
      })
    }
  } catch (error: any) {
    diagnostics.success = false
    diagnostics.tests.push({
      test: "Table 'clients'",
      status: "ERREUR",
      error: error.message,
    })
  }

  // Test 5: Structure de la table clients
  try {
    const pool = getPool()
    const [columns]: any = await pool.query("DESCRIBE clients")

    const requiredColumns = ["id", "email", "password_hash", "prenom", "nom"]
    const existingColumns = columns.map((col: any) => col.Field)
    const missingColumns = requiredColumns.filter((col) => !existingColumns.includes(col))

    if (missingColumns.length > 0) {
      diagnostics.success = false
      diagnostics.tests.push({
        test: "Structure table 'clients'",
        status: "INCOMPLETE",
        missing: missingColumns,
        suggestion: "Réimportez climacontrol.sql pour avoir la bonne structure",
      })
    } else {
      diagnostics.tests.push({
        test: "Structure table 'clients'",
        status: "OK",
        columns: existingColumns,
      })
    }
  } catch (error: any) {
    diagnostics.tests.push({
      test: "Structure table 'clients'",
      status: "SKIP",
      reason: "Table clients n'existe pas",
    })
  }

  // Test 6: Module bcryptjs
  try {
    const bcrypt = require("bcryptjs")
    const testHash = await bcrypt.hash("test", 10)

    diagnostics.tests.push({
      test: "Module bcryptjs",
      status: "OK",
      details: "Hachage de mot de passe fonctionnel",
    })
  } catch (error: any) {
    diagnostics.success = false
    diagnostics.tests.push({
      test: "Module bcryptjs",
      status: "ERREUR",
      error: error.message,
      suggestion: "Exécutez: npm install bcryptjs",
    })
  }

  return NextResponse.json(diagnostics, { status: diagnostics.success ? 200 : 500 })
}
