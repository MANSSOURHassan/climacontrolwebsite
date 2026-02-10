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
        const power = searchParams.get("power") // New parameter for power
        const sort = searchParams.get("sort") // New parameter for sorting

        // Use !inner if filtering by category to leverage database join filtering
        const selectString = category && category !== "all"
            ? `*, categorie:categories!inner(nom, slug)`
            : `*, categorie:categories(nom, slug)`

        let query = supabase.from("produits").select(selectString)

        // Apply filters
        if (category && category !== "all") {
            query = query.eq('categories.slug', category)
        }

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

        if (power) {
            // Basic text match for power like "3.5 kW"
            query = query.ilike("puissance", `%${power}%`)
        }

        // Apply sorting
        if (sort === 'prix_asc') {
            query = query.order('prix_ttc', { ascending: true })
        } else if (sort === 'prix_desc') {
            query = query.order('prix_ttc', { ascending: false })
        } else {
            // Default sort by popularity or name
            query = query.order('en_vedette', { ascending: false }).order('nom', { ascending: true })
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
