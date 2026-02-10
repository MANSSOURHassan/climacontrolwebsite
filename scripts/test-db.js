import mysql from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

async function test() {
    console.log("Testing DB connection...")
    console.log("DB_HOST:", process.env.DB_HOST || "localhost")
    console.log("DB_NAME:", process.env.DB_NAME || "climacontrol")
    console.log("DB_USER:", process.env.DB_USER || "root")

    try {
        const pool = mysql.createPool({
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME || "climacontrol",
        })
        const [rows] = await pool.execute("SELECT 1 as test")
        console.log("Connection successful:", rows)
        await pool.end()
    } catch (error) {
        console.error("Connection failed:", error.message)
    }
}

test()
