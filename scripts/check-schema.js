
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) process.exit(1)
const supabase = createClient(supabaseUrl, supabaseKey)

async function schema() {
    const { data, error } = await supabase
        .from('produits')
        .select('caracteristiques')
        .limit(1)

    if (error) { console.error(error); return }
    if (data.length > 0) {
        console.log("Example caracteristiques:", JSON.stringify(data[0].caracteristiques, null, 2))
        console.log("Type:", typeof data[0].caracteristiques)
    } else {
        console.log("No products found")
    }
}
schema()
