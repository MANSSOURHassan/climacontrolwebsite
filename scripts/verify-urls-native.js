
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) process.exit(1)
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkUrls() {
    const { data, error } = await supabase
        .from('produits')
        .select('id, nom, marque, image_principale')
        .eq('marque', 'GREE')
        .limit(20)

    if (error) { console.error(error); return }

    console.log(`Checking reachability of ${data.length} GREE images...`)

    for (const p of data) {
        if (!p.image_principale) {
            console.log(`[NULL] ${p.nom.substring(0, 20)}...`)
            continue
        }
        try {
            // Use native fetch (Node 18+)
            const res = await fetch(p.image_principale, { method: 'HEAD' })
            console.log(`[${res.status}] ${p.nom.substring(0, 20)}... -> ${p.image_principale.substring(0, 50)}...`)
        } catch (e) {
            console.log(`[ERR] ${p.nom.substring(0, 20)}... -> ${e.message}`)
        }
    }
}

checkUrls()
