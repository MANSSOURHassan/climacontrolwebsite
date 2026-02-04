# Guide Complet : Tester ClimaControl en Local avec XAMPP et Cypress

## Emplacement des Fichiers de Configuration

### Fichiers Principaux
```
climacontrol-ecommerce/
├── .env.local                    ← Configuration base de données XAMPP
├── lib/db.ts                     ← Connexion MySQL (déjà configuré)
├── cypress.config.ts             ← Configuration Cypress
├── cypress/
│   ├── e2e/                      ← Tests end-to-end
│   │   ├── navigation.cy.ts
│   │   ├── produits.cy.ts
│   │   ├── panier.cy.ts
│   │   ├── formulaires.cy.ts
│   │   └── responsive.cy.ts
│   └── support/
│       ├── commands.ts           ← Commandes personnalisées
│       ├── e2e.ts               ← Configuration E2E
│       └── component.ts         ← Configuration composants
├── climacontrol.sql              ← Base de données à importer
└── INSTALLATION_XAMPP.md         ← Guide installation XAMPP
```



### 1.2 Démarrer les Services
```bash
# Dans XAMPP Control Panel :
- Cliquer "Start" sur Apache
- Cliquer "Start" sur MySQL
```

### 1.3 Importer la Base de Données
```bash
# Méthode 1 : phpMyAdmin (Recommandé)
1. Ouvrir http://localhost/phpmyadmin
2. Cliquer "Nouvelle base de données"
3. Nom : climacontrol
4. Encodage : utf8mb4_unicode_ci
5. Cliquer "Importer"
6. Sélectionner le fichier : climacontrol.sql
7. Cliquer "Exécuter"

# Méthode 2 : Ligne de commande
cd C:\xampp\mysql\bin
mysql -u root -p < chemin\vers\climacontrol.sql
```

### 1.4 Vérifier l'Installation
```sql
-- Dans phpMyAdmin, exécuter :
USE climacontrol;
SHOW TABLES;
SELECT * FROM produits LIMIT 5;
```

---

## Étape 2 : Configuration du Projet Next.js

### 2.1 Créer le Fichier .env.local
**IMPORTANT : Ce fichier doit être à la racine du projet**

```env
# Copier ce contenu dans .env.local
DB_HOST=localhost
DB_PORT=3306
DB_NAME=climacontrol
DB_USER=root
DB_PASSWORD=

NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAIL=admin@climacontrol.local
JWT_SECRET=dev_secret_key_for_testing_only
NODE_ENV=development
```

### 2.2 Installer les Dépendances
```bash
npm install
```

### 2.3 Lancer le Serveur de Développement
```bash
npm run dev
```

Le site sera accessible sur **http://localhost:3000**

### 2.4 Tester la Connexion à la Base de Données
Ouvrir dans le navigateur :
```
http://localhost:3000/api/test-db
```

Vous devriez voir :
```json
{
  "success": true,
  "message": "Connexion à la base de données réussie",
  "database": "climacontrol",
  "products": 10
}
```

---

## Étape 3 : Installation et Configuration de Cypress

### 3.1 Installer Cypress (déjà dans package.json)
```bash
npm install
```

### 3.2 Lancer Cypress en Mode Interface
```bash
npm run cypress
# ou
npm run test:ui
```

### 3.3 Lancer les Tests en Mode Headless (sans interface)
```bash
npm run test
# ou
npm run cypress:headless
```

---

## Étape 4 : Exécuter les Tests

### 4.1 Tests de Navigation
```bash
# Lance uniquement les tests de navigation
npx cypress run --spec "cypress/e2e/navigation.cy.ts"
```

**Ce test vérifie :**
- Affichage de la page d'accueil
- Navigation vers toutes les pages (Produits, Services, À propos, Devis, Contact)
- Fonctionnement du logo

### 4.2 Tests des Produits
```bash
npx cypress run --spec "cypress/e2e/produits.cy.ts"
```

**Ce test vérifie :**
- Affichage de la liste des produits
- Filtrage par catégorie
- Ajout au panier
- Affichage des détails

### 4.3 Tests du Panier
```bash
npx cypress run --spec "cypress/e2e/panier.cy.ts"
```

**Ce test vérifie :**
- Ajout de plusieurs produits
- Modification des quantités
- Suppression de produits
- Calcul du total

### 4.4 Tests des Formulaires
```bash
npx cypress run --spec "cypress/e2e/formulaires.cy.ts"
```

**Ce test vérifie :**
- Validation des champs
- Soumission du formulaire de devis
- Soumission du formulaire de contact

### 4.5 Tests Responsive
```bash
npx cypress run --spec "cypress/e2e/responsive.cy.ts"
```

**Ce test vérifie :**
- Affichage sur mobile (iPhone X)
- Affichage sur tablette (iPad)
- Affichage sur desktop

### 4.6 Lancer TOUS les Tests
```bash
npm run test
```

---

## Étape 5 : Résultats des Tests

### Visualiser les Résultats
```
cypress/
├── videos/              ← Vidéos des tests
└── screenshots/         ← Captures d'écran des erreurs
```

### Rapport dans le Terminal
```bash
  Navigation du site ClimaControl
    ✓ Affiche la page d'accueil correctement (543ms)
    ✓ Peut naviguer vers la page Produits (321ms)
    ✓ Peut naviguer vers la page Services (298ms)
    ✓ Peut naviguer vers la page À propos (276ms)
    ✓ Peut naviguer vers la page Devis (312ms)
    ✓ Peut naviguer vers la page Contact (289ms)
    ✓ Le logo redirige vers l'accueil (301ms)

  7 passing (3s)
```

---

## Commandes Utiles

### Base de Données
```bash
# Sauvegarder la base de données
mysqldump -u root climacontrol > backup.sql

# Restaurer la base de données
mysql -u root climacontrol < backup.sql

# Réinitialiser la base de données
mysql -u root climacontrol < climacontrol.sql
```

### Next.js
```bash
# Démarrer en mode développement
npm run dev

# Construire pour la production
npm run build

# Lancer en mode production
npm run start
```

### Cypress
```bash
# Ouvrir l'interface Cypress
npm run cypress

# Lancer tous les tests
npm run test

# Lancer un test spécifique
npx cypress run --spec "cypress/e2e/navigation.cy.ts"

# Lancer les tests sur un navigateur spécifique
npx cypress run --browser chrome
npx cypress run --browser firefox
```

---

## Dépannage

### Problème : "Cannot connect to database"
**Solution :**
1. Vérifier que MySQL est démarré dans XAMPP
2. Vérifier que `.env.local` existe à la racine
3. Vérifier les identifiants dans `.env.local`
4. Tester : http://localhost:3000/api/test-db

### Problème : "Table doesn't exist"
**Solution :**
1. Réimporter climacontrol.sql dans phpMyAdmin
2. Vérifier dans phpMyAdmin que les tables existent

### Problème : "Port 3000 already in use"
**Solution :**
```bash
# Utiliser un autre port
npm run dev -- -p 3001
```

### Problème : Tests Cypress échouent
**Solution :**
1. Vérifier que le serveur Next.js tourne (npm run dev)
2. Vérifier que la base de données contient des produits
3. Nettoyer le cache : `npm run cypress -- --clear-cache`

---

## Prochaines Étapes

Une fois les tests passés en local :
1. Déployer sur Vercel (voir DEPLOIEMENT_VERCEL.md)
2. Connecter à la base de données Hostinger (voir INSTALLATION_HOSTINGER.md)
3. Configurer les tests CI/CD avec GitHub Actions

---

## Support

Pour toute question :
- Vérifier les logs dans la console du navigateur (F12)
- Vérifier les logs de Next.js dans le terminal
- Consulter la documentation Cypress : https://docs.cypress.io
