
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"
import path from "path"

// Load env vars
dotenv.config({ path: ".env.local" })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials")
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const UPDATES = [
    { pattern: 'Pular', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/pular-1.png' },
    { pattern: 'Fairy', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/fairy-1.png' },
    { pattern: 'Fair ', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/fairy-1.png' },
    { pattern: 'Clivia', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220912/hansol-1.png' },
    { pattern: 'Hansol', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220912/hansol-1.png' },
    { pattern: 'Soyal', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/soyal-1.png' },
    { pattern: 'Charmo', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/soyal-1.png' },
    { pattern: 'Console', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/console-1.png' },
    { pattern: 'Free Match', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/multi-1.png' },
    { pattern: 'Bi-split', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/multi-1.png' },
    { pattern: 'Tri-split', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/multi-1.png' },
    { pattern: 'Quadri', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/multi-1.png' },
    { pattern: 'Penta', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/multi-1.png' },
    { pattern: 'Gainable', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/ducted-1.png' },
    { pattern: 'Cassette', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/cassette-1.png' },
    { pattern: 'Allège', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/floor-ceiling-1.png' },
    { pattern: 'Plafonnier', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/floor-ceiling-1.png' },
    { pattern: 'Versati', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/versati-1.png' },
    { pattern: 'Aeros', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/water-heater-1.png' },
    { pattern: 'GMV', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/gmv6-1.png' },
    { pattern: 'Wifi', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/wifi-1.png' },
    { pattern: 'Télécommande', exclude: 'Filaire', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/remote-1.png' },
    { pattern: 'Télécommande%Filaire', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/wired-remote-1.png' },
    { pattern: 'Liaison%Frigorifique', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/pipe-1.png' },
    { pattern: 'Goulotte', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/trunking-1.png' },
    { pattern: 'Support', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/bracket-1.png' },
    { pattern: 'Filtre', url: 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/filter-1.png' },
]

async function fixImages() {
    console.log("Starting image updates...")
    let totalUpdated = 0

    for (const update of UPDATES) {
        let query = supabase
            .from('produits')
            .update({ image_principale: update.url })
            .eq('marque', 'GREE')
            .ilike('nom', `%${update.pattern.replace(/%/g, '')}%`)

        if (update.exclude) {
            query = query.not('nom', 'ilike', `%${update.exclude}%`)
        }

        const { data, error, count } = await query.select()

        if (error) {
            console.error(`Error updating ${update.pattern}:`, error.message)
        } else {
            // count is null usually unless asked? select() returns data.
            const num = data ? data.length : 0
            if (num > 0) {
                console.log(`Updated ${num} products matching "${update.pattern}" to ${update.url}`)
                totalUpdated += num
            }
        }
    }

    console.log(`\nTotal products updated: ${totalUpdated}`)
}

fixImages()
