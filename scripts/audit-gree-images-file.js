
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"
import fs from "fs"

dotenv.config({ path: ".env.local" })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) process.exit(1)
const supabase = createClient(supabaseUrl, supabaseKey)

async function audit() {
    const { data, error } = await supabase
        .from('produits')
        .select('id, nom, image_principale')
        .eq('marque', 'GREE')

    if (error) { console.error(error); return }

    let report = []

    for (const p of data) {
        if (!p.image_principale) {
            report.push(`[NULL] ${p.nom} (ID: ${p.id})`)
            continue
        }

        if (p.image_principale.startsWith('/')) continue
        if (!p.image_principale.startsWith('http')) {
            report.push(`[INVALID] ${p.nom} -> ${p.image_principale}`)
            continue
        }

        try {
            const res = await fetch(p.image_principale, { method: 'HEAD' })
            if (res.status !== 200) {
                report.push(`[${res.status}] ${p.nom} -> ${p.image_principale}`)
            }
        } catch (e) {
            report.push(`[ERR] ${p.nom} -> ${e.message}`)
        }
    }

    fs.writeFileSync('audit-report.txt', report.join('\n'))
}

audit()
