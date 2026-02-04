// Script to fix product prices in Supabase
// Run with: npx tsx scripts/fix-prices.ts

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase environment variables!')
    console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function fixPrices() {
    console.log('🔍 Checking products with missing prices...\n')

    // Step 1: Find products with NULL prix_ttc
    const { data: productsToFix, error: selectError } = await supabase
        .from('produits')
        .select('id, nom, prix_ht, prix_ttc')
        .or('prix_ttc.is.null,prix_ttc.eq.0')

    if (selectError) {
        console.error('❌ Error querying products:', selectError.message)
        return
    }

    if (!productsToFix || productsToFix.length === 0) {
        console.log('✅ All products already have valid prices!')
        return
    }

    console.log(`Found ${productsToFix.length} products needing price updates:\n`)
    productsToFix.forEach(p => {
        console.log(`  - [${p.id}] ${p.nom}: prix_ht=${p.prix_ht}, prix_ttc=${p.prix_ttc}`)
    })

    // Step 2: Update each product
    console.log('\n🔧 Updating prices (prix_ttc = prix_ht * 1.20)...\n')

    let successCount = 0
    let errorCount = 0

    for (const product of productsToFix) {
        const prix_ht = product.prix_ht ?? 100  // Default to 100€ if no prix_ht
        const prix_ttc = Math.round(prix_ht * 1.20 * 100) / 100  // Round to 2 decimals

        const { error: updateError } = await supabase
            .from('produits')
            .update({
                prix_ht: product.prix_ht ?? 100,
                prix_ttc: prix_ttc
            })
            .eq('id', product.id)

        if (updateError) {
            console.error(`  ❌ Failed to update [${product.id}] ${product.nom}: ${updateError.message}`)
            errorCount++
        } else {
            console.log(`  ✅ Updated [${product.id}] ${product.nom}: prix_ttc = ${prix_ttc}€`)
            successCount++
        }
    }

    // Step 3: Summary
    console.log('\n' + '='.repeat(50))
    console.log(`📊 Summary: ${successCount} updated, ${errorCount} failed`)

    if (errorCount === 0) {
        console.log('✅ All prices fixed successfully!')
    }
}

// Run the fix
fixPrices().catch(console.error)
