import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const q = searchParams.get("q")
        const category = searchParams.get("category")
        const minPrice = searchParams.get("minPrice")
        const maxPrice = searchParams.get("maxPrice")
        const brand = searchParams.get("brand")

        let query = supabase.from("produits").select(`
      *,
      categorie:categories(nom, slug)
    `)

        if (q) {
            // Simple text search on name or description
            query = query.or(`nom.ilike.%${q}%,description.ilike.%${q}%`)
        }

        if (category && category !== "all") {
            // Assuming we filter by category slug or id, here using join filter could be tricky in one go if not careful.
            // Easiest is to filter by categorie_id if we have it, or filter on the joined table result which Supabase supports via embedded resources filtering
            // But simpler way: first get category ID from slug if needed, or if frontend sends slug, we might need a separate lookup or use !inner join.
            // Let's assume frontend sends category SLUG for now.
            query = query.eq('categories.slug', category) // This requires !inner on categories to filter parent rows
            // Syntax: .select('*, categories!inner(slug)')
            // Let's adjust the select above.
        }

        if (brand && brand !== "all") {
            query = query.eq("marque", brand)
        }

        if (minPrice) {
            query = query.gte("prix_ttc", minPrice)
        }

        if (maxPrice) {
            query = query.lte("prix_ttc", maxPrice)
        }

        // Rewrite query to support category filter properly if needed
        if (category && category !== "all") {
            // Reset query to use inner join for filtering
            query = supabase.from("produits").select(`
         *,
         categorie:categories!inner(nom, slug)
       `).eq('categories.slug', category)

            // Re-apply other filters
            if (q) {
                query = query.or(`nom.ilike.%${q}%,description.ilike.%${q}%`)
            }
            if (brand && brand !== "all") {
                query = query.eq("marque", brand)
            }
            if (minPrice) {
                query = query.gte("prix_ttc", minPrice)
            }
            if (maxPrice) {
                query = query.lte("prix_ttc", maxPrice)
            }
        }

        const { data: products, error } = await query

        if (error) {
            throw error
        }

        return NextResponse.json({ products })
    } catch (error: any) {
        console.error("Error searching products:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
