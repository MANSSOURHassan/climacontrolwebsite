# Guide de Résolution - Problème d'Inscription

## Diagnostic Automatique

Visitez cette URL pour un diagnostic complet :
**http://localhost:3000/api/diagnostic**

Cette page va vérifier automatiquement :
- ✓ Variables d'environnement
- ✓ Connexion MySQL
- ✓ Existence de la base de données
- ✓ Existence de la table clients
- ✓ Structure de la table
- ✓ Modules Node.js requis

---

## Étapes de Résolution Pas à Pas

### Étape 1 : Vérifier XAMPP

1. **Ouvrir le panneau de contrôle XAMPP**
2. **Démarrer MySQL** (le bouton doit être vert)
3. **Cliquer sur "Admin"** à côté de MySQL pour ouvrir phpMyAdmin

### Étape 2 : Vérifier la Base de Données

Dans phpMyAdmin :

1. **Regarder la liste des bases de données à gauche**
2. **Cherchez "climacontrol"**

**Si elle n'existe PAS** :
- Cliquez sur "Importer" en haut
- Cliquez sur "Choisir un fichier"
- Sélectionnez le fichier `climacontrol.sql` à la racine de votre projet
- Cliquez sur "Exécuter" en bas
- Attendez le message "Importation réussie"

**Si elle existe DÉJÀ** :
- Cliquez sur "climacontrol" dans la liste à gauche
- Vérifiez que la table "clients" existe dans la liste des tables
- Si elle manque, réimportez climacontrol.sql

### Étape 3 : Vérifier le Fichier .env.local

Le fichier doit être à la racine du projet et contenir :

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=climacontrol
DB_USER=root
DB_PASSWORD=
```

**IMPORTANT** : `DB_PASSWORD` doit être vide (rien après le =) pour XAMPP par défaut

### Étape 4 : Redémarrer le Serveur Next.js

Dans le terminal :
1. Appuyez sur `Ctrl+C` pour arrêter le serveur
2. Tapez `npm run dev` pour redémarrer
3. Attendez "Ready in X ms"

### Étape 5 : Tester l'Inscription

1. Allez sur http://localhost:3000/compte
2. Remplissez le formulaire d'inscription
3. Cliquez sur "Créer un compte"

**Regardez le terminal** - Vous devriez voir :
```
[v0] Tentative d'inscription: {...}
[v0] Données validées
[v0] Vérification email existant: []
[v0] Mot de passe hashé
[v0] Client créé, résultat: { insertId: 1 }
```

---

## Messages d'Erreur Courants

### Erreur: "ECONNREFUSED"
**Cause** : MySQL n'est pas démarré dans XAMPP
**Solution** : Ouvrez XAMPP et cliquez sur "Start" pour MySQL

### Erreur: "ER_BAD_DB_ERROR: Unknown database 'climacontrol'"
**Cause** : La base de données n'existe pas
**Solution** : Importez climacontrol.sql dans phpMyAdmin

### Erreur: "ER_NO_SUCH_TABLE: Table 'climacontrol.clients' doesn't exist"
**Cause** : La table clients n'a pas été créée
**Solution** : Réimportez climacontrol.sql

### Erreur: "Cannot find module 'bcryptjs'"
**Cause** : Module manquant
**Solution** : Exécutez `npm install bcryptjs`

### Erreur: "Cet email est déjà utilisé"
**Cause** : Normal - vous essayez de créer un compte avec un email déjà enregistré
**Solution** : Utilisez un autre email

---

## Vérification Finale

Après avoir suivi toutes les étapes :

1. **Visitez** : http://localhost:3000/api/diagnostic
2. **Tous les tests doivent être "OK"**
3. **Réessayez l'inscription**

Si tous les tests sont OK mais l'inscription échoue encore, regardez les logs détaillés dans le terminal pour voir exactement où ça bloque.

---

## Besoin d'Aide ?

Si le problème persiste après avoir suivi ce guide :
1. Visitez http://localhost:3000/api/diagnostic
2. Copiez le résultat JSON complet
3. Regardez les logs du terminal après avoir tenté l'inscription
4. Ces informations permettront de diagnostiquer le problème exact
