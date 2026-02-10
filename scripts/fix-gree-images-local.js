
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) process.exit(1)
const supabase = createClient(supabaseUrl, supabaseKey)

// Mapping logic: Key word in name -> Local Image Path
const MAPPING = [
    { pattern: 'Cassette', image: '/gree-cassette.jpg' },
    { pattern: 'Gainable', image: '/unite-gainable.jpeg' },
    { pattern: 'Ducted', image: '/unite-gainable.jpeg' },
    { pattern: 'Plafonnier', image: '/gree-cassette.jpg' },
    { pattern: 'Allège', image: '/gree-cassette.jpg' }, // Similar form factor usually
    { pattern: 'Versati', image: '/air-water-heat-pump.jpg' }, // Heat pump
    { pattern: 'Aeros', image: '/air-water-heat-pump.jpg' }, // Heat pump
    { pattern: 'Thermostat', image: '/gree-thermostat.jpg' },
    { pattern: 'Télécommande', image: '/gree-thermostat.jpg' }, // Close enough
    { pattern: 'Filtre', image: '/air-conditioner-cleaning-kit.jpg' },
    { pattern: 'Liaison', image: '/tubes-pvc.jpg' },
    { pattern: 'Support', image: '/tubes-pvc.jpg' }, // Generic accessory
    { pattern: 'Goulotte', image: '/tubes-pvc.jpg' },
    { pattern: 'Multi', image: '/unite-exterieure-gree.jpeg' },
    { pattern: 'Bi-split', image: '/unite-exterieure-gree.jpeg' },
    { pattern: 'Tri-split', image: '/unite-exterieure-gree.jpeg' },
    { pattern: 'Quadri', image: '/unite-exterieure-gree.jpeg' },
    { pattern: 'Penta', image: '/unite-exterieure-gree.jpeg' },
    // Fallback for walls splits (Pular, Fairy, etc.)
    { pattern: 'Pular', image: '/clim-murale.jpg' },
    { pattern: 'Fairy', image: '/clim-murale.jpg' },
    { pattern: 'Fair ', image: '/clim-murale.jpg' },
    { pattern: 'Clivia', image: '/clim-murale.jpg' },
    { pattern: 'Charmo', image: '/clim-murale.jpg' },
    { pattern: 'Soyal', image: '/clim-murale.jpg' },
    { pattern: 'Console', image: '/clim-murale.jpg' }, // Fallback to wall unit look
    { pattern: 'Mural', image: '/clim-murale.jpg' },
]

async function fix() {
    console.log("Applying local image fallbacks for GREE products...")
    let total = 0

    // First ensure we target GREE products
    for (const item of MAPPING) {
        const { data, error } = await supabase
            .from('produits')
            .update({ image_principale: item.image })
            .eq('marque', 'GREE')
            .ilike('nom', `%${item.pattern}%`)
            .select()

        if (error) {
            console.error(`Error updating ${item.pattern}:`, error.message)
        } else {
            if (data.length > 0) {
                console.log(`Updated ${data.length} items for "${item.pattern}" -> ${item.image}`)
                total += data.length
            }
        }
    }

    // Catch-all for remaining GREE items with HTTP links (which are likely broken 404s from previous attempt)
    // We replace them with a generic image if they are NOT local files
    // But how to select those?
    // We select all GREE, then iterate and check.

    const { data: remaining, error: errRem } = await supabase
        .from('produits')
        .select('id, nom, image_principale')
        .eq('marque', 'GREE')
        .ilike('image_principale', 'http%') // Only target the HTTP ones we likely broke

    if (remaining && remaining.length > 0) {
        console.log(`\nFound ${remaining.length} GREE products still using HTTP links (potentially broken).`)
        // Update them to generic GREE log or generic AC image
        const GENERIC_IMAGE = '/clim-murale.jpg'
        for (const p of remaining) {
            await supabase.from('produits').update({ image_principale: GENERIC_IMAGE }).eq('id', p.id)
            console.log(`Fallback update: ${p.nom} -> ${GENERIC_IMAGE}`)
            total++
        }
    }

    console.log(`\nTotal updates: ${total}`)
}

fix()
