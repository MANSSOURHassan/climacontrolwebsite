// ==============================
// BASE DE DONNÉES DES PRODUITS
// ==============================
// Ce fichier contient tous les produits disponibles sur le site ClimaControl
// Les produits sont organisés par catégories : 
// - climatisation : systèmes de climatisation et unités
// - chauffage : systèmes de chauffage et pompes à chaleur
// - pac : pompes à chaleur air-eau
// - accessoires : thermostats, adoucisseurs et accessoires

// ==============================
// STRUCTURE D'UN PRODUIT
// ==============================
// Chaque produit contient les informations suivantes :
// - id: Identifiant unique du produit (ex: "clim-1")
// - name: Nom complet du produit
// - brand: Marque du produit (ex: "GREE")
// - price: Prix en euros
// - image: Chemin vers l'image du produit
// - rating: Note de 1 à 5 (étoiles)
// - features: Liste des caractéristiques principales
// - badge: Étiquette optionnelle (ex: "Bestseller", "Premium")
// - categorie: Catégorie du produit

export const products = {

  // ==============================
  // CATÉGORIE CLIMATISATION
  // ==============================
  // Systèmes de climatisation complets, unités intérieures et extérieures
  climatisation: [
    {
      id: "clim-1",
      name: "Climatisation Gainable U-Match CDT 24 - 8 kW",
      brand: "GREE",
      price: 2499.99,
      image: "/images/climatisation-gainable-u-match-cdt-24-8-kwatts-monophase-r32-prix-2499.jpg",
      images: [
        "/images/climatisation-gainable-u-match-cdt-24-8-kwatts-monophase-r32-unite-interieure.jpg",
        "/images/climatisation-gainable-u-match-cdt-24-8-kwatts-monophase-r32-unite-exterieure.jpg"
      ],
      rating: 5,
      features: ["Système complet", "8 kW Monophasé", "Gaz R32", "Thermostat inclus"],
      badge: "Bestseller",
      categorie: "Climatisation",
    },
    {
      id: "clim-2",
      name: "Climatiseur Cassette U-Match 4 kW",
      brand: "GREE",
      price: 1299.99,
      image: "/images/climatiseur-cassette-u-match-4-kwatts-monophase-r32-prix-1299.jpg",
      rating: 5,
      features: ["4 voies", "4 kW", "Design discret", "R32 écologique"],
      badge: "Premium",
      categorie: "Climatisation",
    },
    {
      id: "clim-3",
      name: "Climatiseur Cassette GREE - Vue Encastrée",
      brand: "GREE",
      price: 2599.99,
      image: "/images/cassette-prix-2599.jpg",
      rating: 5,
      features: ["4 voies", "Design discret", "Installation plafond", "R32 écologique"],
      badge: "Premium",
      categorie: "Climatisation",
    },
    {
      id: "clim-4",
      name: "Unité Extérieure GREE 3.5 kW",
      brand: "GREE",
      price: 699.99,
      image: "/images/unite-exterieure-gree-3-5kw-prix-699.jpg",
      rating: 5,
      features: ["3.5 kW", "Inverter", "Silencieuse", "Haute performance"],
      categorie: "Climatisation",
    },
    {
      id: "clim-5",
      name: "Unité Gainable 3.5 kW",
      brand: "GREE",
      price: 369.99,
      image: "/images/unite-gainable-3-5kw-prix-369.jpg",
      rating: 5,
      features: ["3.5 kW", "Compact", "Installation discrète", "Économique"],
      categorie: "Climatisation",
    },
    {
      id: "clim-6",
      name: "Unité Gainable GREE avec Télécommande",
      brand: "GREE",
      price: 1599,
      image: "/images/climatisation-gainable-u-match-cdt-24-8-kwatts-monophase-r32-thermostat.jpg",
      rating: 5,
      features: ["CDT-24", "Contrôle filaire", "Installation discrète"],
      categorie: "Climatisation",
    },
    {
      id: "clim-7",
      name: "Unité Extérieure GREE U-Match",
      brand: "GREE",
      price: 1799,
      image: "/images/climatisation-gainable-u-match-cdt-24-8-kwatts-monophase-r32-unite-exterieure.jpg",
      rating: 5,
      features: ["Compacte", "R32 écologique", "Faible bruit"],
      categorie: "Climatisation",
    },
  ],

  // ==============================
  // CATÉGORIE CHAUFFAGE
  // ==============================
  // Systèmes de chauffage et pompes à chaleur pour le chauffage
  chauffage: [
    {
      id: "chauff-1",
      name: "Pompe à Chaleur Air-Eau",
      brand: "GREE",
      price: 3999.99,
      image: "/images/climatisation-gainable-u-match-cdt-24-8-kwatts-monophase-r32-unite-exterieure.jpg",
      rating: 5,
      features: ["Haute performance", "R32 écologique", "Chauffage efficace", "Économies d'énergie"],
      badge: "Premium",
      categorie: "Chauffage",
    },
    {
      id: "chauff-2",
      name: "Système de Chauffage Gainable",
      brand: "GREE",
      price: 2799.99,
      image: "/images/climatisation-gainable-u-match-cdt-24-8-kwatts-monophase-r32-unite-interieure.jpg",
      rating: 5,
      features: ["Installation discrète", "Réversible", "Contrôle précis", "Silencieux"],
      badge: "Bestseller",
      categorie: "Chauffage",
    },
  ],

  // ==============================
  // CATÉGORIE PAC (POMPES À CHALEUR)
  // ==============================
  // Unités spécifiques pour les pompes à chaleur
  pac: [
    {
      id: "pac-1",
      name: "Unité Intérieure Gainable",
      brand: "GREE",
      price: 1299.99,
      image: "/images/climatisation-gainable-u-match-cdt-24-8-kwatts-monophase-r32-unite-interieure.jpg",
      rating: 5,
      features: ["Basse pression", "Compact", "Installation discrète"],
      categorie: "Pompe à chaleur",
    },
    {
      id: "pac-2",
      name: "Unité Extérieure GREE",
      brand: "GREE",
      price: 1599.99,
      image: "/images/climatisation-gainable-u-match-cdt-24-8-kwatts-monophase-r32-unite-exterieure.jpg",
      rating: 5,
      features: ["Inverter", "Silencieuse", "Haute performance"],
      categorie: "Pompe à chaleur",
    },
  ],

  // ==============================
  // CATÉGORIE ACCESSOIRES
  // ==============================
  // Thermostats, adoucisseurs d'eau et accessoires d'installation
  accessoires: [
    {
      id: "acc-1",
      name: "Thermostat Digital GREE",
      brand: "GREE",
      price: 149.99,
      image: "/images/thermostat-digital-gree.jpg",
      rating: 5,
      features: ["LCD grand format", "7 jours programmable", "Compatible tous systèmes"],
      badge: "Nouveau",
      categorie: "Accessoires",
    },
    {
      id: "acc-2",
      name: "Adoucisseur d'Eau à Sel",
      brand: "Pro",
      price: 689.99,
      image: "/images/adoucisseur-a-sel-prix-689.jpg",
      rating: 4.5,
      features: ["Système automatique", "20L capacité", "Régénération programmable"],
      badge: "Recommandé",
      categorie: "Accessoires",
    },
    {
      id: "acc-3",
      name: "Adoucisseur Sans Sel - Système CO2",
      brand: "Pro",
      price: 1799.99,
      image: "/images/adoucisseur-sans-sel-prix-1799.jpg",
      rating: 5,
      features: ["Écologique", "Sans entretien", "Installation facile", "Technologie CO2"],
      badge: "Écologique",
      categorie: "Accessoires",
    },
    {
      id: "acc-4",
      name: "Valve Adoucisseur Sans Sel",
      brand: "Pro",
      price: 299.99,
      image: "/images/adoucisseur-sans-sel-valve.jpg",
      rating: 4.5,
      features: ["Installation facile", "Durable", "Compatible tous systèmes"],
      categorie: "Accessoires",
    },
    {
      id: "acc-5",
      name: "Module Adoucisseur Compact",
      brand: "Pro",
      price: 399.99,
      image: "/images/adoucisseur-sans-sel-module.jpg",
      rating: 5,
      features: ["Compact", "Technologie avancée", "Sans sel"],
      categorie: "Accessoires",
    },
    {
      id: "acc-6",
      name: "Système Adoucisseur Premium",
      brand: "Pro",
      price: 599.99,
      image: "/images/adoucisseur-sans-sel-premium.jpg",
      rating: 5,
      features: ["Système complet", "Installation pro", "Garantie 5 ans"],
      categorie: "Accessoires",
    },
    {
      id: "acc-7",
      name: "Tubes PVC - Kit Installation",
      brand: "Pro",
      price: 89.99,
      image: "/images/tubes-pvc-accessoires.jpg",
      rating: 4.5,
      features: ["Résistant", "Diamètres variés", "Kit complet"],
      categorie: "Accessoires",
    },
  ],
}
