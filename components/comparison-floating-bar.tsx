"use client"

import { useComparison } from "@/lib/comparison-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRightLeft, X } from "lucide-react"

export function ComparisonFloatingBar() {
    const { items, clearComparison } = useComparison()

    if (items.length === 0) return null

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4">
            <div className="bg-white border rounded-full shadow-2xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-primary text-white rounded-full p-2">
                        <ArrowRightLeft className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="font-semibold text-sm">Comparateur</p>
                        <p className="text-xs text-muted-foreground">{items.length} produit{items.length > 1 ? "s" : ""} sélectionné{items.length > 1 ? "s" : ""}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={clearComparison} className="text-muted-foreground hover:text-red-500 rounded-full">
                        <span className="sr-only">Vider</span>
                        <X className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="rounded-full px-6" asChild>
                        <Link href="/comparateur">Comparer</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
