"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

function ResetPasswordForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const { toast } = useToast()

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!token) {
            setError("Jeton de réinitialisation manquant.")
            return
        }

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.")
            return
        }

        if (password.length < 8) {
            setError("Le mot de passe doit contenir au moins 8 caractères.")
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Erreur lors de la réinitialisation")
            }

            setIsSuccess(true)
            toast({
                title: "Succès !",
                description: "Votre mot de passe a été réinitialisé.",
            })

            setTimeout(() => {
                router.push("/compte")
            }, 3000)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    if (isSuccess) {
        return (
            <Card className="max-w-md mx-auto mt-10">
                <CardContent className="pt-10 pb-10 text-center">
                    <div className="flex justify-center mb-6">
                        <CheckCircle2 className="h-16 w-16 text-green-500" />
                    </div>
                    <CardTitle className="text-2xl mb-4">Mot de passe réinitialisé !</CardTitle>
                    <CardDescription className="text-lg">
                        Votre mot de passe a été mis à jour avec succès.
                        Vous allez être redirigé vers la page de connexion.
                    </CardDescription>
                    <Button asChild className="mt-8 w-full">
                        <Link href="/compte">Aller à la connexion</Link>
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="max-w-md mx-auto mt-10 shadow-lg border-primary/10">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Réinitialisation</CardTitle>
                <CardDescription className="text-center">
                    Choisissez votre nouveau mot de passe
                </CardDescription>
            </CardHeader>
            <CardContent>
                {!token ? (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            Le lien de réinitialisation est invalide ou a expiré.
                            Veuillez faire une nouvelle demande.
                        </AlertDescription>
                        <Button asChild variant="link" className="px-0 text-destructive underline mt-2">
                            <Link href="/compte">Retour à la connexion</Link>
                        </Button>
                    </Alert>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="password">Nouveau mot de passe</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            <p className="text-xs text-muted-foreground">Min. 8 caractères</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="confirm-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                            {isLoading ? "Mise à jour..." : "Réinitialiser mon mot de passe"}
                        </Button>
                    </form>
                )}
            </CardContent>
        </Card>
    )
}

export default function ResetPasswordPage() {
    return (
        <div className="container mx-auto py-20 px-4 min-h-[70vh] flex items-center justify-center">
            <Suspense fallback={<div>Chargement...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </div>
    )
}
