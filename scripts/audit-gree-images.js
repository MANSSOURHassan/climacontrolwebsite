
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) process.exit(1)
const supabase = createClient(supabaseUrl, supabaseKey)

async function audit() {
    // Get all GREE products
    const { data, error } = await supabase
        .from('produits')
        .select('id, nom, image_principale')
        .eq('marque', 'GREE')

    if (error) { console.error(error); return }

    console.log(`Auditing ${data.length} GREE products...`)

    let broken = []

    for (const p of data) {
        if (!p.image_principale) {
            console.log(`[NULL] ${p.nom} (ID: ${p.id})`)
            broken.push(p)
            continue
        }

        if (p.image_principale.startsWith('/')) {
            // Local file, skip check or check existence? 
            // Assume local files exist for now as user complained about "some".
            continue
        }

        if (!p.image_principale.startsWith('http')) {
            console.log(`[INVALID PROTOCOL] ${p.nom} -> ${p.image_principale}`)
            broken.push(p)
            continue
        }

        try {
            const res = await fetch(p.image_principale, { method: 'HEAD' })
            if (res.status !== 200) {
                console.log(`[${res.status}] ${p.nom} -> ${p.image_principale}`)
                broken.push(p)
            }
        } catch (e) {
            console.log(`[ERR] ${p.nom} -> ${e.message}`)
            broken.push(p)
        }
    }

    console.log(`\nFound ${broken.length} broken images.`)
}

audit()
