import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
    try {
        const { count, error } = await supabase.from('clients').select('*', { count: 'exact', head: true });

        if (error) {
            return NextResponse.json({ status: "Error", message: error.message });
        }

        return NextResponse.json({
            status: "Success",
            tableName: "clients",
            rowCount: count,
            message: "Table 'clients' detected and accessible."
        });
    } catch (error: any) {
        return NextResponse.json({ status: "Exception", message: error.message });
    }
}
