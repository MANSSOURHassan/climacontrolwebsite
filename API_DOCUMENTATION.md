efier # 📚 Documentation API ClimaControl

API REST pour gérer les produits, devis, clients et contacts.

---

## 🔗 Endpoints Disponibles

### 1. Produits

#### Récupérer tous les produits
```http
GET /api/produits
```

**Paramètres de requête :**
- `categorie` (optionnel) : Filtrer par slug de catégorie

**Exemples :**
```bash
GET /api/produits
GET /api/produits?categorie=climatisation
```

**Réponse :**
```json
{
  "success": true,
  "count": 10,
  "produits": [
    {
      "id": 1,
      "reference": "GREE-GAIN-8KW",
      "nom": "Climatiseur Gainable GREE U-Match 8kW",
      "prix": 2499.00,
      "stock": 15,
      "categorie_nom": "Climatisation"
    }
  ]
}
```

#### Récupérer un produit par ID
```http
GET /api/produits/[id]
```

**Exemple :**
```bash
GET /api/produits/1
```

---

### 2. Catégories

#### Récupérer toutes les catégories
```http
GET /api/categories
```

**Réponse :**
```json
{
  "success": true,
  "count": 4,
  "categories": [
    {
      "id": 1,
      "nom": "Climatisation",
      "slug": "climatisation",
      "nombre_produits": 7
    }
  ]
}
```

---

### 3. Devis

#### Créer un nouveau devis
```http
POST /api/devis
Content-Type: application/json
```

**Body :**
```json
{
  "client": {
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean.dupont@email.com",
    "telephone": "0612345678"
  },
  "type_service": "installation_climatisation",
  "adresse": "123 Rue de la Paix, 75001 Paris",
  "description": "Installation climatisation pour appartement 80m²",
  "produits": [
    {
      "id": 1,
      "quantite": 1,
      "prix": 2499.00
    }
  ]
}
```

**Réponse :**
```json
{
  "success": true,
  "message": "Devis créé avec succès",
  "devis_id": 123,
  "client_id": 45
}
```

#### Récupérer tous les devis
```http
GET /api/devis
```

---

### 4. Contact

#### Envoyer un message de contact
```http
POST /api/contact
Content-Type: application/json
```

**Body :**
```json
{
  "nom": "Martin",
  "prenom": "Sophie",
  "email": "sophie.martin@email.com",
  "telephone": "0698765432",
  "sujet": "Demande d'information",
  "message": "Je souhaiterais obtenir plus d'informations sur..."
}
```

**Réponse :**
```json
{
  "success": true,
  "message": "Votre message a été envoyé avec succès"
}
```

---

### 5. Test de Connexion

#### Tester la connexion à la base de données
```http
GET /api/test-db
```

**Réponse :**
```json
{
  "success": true,
  "message": "✅ Connexion à la base de données réussie !",
  "statistics": {
    "produits": 10,
    "categories": 4
  }
}
```

---

## 🔐 Gestion des Erreurs

Toutes les API retournent un format cohérent :

**Succès :**
```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

**Erreur :**
```json
{
  "success": false,
  "message": "Description de l'erreur",
  "error": "Détails techniques"
}
```

**Codes HTTP :**
- `200` : Succès
- `400` : Requête invalide
- `404` : Ressource non trouvée
- `500` : Erreur serveur

---

## 📝 Exemples d'Utilisation

### Avec fetch (JavaScript)
```javascript
// Récupérer les produits
const response = await fetch('/api/produits?categorie=climatisation')
const data = await response.json()
console.log(data.produits)

// Créer un devis
const response = await fetch('/api/devis', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    client: { nom: 'Dupont', email: 'test@email.com' },
    type_service: 'installation_climatisation'
  })
})
const result = await response.json()
```

### Avec curl
```bash
# Récupérer les produits
curl http://localhost:3000/api/produits

# Créer un devis
curl -X POST http://localhost:3000/api/devis \
  -H "Content-Type: application/json" \
  -d '{"client":{"nom":"Test","email":"test@email.com"},"type_service":"installation"}'
