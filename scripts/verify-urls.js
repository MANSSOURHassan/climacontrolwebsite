
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"
import fetch from "node-fetch" // Assuming node-fetch is available or using built-in fetch in newer node

dotenv.config({ path: ".env.local" })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) process.exit(1)
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkUrls() {
    const { data, error } = await supabase
        .from('produits')
        .select('nom, image_principale')
        .ilike('image_principale', 'http%')
        .limit(10) // Check first 10 http images

    if (error) { console.error(error); return }

    console.log(`Checking reachability of ${data.length} images...`)

    for (const p of data) {
        try {
            const res = await fetch(p.image_principale, { method: 'HEAD' })
            console.log(`[${res.status}] ${p.nom.substring(0, 20)}... -> ${p.image_principale}`)
        } catch (e) {
            console.log(`[ERR] ${p.nom.substring(0, 20)}... -> ${e.message}`)
        }
    }
}

checkUrls()
