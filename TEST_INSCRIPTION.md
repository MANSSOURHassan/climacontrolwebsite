# Guide de Test - Système d'Inscription et Connexion

## Prérequis

1. XAMPP démarré avec Apache et MySQL
2. Base de données `climacontrol` importée depuis `climacontrol.sql`
3. Site lancé avec `npm run dev` sur http://localhost:3000
4. Fichier `.env.local` configuré correctement

## Test 1 : Vérifier la connexion à la base de données

1. Ouvrez votre navigateur
2. Allez sur http://localhost:3000/api/test-db
3. Vous devriez voir :
   ```json
   {
     "success": true,
     "message": "Connexion à la base de données réussie",
     "database": "climacontrol",
     "productsCount": 10
   }
   ```

Si vous voyez une erreur 500, vérifiez :
- MySQL est démarré dans XAMPP
- La base de données existe dans phpMyAdmin
- Les identifiants dans `.env.local` sont corrects

## Test 2 : Créer un nouveau compte

1. Allez sur http://localhost:3000/compte
2. Cliquez sur l'onglet "Inscription"
3. Remplissez le formulaire :
   - Prénom : Test
   - Nom : Utilisateur
   - Email : test@exemple.com
   - Mot de passe : motdepasse123
   - Confirmer : motdepasse123
4. Cliquez sur "Créer mon compte"
5. Vous devriez voir une notification verte : "Compte créé avec succès !"

## Test 3 : Se connecter

1. Restez sur http://localhost:3000/compte
2. Cliquez sur l'onglet "Connexion"
3. Entrez :
   - Email : test@exemple.com
   - Mot de passe : motdepasse123
4. Cliquez sur "Se connecter"
5. Vous devriez être redirigé vers http://localhost:3000/compte/dashboard
6. Vous verrez votre tableau de bord avec "Bonjour Test Utilisateur"

## Test 4 : Vérifier dans la base de données

1. Ouvrez http://localhost/phpmyadmin
2. Sélectionnez la base `climacontrol`
3. Cliquez sur la table `clients`
4. Vous devriez voir votre nouveau compte dans la liste

## Cas d'erreurs à tester

### Email déjà utilisé
1. Essayez de créer un compte avec test@exemple.com
2. Vous devriez voir : "Cet email est déjà utilisé"

### Mots de passe différents
1. Inscription avec mot de passe différent de la confirmation
2. Vous devriez voir : "Les mots de passe ne correspondent pas"

### Mot de passe trop court
1. Essayez un mot de passe de moins de 8 caractères
2. Vous devriez voir : "Le mot de passe doit contenir au moins 8 caractères"

### Mauvais identifiants
1. Connexion avec un mauvais mot de passe
2. Vous devriez voir : "Email ou mot de passe incorrect"

## Dépannage

### Erreur : "Cannot find module 'bcryptjs'"
```bash
npm install bcryptjs @types/bcryptjs
```

### Erreur : "Cannot find module 'zod'"
```bash
npm install zod
```

### Erreur 500 sur /api/auth/register
Vérifiez la console du terminal pour voir l'erreur exacte. Souvent :
- Base de données pas accessible
- Table `clients` n'existe pas
- Variables d'environnement incorrectes

### Le bouton ne fait rien
1. Ouvrez la console du navigateur (F12)
2. Regardez les erreurs JavaScript
3. Vérifiez que le fichier `compte-client.tsx` est bien utilisé

## Tests Cypress automatisés

Pour lancer tous les tests automatiquement :

```bash
npm run cypress:open
```

Sélectionnez le test `auth.cy.ts` pour tester l'authentification complète.
