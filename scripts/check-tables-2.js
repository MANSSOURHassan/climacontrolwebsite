
import mysql from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

console.log("DB_HOST:", process.env.DB_HOST || "localhost")

async function check() {
    try {
        const pool = mysql.createPool({
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME || "climacontrol",
        })

        const [rows] = await pool.query("SHOW TABLES")
        console.log("Tables:", rows)

        const [cols] = await pool.query("DESCRIBE commandes")
        console.log("\nCOMMANDES:", cols.map(c => c.Field).join(", "))

        const [cols2] = await pool.query("DESCRIBE clients")
        console.log("\nCLIENTS:", cols2.map(c => c.Field).join(", "))

        await pool.end()
    } catch (e) {
        console.error("ERROR:", e)
    }
}
check()
