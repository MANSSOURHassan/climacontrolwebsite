# Tester la connexion XAMPP étape par étape

## Prérequis
- XAMPP installé
- Base de données importée
- Fichier `.env.local` configuré

## Test 1 : XAMPP fonctionne

### Vérifier que MySQL démarre
1. Ouvrez XAMPP Control Panel
2. Cliquez sur **Start** pour MySQL
3. Le statut doit être vert avec "Running"

### Vérifier phpMyAdmin
1. Ouvrez http://localhost/phpmyadmin
2. Vous devriez voir l'interface phpMyAdmin
3. Cherchez la base de données `climacontrol` dans la liste à gauche

## Test 2 : Base de données importée

### Vérifier les tables
Dans phpMyAdmin, cliquez sur `climacontrol`, vous devriez voir :
- ✅ categories
- ✅ clients  
- ✅ commandes
- ✅ commande_produits
- ✅ devis
- ✅ devis_produits
- ✅ interventions
- ✅ produits

### Vérifier les données de test
Cliquez sur `produits` → Onglet "Afficher" (Browse)
Vous devriez voir 10 produits GREE.

## Test 3 : Site Next.js connecté

### Installer les dépendances
```bash
cd votre-projet-climacontrol
npm install
```

### Démarrer le serveur
```bash
npm run dev
```

Vous devriez voir :
```
Ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Tester l'API de connexion
Ouvrez dans votre navigateur :
http://localhost:3000/api/test-db

**Résultat attendu :**
```json
{
  "success": true,
  "message": "Database connected successfully",
  "database": "climacontrol",
  "tables": 8
}
```

**Si erreur :**
```json
{
  "success": false,
  "error": "connect ECONNREFUSED 127.0.0.1:3306"
}
```
→ MySQL n'est pas démarré dans XAMPP

## Test 4 : Pages du site

Testez ces URLs :
- http://localhost:3000 → Page d'accueil
- http://localhost:3000/produits → Liste des produits
- http://localhost:3000/api/produits → API produits (JSON)

## Test 5 : Cypress

### Installation Cypress
```bash
npm install --save-dev cypress @testing-library/cypress
```

### Lancer Cypress en mode interface
```bash
npm run cypress:open
```

### Lancer les tests en ligne de commande
```bash
npm run cypress:run
```

## Codes d'erreur courants

### Erreur : "Cannot connect to database"
**Cause :** MySQL pas démarré
**Solution :** Démarrez MySQL dans XAMPP Control Panel

### Erreur : "Access denied for user 'root'@'localhost'"
**Cause :** Mauvais mot de passe
**Solution :** Vérifiez DB_PASSWORD dans `.env.local`

### Erreur : "Unknown database 'climacontrol'"
**Cause :** Base de données pas importée
**Solution :** Importez `climacontrol.sql` dans phpMyAdmin

### Erreur : "Port 3000 already in use"
**Cause :** Un autre serveur utilise le port 3000
**Solution :** 
```bash
# Arrêtez l'autre serveur ou utilisez un autre port
npm run dev -- -p 3001
```

### Erreur : "Cannot find module 'mysql2'"
**Cause :** Dépendances pas installées
**Solution :**
```bash
npm install mysql2
```

## Checklist complète

- [ ] XAMPP installé
- [ ] MySQL démarré (vert dans XAMPP)
- [ ] phpMyAdmin accessible (http://localhost/phpmyadmin)
- [ ] Base de données `climacontrol` créée
- [ ] Tables importées (8 tables)
- [ ] Données de test présentes (10 produits)
- [ ] Fichier `.env.local` créé à la racine
- [ ] `npm install` exécuté
- [ ] `npm run dev` fonctionne
- [ ] http://localhost:3000/api/test-db retourne success
- [ ] Pages du site accessibles
- [ ] Cypress installé (optionnel)

## Aide supplémentaire

Si tous les tests échouent, vérifiez :

1. **Node.js installé ?**
   ```bash
   node --version
   # Doit afficher v18 ou plus récent
   ```

2. **Dans le bon dossier ?**
   ```bash
   # Doit contenir package.json
   ls package.json
   ```

3. **Port 3306 disponible ?**
   Vérifiez qu'aucun autre MySQL ne tourne sur votre machine.

4. **Permissions fichier ?**
   Le fichier `.env.local` doit être lisible (pas de problème de droits).
