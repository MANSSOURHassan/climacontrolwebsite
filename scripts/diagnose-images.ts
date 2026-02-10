
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials")
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkImages() {
    const { data: products, error } = await supabase
        .from("produits")
        .select("id, nom, marque, image_principale")
        .limit(10)

    if (error) {
        console.error("Error fetching products:", error)
        return
    }

    console.log("Checking first 10 products images:")
    products.forEach(p => {
        console.log(`[${p.id}] ${p.marque} - ${p.nom}`)
        console.log(`      Image: ${p.image_principale}`)
    })
}

checkImages()
