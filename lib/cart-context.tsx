// ==============================
// DIRECTIVE CLIENT
// ==============================
// "use client" indique que ce fichier doit être exécuté côté client
// Ceci est nécessaire car on utilise des hooks React (useState, useEffect, useContext)
"use client"

// ==============================
// IMPORTS DES DÉPENDANCES
// ==============================
import type React from "react"
// createContext : crée un contexte React pour partager des données globalement
// useContext : permet d'accéder au contexte depuis n'importe quel composant
// useState : gère l'état local
// useEffect : exécute du code après le rendu (effets de bord)
import { createContext, useContext, useState, useEffect } from "react"

// ==============================
// INTERFACE CARTITEM
// ==============================
// Définit la structure d'un article dans le panier
interface CartItem {
  id: string         // Identifiant unique du produit
  nom: string        // Nom du produit
  prix: number       // Prix unitaire en euros
  image: string      // URL de l'image du produit
  quantite: number   // Quantité dans le panier
  categorie: string  // Catégorie du produit (climatisation, chauffage, etc.)
}

// ==============================
// INTERFACE CARTCONTEXTTYPE
// ==============================
// Définit toutes les fonctions et données disponibles dans le contexte panier
interface CartContextType {
  items: CartItem[]                                    // Liste des articles dans le panier
  addItem: (item: Omit<CartItem, "quantite">) => void  // Ajouter un article au panier
  removeItem: (id: string) => void                     // Supprimer un article du panier
  updateQuantity: (id: string, quantite: number) => void // Modifier la quantité d'un article
  clearCart: () => void                                // Vider le panier
  total: number                                        // Total du panier en euros
  itemCount: number                                    // Nombre total d'articles
}

// ==============================
// CRÉATION DU CONTEXTE
// ==============================
// Crée le contexte React avec une valeur initiale undefined
// Sera défini par le CartProvider
const CartContext = createContext<CartContextType | undefined>(undefined)

// ==============================
// COMPOSANT CARTPROVIDER
// ==============================
// Ce composant enveloppe l'application et fournit le contexte panier
// à tous les composants enfants
export function CartProvider({ children }: { children: React.ReactNode }) {
  // État local contenant les articles du panier
  const [items, setItems] = useState<CartItem[]>([])

  // ==============================
  // EFFET : CHARGER LE PANIER DEPUIS LOCALSTORAGE
  // ==============================
  // Au premier rendu, charge le panier sauvegardé dans le navigateur
  useEffect(() => {
    const savedCart = localStorage.getItem("climacontrol-cart")
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  // ==============================
  // EFFET : SAUVEGARDER LE PANIER DANS LOCALSTORAGE
  // ==============================
  // À chaque modification du panier, sauvegarde dans le navigateur
  // Cela permet de persister le panier même après fermeture du navigateur
  useEffect(() => {
    localStorage.setItem("climacontrol-cart", JSON.stringify(items))
  }, [items])

  // ==============================
  // FONCTION : AJOUTER UN ARTICLE
  // ==============================
  // Ajoute un article au panier ou incrémente sa quantité s'il existe déjà
  const addItem = (item: Omit<CartItem, "quantite">) => {
    setItems((prev) => {
      // Vérifie si l'article existe déjà dans le panier
      const existingItem = prev.find((i) => i.id === item.id)
      if (existingItem) {
        // Si oui, incrémente la quantité
        return prev.map((i) => (i.id === item.id ? { ...i, quantite: i.quantite + 1 } : i))
      }
      // Sinon, ajoute l'article avec quantité = 1
      return [...prev, { ...item, quantite: 1 }]
    })
  }

  // ==============================
  // FONCTION : SUPPRIMER UN ARTICLE
  // ==============================
  // Supprime complètement un article du panier
  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  // ==============================
  // FONCTION : MODIFIER LA QUANTITÉ
  // ==============================
  // Met à jour la quantité d'un article spécifique
  // Si la quantité devient 0 ou moins, supprime l'article
  const updateQuantity = (id: string, quantite: number) => {
    if (quantite <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantite } : i)))
  }

  // ==============================
  // FONCTION : VIDER LE PANIER
  // ==============================
  // Supprime tous les articles du panier
  const clearCart = () => {
    setItems([])
  }

  // ==============================
  // CALCULS DÉRIVÉS
  // ==============================
  // Calcule le total du panier (somme des prix × quantités)
  const total = items.reduce((sum, item) => sum + item.prix * item.quantite, 0)
  // Calcule le nombre total d'articles (somme des quantités)
  const itemCount = items.reduce((sum, item) => sum + item.quantite, 0)

  // ==============================
  // RENDU DU PROVIDER
  // ==============================
  // Fournit toutes les fonctions et données du panier aux composants enfants
  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

// ==============================
// HOOK USECART
// ==============================
// Hook personnalisé pour accéder facilement au contexte panier
// Doit être utilisé dans un composant enfant de CartProvider
export function useCart() {
  const context = useContext(CartContext)
  // Vérifie que le hook est utilisé dans un composant enveloppé par CartProvider
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
