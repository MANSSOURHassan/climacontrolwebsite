# 🚀 Guide de Déploiement Vercel pour ClimaControl

Ce guide explique comment mettre votre site Next.js en ligne gratuitement et rapidement avec Vercel.

## Prérequis

1. Avoir un compte sur [Vercel.com](https://vercel.com/signup).
2. Avoir Node.js installé sur votre ordinateur.

---

## Méthode 1 : Déploiement Automatique via GitHub (Recommandé)

C'est la méthode professionnelle. Votre site se mettra à jour automatiquement à chaque fois que vous sauvegardez votre code sur GitHub.

### Étape 1 : Mettre le code sur GitHub
1. Connectez-vous à [GitHub](https://github.com) et créez un nouveau "Repository" (public ou privé).
2. Dans votre terminal VS Code, exécutez les commandes suivantes :

```bash
# Initialiser git si ce n'est pas fait
git init

# Ajouter tous les fichiers
git add .

# Enregistrer les modifications
git commit -m "Version initiale du site"

# Créer la branche principale
git branch -M main

# Relier à votre dépôt GitHub (remplacez l'URL par la vôtre)
git remote add origin https://github.com/VOTRE_UTILISATEUR/clima-control.git

# Envoyer le code
git push -u origin main
```

### Étape 2 : Connecter Vercel
1. Allez sur votre [Dashboard Vercel](https://vercel.com/dashboard).
2. Cliquez sur le bouton **"Add New..."** puis **"Project"**.
3. Dans la liste "Import Git Repository", trouvez votre projet `clima-control` et cliquez sur **"Import"**.

### Étape 3 : Configurer et Lancer
1. **Project Name** : Laissez tel quel ou changez pour `climacontrol-34` (par exemple).
2. **Framework Preset** : Next.js (doit être détecté automatiquement).
3. **Root Directory** : `./` (laissez vide).
4. Cliquez sur **"Deploy"**.

Attendez que les confettis apparaissent ! Votre site est en ligne. 🎊

---

## Méthode 2 : Déploiement Manuel (CLI)

Idéal pour tester rapidement sans passer par GitHub.

1. **Installer l'outil Vercel** (une seule fois) :
   ```bash
   npm install -g vercel
   ```

2. **Se connecter à votre compte** :
   ```bash
   vercel login
   ```

3. **Déployer le site** :
   ```bash
   vercel
   ```
   Répondez aux questions (faites "Entrée" pour tout accepter par défaut).

4. **Mise à jour en production** :
   Quand vous avez fait des modifications et voulez mettre à jour le site officiel :
   ```bash
   vercel --prod
   ```

---

## 🌐 Configurer un nom de domaine (ex: climacontrol.fr)

Une fois le site en ligne sur Vercel :

1. Allez dans votre projet sur Vercel > **Settings** > **Domains**.
2. Entrez votre nom de domaine (ex: `climacontrol.fr`).
3. Si vous avez acheté le domaine chez OVH :
   - Vercel vous donnera des **DNS Records** (Type A et CNAME).
   - Allez sur votre compte OVH > Zone DNS.
   - Ajoutez les enregistrements fournis par Vercel.
4. Attendez quelques heures (propagation DNS) et votre site sera accessible via votre vrai nom de domaine avec HTTPS sécurisé !
