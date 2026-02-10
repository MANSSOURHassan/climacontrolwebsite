"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"

export interface ProductToCompare {
    id: string
    name: string
    brand: string
    price: number
    image: string
    features: string[]
    categorie: string
    rating: number
}

interface ComparisonContextType {
    items: ProductToCompare[]
    addItem: (item: ProductToCompare) => void
    removeItem: (itemId: string) => void
    clearComparison: () => void
    isInComparison: (itemId: string) => boolean
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export function ComparisonProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<ProductToCompare[]>([])
    const { toast } = useToast()

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem("comparison-items")
        if (saved) {
            try {
                setItems(JSON.parse(saved))
            } catch (e) {
                console.error("Failed to parse comparison items", e)
            }
        }
    }, [])

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem("comparison-items", JSON.stringify(items))
    }, [items])

    const addItem = (item: ProductToCompare) => {
        if (items.find((i) => i.id === item.id)) {
            toast({
                title: "Déjà dans le comparateur",
                description: "Ce produit est déjà sélectionné pour la comparaison.",
                variant: "destructive",
            })
            return
        }

        if (items.length >= 4) {
            toast({
                title: "Comparateur plein",
                description: "Vous ne pouvez comparer que 4 produits maximum.",
                variant: "destructive",
            })
            return
        }

        setItems([...items, item])
        toast({
            title: "Ajouté au comparateur",
            description: `${item.name} a été ajouté à la comparaison.`,
        })
    }

    const removeItem = (itemId: string) => {
        setItems(items.filter((i) => i.id !== itemId))
    }

    const clearComparison = () => {
        setItems([])
    }

    const isInComparison = (itemId: string) => {
        return items.some((i) => i.id === itemId)
    }

    return (
        <ComparisonContext.Provider value={{ items, addItem, removeItem, clearComparison, isInComparison }}>
            {children}
        </ComparisonContext.Provider>
    )
}

export function useComparison() {
    const context = useContext(ComparisonContext)
    if (context === undefined) {
        throw new Error("useComparison must be used within a ComparisonProvider")
    }
    return context
}
