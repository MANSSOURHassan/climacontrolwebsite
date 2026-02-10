
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) { process.exit(1) }
const supabase = createClient(supabaseUrl, supabaseKey)

async function dump() {
    const { data, error } = await supabase.from('produits').select('nom, image_principale').limit(20)
    console.log(JSON.stringify(data, null, 2))
}
dump()
