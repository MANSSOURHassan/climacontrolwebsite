# Tests Automatisés - ClimaControl

## Vue d'Ensemble

Ce projet utilise **Cypress** pour les tests end-to-end (E2E) et les tests de composants.

## Prérequis

- Node.js 18+
- XAMPP (MySQL en local)
- Base de données `climacontrol` importée

## Installation

```bash
npm install
```

## Lancer les Tests

### Mode Interface (Recommandé pour le développement)
```bash
npm run cypress
```

### Mode Headless (Pour CI/CD)
```bash
npm run test
```

## Structure des Tests

```
cypress/
├── e2e/
│   ├── navigation.cy.ts      # Tests de navigation
│   ├── produits.cy.ts         # Tests des produits
│   ├── panier.cy.ts          # Tests du panier
│   ├── formulaires.cy.ts     # Tests des formulaires
│   └── responsive.cy.ts      # Tests responsive
└── support/
    ├── commands.ts           # Commandes personnalisées
    ├── e2e.ts               # Configuration E2E
    └── component.ts         # Configuration composants
```

## Commandes Personnalisées

### clearCart()
Vide le panier d'achat
```typescript
cy.clearCart()
```

### addToCart(productName)
Ajoute un produit au panier
```typescript
cy.addToCart('Climatiseur Mural')
```

### login(email, password)
Connexion utilisateur
```typescript
cy.login('user@test.com', 'password123')
```

## Couverture des Tests

- Navigation : 7 tests
- Produits : 4 tests
- Panier : 4 tests
- Formulaires : 4 tests
- Responsive : 9 tests (3 appareils × 3 tests)

**Total : 28 tests automatisés**

## Rapports

Les résultats sont sauvegardés dans :
- `cypress/videos/` - Vidéos des tests
- `cypress/screenshots/` - Captures d'écran des erreurs
