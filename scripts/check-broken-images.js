
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function check() {
    // Check for NULL or short paths
    const { data, error } = await supabase
        .from('produits')
        .select('id, nom, marque, image_principale')
        .not('image_principale', 'ilike', 'http%')
        .not('image_principale', 'ilike', '/%')

    if (error) {
        console.error(error)
        return
    }

    console.log(`Found ${data.length} products with potentially broken images (not http/https or relative starting with /):`)
    data.forEach(p => console.log(`- ${p.nom} (${p.marque}): ${p.image_principale}`))
}

check()
