// ================================
// TYPES TYPESCRIPT POUR LA BASE DE DONNÉES
// ================================

// Interface représentant un produit vendu sur le site
export interface Produit {
  id: number                 // Identifiant unique du produit
  reference: string          // Référence interne ou commerciale du produit
  nom: string                // Nom du produit
  description: string        // Description détaillée du produit
  prix: number               // Prix normal du produit
  prix_promo?: number        // Prix promotionnel (optionnel)
  stock: number              // Quantité disponible en stock
  image_url?: string         // URL de l’image du produit (optionnelle)
  marque: string             // Marque du produit
  categorie_id: number       // Identifiant de la catégorie associée
  garantie_mois: number      // Durée de garantie en mois
  caracteristiques?: string  // Caractéristiques techniques (optionnelles)
  actif: boolean             // Indique si le produit est actif ou non
  ordre: number              // Ordre d’affichage du produit
  date_creation: Date        // Date de création du produit
  date_modification: Date    // Date de la dernière modification
  categorie_nom?: string     // Nom de la catégorie (optionnel, jointure)
  categorie_slug?: string    // Slug de la catégorie (optionnel, jointure)
}

// Interface représentant une catégorie de produits
export interface Categorie {
  id: number                 // Identifiant unique de la catégorie
  nom: string                // Nom de la catégorie
  slug: string               // Slug utilisé dans les URL
  description?: string       // Description de la catégorie (optionnelle)
  image_url?: string         // Image associée à la catégorie (optionnelle)
  actif: boolean             // Indique si la catégorie est active
  ordre: number              // Ordre d’affichage
  nombre_produits?: number   // Nombre de produits dans la catégorie (optionnel)
}

// Interface représentant un client
export interface Client {
  id: number                 // Identifiant unique du client
  nom: string                // Nom du client
  prenom: string             // Prénom du client
  email: string              // Adresse email du client
  telephone?: string         // Numéro de téléphone (optionnel)
  adresse?: string           // Adresse postale (optionnelle)
  ville?: string             // Ville du client (optionnelle)
  code_postal?: string       // Code postal (optionnel)
  date_inscription: Date     // Date d’inscription du client
}

// Interface représentant un devis
export interface Devis {
  id: number                 // Identifiant unique du devis
  numero: string             // Numéro du devis
  client_id: number          // Identifiant du client associé
  type_service: string       // Type de service demandé
  adresse_intervention?: string // Adresse de l’intervention (optionnelle)
  description?: string       // Description du devis (optionnelle)
  montant_ht?: number        // Montant hors taxes (optionnel)
  montant_ttc?: number       // Montant toutes taxes comprises (optionnel)
  statut: "en_attente" | "envoye" | "accepte" | "refuse" | "expire"
                              // Statut actuel du devis
  date_creation: Date        // Date de création du devis
  date_validite: Date        // Date de validité du devis
  client_nom?: string        // Nom du client (optionnel, jointure)
  client_email?: string     // Email du client (optionnel, jointure)
  client_telephone?: string // Téléphone du client (optionnel, jointure)
}

// Interface représentant une ligne de devis
export interface DevisLigne {
  id: number                 // Identifiant unique de la ligne de devis
  devis_id: number           // Identifiant du devis associé
  produit_id?: number        // Identifiant du produit (optionnel)
  designation: string        // Désignation de la ligne (nom ou description)
  quantite: number           // Quantité commandée
  prix_unitaire: number      // Prix unitaire du produit ou service
  total: number              // Total calculé (quantité × prix unitaire)
}
