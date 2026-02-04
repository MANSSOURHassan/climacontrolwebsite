import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request, props: { params: Promise<{ productId: string }> }) {
    const params = await props.params;

    try {
        const { data: reviews, error } = await supabase
            .from("reviews")
            .select("*")
            .eq("product_id", params.productId)
            .order("created_at", { ascending: false })

        if (error) throw error

        return NextResponse.json({ reviews })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
