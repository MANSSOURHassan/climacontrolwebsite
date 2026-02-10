
import mysql from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

async function checkSchema() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "climacontrol",
    })

    try {
        console.log("--- TABLE COMMANDES ---")
        const [cols1] = await pool.execute("SHOW COLUMNS FROM commandes")
        console.log(cols1.map(c => c.Field).join(", "))

        console.log("\n--- TABLE CLIENTS ---")
        const [cols2] = await pool.execute("SHOW COLUMNS FROM clients")
        console.log(cols2.map(c => c.Field).join(", "))

        console.log("\n--- TABLE COMMANDE_LIGNES ---")
        const [cols3] = await pool.execute("SHOW COLUMNS FROM commande_lignes")
        console.log(cols3.map(c => c.Field).join(", "))

    } catch (e) {
        console.error(e)
    }
    await pool.end()
}
checkSchema()
