# 🚀 Installation Base de Données sur Hostinger

Guide complet pour configurer la base de données ClimaControl sur votre hébergement Hostinger.

---

## 📋 Prérequis

- Compte Hostinger actif avec hébergement web
- Accès au panneau de contrôle Hostinger (hPanel)
- Fichier `climacontrol.sql` (à la racine du projet)

---

## 🗄️ ÉTAPE 1 : Créer la Base de Données sur Hostinger

### 1.1 Accéder à hPanel
1. Connectez-vous à votre compte Hostinger
2. Accédez au **hPanel** (panneau de contrôle)
3. Cherchez la section **Bases de données**

### 1.2 Créer une nouvelle base de données
1. Cliquez sur **Bases de données MySQL**
2. Cliquez sur **Créer une nouvelle base de données**
3. Remplissez les informations :
   - **Nom de la base** : `climacontrol` (ou selon vos préférences)
   - **Nom d'utilisateur** : Créez un utilisateur (ex: `clima_admin`)
   - **Mot de passe** : Créez un mot de passe fort
4. Cliquez sur **Créer**

### 1.3 Noter les informations de connexion
**⚠️ IMPORTANT** : Notez ces informations, vous en aurez besoin :
```
Hôte : localhost (ou l'adresse fournie par Hostinger)
Nom de la base : climacontrol (ou le nom que vous avez choisi)
Utilisateur : clima_admin (votre nom d'utilisateur)
Mot de passe : ******** (votre mot de passe)
Port : 3306 (par défaut)
```

---

## 📥 ÉTAPE 2 : Importer le Fichier SQL

### 2.1 Via phpMyAdmin (Recommandé)
1. Dans hPanel, cliquez sur **phpMyAdmin** (section Bases de données)
2. Connectez-vous avec vos identifiants
3. Sélectionnez votre base de données `climacontrol` dans le menu gauche
4. Cliquez sur l'onglet **Importer**
5. Cliquez sur **Choisir un fichier**
6. Sélectionnez le fichier `climacontrol.sql`
7. Laissez les options par défaut
8. Cliquez sur **Exécuter** en bas de page

### 2.2 Vérifier l'importation
Après l'importation, vous devriez voir :
- ✅ Message de succès
- ✅ 10 tables créées (produits, categories, clients, devis, etc.)
- ✅ Données de test insérées (produits GREE, catégories)

**Liste des tables créées :**
```
- categories
- produits
- clients
- devis
- devis_lignes
- commandes
- commande_lignes
- interventions
- utilisateurs
- parametres
```

---

## 🔧 ÉTAPE 3 : Configurer Next.js

### 3.1 Créer le fichier .env.local
À la racine de votre projet Next.js, créez un fichier `.env.local` :

```bash
# Base de données Hostinger
DB_HOST=localhost
DB_PORT=3306
DB_NAME=climacontrol
DB_USER=clima_admin
DB_PASSWORD=votre_mot_de_passe_ici

# URL du site (pour production)
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

**⚠️ Remplacez** les valeurs par vos informations réelles Hostinger !

### 3.2 Installer les dépendances
```bash
npm install mysql2
# ou
yarn add mysql2
```

---

## 🌐 ÉTAPE 4 : Déployer sur Hostinger

### 4.1 Préparer le projet
```bash
# Build du projet Next.js
npm run build

# Ou avec yarn
yarn build
```

### 4.2 Télécharger les fichiers
1. Connectez-vous à hPanel
2. Accédez au **Gestionnaire de fichiers**
3. Naviguez vers le dossier `public_html`
4. Téléchargez tous les fichiers du projet :
   - Dossier `.next`
   - Dossier `public`
   - Fichiers `package.json`, `next.config.mjs`, etc.

### 4.3 Configurer les variables d'environnement
Dans hPanel :
1. Allez dans **Variables d'environnement**
2. Ajoutez les mêmes variables que dans `.env.local`

---

## 🔌 ÉTAPE 5 : Tester la Connexion

### 5.1 Créer une page de test
Créez `app/api/test-db/route.ts` pour tester la connexion :

```typescript
import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const result = await query('SELECT COUNT(*) as count FROM produits')
    return NextResponse.json({ 
      success: true, 
      message: 'Connexion réussie !',
      produits: result[0].count 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}
```

### 5.2 Tester
Accédez à : `https://votre-domaine.com/api/test-db`

Résultat attendu :
```json
{
  "success": true,
  "message": "Connexion réussie !",
  "produits": 10
}
```

---

## 🛠️ Dépannage

### Problème : "Access denied for user"
**Solution :** Vérifiez les identifiants dans `.env.local`

### Problème : "Can't connect to MySQL server"
**Solution :** Vérifiez que `DB_HOST` est correct (parfois ce n'est pas `localhost` chez Hostinger)

### Problème : "Table doesn't exist"
**Solution :** Réimportez le fichier SQL dans phpMyAdmin

### Problème : Variables d'environnement non reconnues
**Solution :** 
1. Vérifiez le fichier `.env.local`
2. Redémarrez le serveur Next.js
3. Pour la production, ajoutez les variables dans hPanel

---

## 📞 Support

Si vous rencontrez des problèmes :
1. **Support Hostinger** : Chat en direct disponible 24/7
2. **Documentation Hostinger** : https://support.hostinger.com/fr/
3. Vérifiez que MySQL est activé dans votre plan d'hébergement

---

## ✅ Checklist Finale

- [ ] Base de données créée sur Hostinger
- [ ] Fichier SQL importé avec succès
- [ ] 10 tables visibles dans phpMyAdmin
- [ ] Variables d'environnement configurées
- [ ] Fichier `.env.local` créé
- [ ] Package `mysql2` installé
- [ ] Test de connexion réussi
- [ ] Site déployé et fonctionnel

**🎉 Félicitations ! Votre base de données est maintenant connectée !**
