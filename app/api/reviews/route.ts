import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { product_id, user_id, author_name, rating, comment } = body

        if (!product_id || !rating || !author_name) {
            return NextResponse.json({ error: "Champs manquants" }, { status: 400 })
        }

        const { data, error } = await supabase
            .from("reviews")
            .insert([{
                product_id,
                user_id,
                author_name,
                rating,
                comment
            }])
            .select()
            .single()

        if (error) throw error

        return NextResponse.json({ success: true, review: data })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
