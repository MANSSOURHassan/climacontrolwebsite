import mysql from "mysql2/promise"

console.log("[v] Configuration DB:", {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "3306",
    user: process.env.DB_USER || "PAS DÉFINI",
    database: process.env.DB_NAME || "PAS DÉFINI",
    hasPassword: !!process.env.DB_PASSWORD,
})

// Configuration de la connexion MySQL
const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    port: Number.parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "climacontrol",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
}

// Pool de connexions réutilisables
let pool: mysql.Pool | null = null

/**
 * Obtenir le pool de connexions MySQL
 */
export function getPool(): mysql.Pool {
    if (!pool) {
        pool = mysql.createPool(dbConfig)
    }
    return pool
}

/**
 * Exécuter une requête SQL
 * @param sql - Requête SQL avec des paramètres ?
 * @param params - Valeurs des paramètres
 */
export async function query(sql: string, params?: any[]) {
    try {
        const pool = getPool()
        const [results] = await pool.execute(sql, params)
        return results
    } catch (error) {
        console.error("[DB Error]", error)
        throw error
    }
}

/**
 * Exécuter plusieurs requêtes dans une transaction
 * @param callback - Fonction contenant les requêtes
 */
export async function transaction(callback: (connection: mysql.PoolConnection) => Promise<any>) {
    const pool = getPool()
    const connection = await pool.getConnection()

    try {
        await connection.beginTransaction()
        const result = await callback(connection)
        await connection.commit()
        return result
    } catch (error) {
        await connection.rollback()
        throw error
    } finally {
        connection.release()
    }
}

/**
 * Fermer le pool de connexions
 */
export async function closePool() {
    if (pool) {
        await pool.end()
        pool = null
    }
}
