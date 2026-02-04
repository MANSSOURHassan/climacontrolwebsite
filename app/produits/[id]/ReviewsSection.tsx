"use client"

import { useState, useEffect } from "react"
import { Star, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"

interface Review {
    id: number
    author_name: string
    rating: number
    comment: string
    created_at: string
}

export default function ReviewsSection({ productId }: { productId: number }) {
    const [reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)
    const { toast } = useToast()

    // Form state
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState("")
    const [authorName, setAuthorName] = useState("")
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        // Check auth
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user)
            if (data.user?.user_metadata?.full_name) {
                setAuthorName(data.user.user_metadata.full_name)
            }
        })

        // Fetch reviews
        fetch(`/api/reviews/${productId}`)
            .then(res => res.json())
            .then(data => {
                if (data.reviews) setReviews(data.reviews)
            })
            .finally(() => setLoading(false))
    }, [productId])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!comment || !authorName) return

        setSubmitting(true)
        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product_id: productId,
                    user_id: user?.id,
                    author_name: authorName,
                    rating,
                    comment
                })
            })
            const data = await res.json()

            if (data.success) {
                setReviews([data.review, ...reviews])
                setComment("")
                toast({ title: "Avis publié !", description: "Merci pour votre retour." })
            } else {
                throw new Error(data.error)
            }
        } catch (error) {
            toast({ title: "Erreur", description: "Impossible de publier l'avis.", variant: "destructive" })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <section className="mt-16 bg-white rounded-2xl p-8 border">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                Avis Clients <span className="text-gray-400 font-normal text-lg">({reviews.length})</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Reviews List */}
                <div className="space-y-6">
                    {loading ? (
                        <p>Chargement des avis...</p>
                    ) : reviews.length === 0 ? (
                        <div className="text-center py-10 bg-gray-50 rounded-lg">
                            <p className="text-gray-500">Soyez le premier à donner votre avis sur ce produit !</p>
                        </div>
                    ) : (
                        reviews.map((review) => (
                            <div key={review.id} className="pb-6 border-b last:border-0 hover:bg-gray-50 p-4 rounded-lg transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <span className="font-semibold">{review.author_name}</span>
                                    </div>
                                    <span className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex text-yellow-500 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`} />
                                    ))}
                                </div>
                                <p className="text-gray-600">{review.comment}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Write Review Form */}
                <div className="bg-gray-50 p-6 rounded-xl h-fit">
                    <h3 className="font-semibold text-lg mb-4">Donnez votre avis</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="author">Votre nom</Label>
                            <Input
                                id="author"
                                value={authorName}
                                onChange={e => setAuthorName(e.target.value)}
                                placeholder="Jean Dupont"
                                required
                            />
                        </div>

                        <div>
                            <Label className="mb-2 block">Note</Label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`focus:outline-none transition-transform hover:scale-110 ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                                    >
                                        <Star className={`w-8 h-8 ${star <= rating ? "fill-current" : ""}`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="comment">Votre commentaire</Label>
                            <Textarea
                                id="comment"
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                placeholder="Qu'avez-vous pensé de ce produit ?"
                                className="min-h-[100px]"
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={submitting}>
                            {submitting ? "Publication..." : "Publier mon avis"}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}
