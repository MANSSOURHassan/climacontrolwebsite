"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Mail, Lock, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

export default function CompteClient() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Redirection si déjà connecté
  useEffect(() => {
    const client = localStorage.getItem("client")
    if (client) {
      router.push("/compte/dashboard")
    }
  }, [router])

  // États pour l'inscription
  const [registerData, setRegisterData] = useState({
    prenom: "",
    nom: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // États pour la connexion
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (registerData.password !== registerData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    if (registerData.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom: registerData.prenom,
          nom: registerData.nom,
          email: registerData.email,
          password: registerData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'inscription")
      }

      toast({
        title: "Compte créé avec succès !",
        description: "Vous pouvez maintenant vous connecter",
      })

      // Réinitialiser le formulaire
      setRegisterData({
        prenom: "",
        nom: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
    } catch (err: any) {
      setError(err.message)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: err.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la connexion")
      }

      // Sauvegarder les infos du client dans localStorage
      localStorage.setItem("client", JSON.stringify(data.client))

      toast({
        title: "Connexion réussie !",
        description: `Bienvenue ${data.client.prenom}`,
      })

      // Rediriger vers le tableau de bord (à créer)
      window.location.href = "/compte/dashboard"
    } catch (err: any) {
      setError(err.message)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: err.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-8">
        <Tabs defaultValue="connexion" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="connexion">Connexion</TabsTrigger>
            <TabsTrigger value="inscription">Inscription</TabsTrigger>
          </TabsList>

          <TabsContent value="connexion" className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-login">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email-login"
                    type="email"
                    placeholder="votre@email.com"
                    className="pl-10"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-login">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password-login"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <Link href="#" className="text-primary hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="inscription" className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input
                    id="prenom"
                    placeholder="Jean"
                    value={registerData.prenom}
                    onChange={(e) => setRegisterData({ ...registerData, prenom: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom</Label>
                  <Input
                    id="nom"
                    placeholder="Dupont"
                    value={registerData.nom}
                    onChange={(e) => setRegisterData({ ...registerData, nom: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-register">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email-register"
                    type="email"
                    placeholder="votre@email.com"
                    className="pl-10"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-register">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password-register"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                    minLength={8}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Minimum 8 caractères</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-confirm">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password-confirm"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Création..." : "Créer mon compte"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                En créant un compte, vous acceptez nos conditions d'utilisation
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
