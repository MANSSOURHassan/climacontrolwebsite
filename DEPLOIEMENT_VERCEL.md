# Guide de Déploiement sur Vercel (Version Supabase)

Ce projet utilise désormais **Supabase** pour la base de données et l'authentification. Voici la procédure mise à jour pour le déploiement.

## Étape 1 : Préparer votre repository GitHub

1. **Créez un nouveau repository** sur votre compte GitHub (ex: `clima-control-website`).
2. **Poussez votre code** local vers ce repository :
   ```bash
   git add .
   git commit -m "Prêt pour le déploiement"
   git branch -M main
   git remote add origin https://github.com/VOTRE_USER/clima-control-website.git
   git push -u origin main
   ```

## Étape 2 : Créer le projet sur Vercel

1. Connectez-vous sur [Vercel](https://vercel.com).
2. Cliquez sur **"Add New"** → **"Project"**.
3. Importez votre repository GitHub `clima-control-website`.

## Étape 3 : Configurer les Variables d'Environnement

Avant de cliquer sur "Deploy", développez la section **Environment Variables** et ajoutez les clés suivantes (que vous trouverez dans votre fichier `.env.local`) :

| Clé | Valeur |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xppmoeaktthzqoqthzom.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (Copiez la clé complète) |

## Étape 4 : Déploiement

1. Cliquez sur **Deploy**.
2. Attendez que Vercel termine la compilation (build).
3. Votre site sera accessible sur une URL du type `https://clima-control-website.vercel.app`.

---

## Pourquoi Supabase plutôt que MySQL ?

- **Serveur Serverless** : Pas besoin de gérer un serveur distant ou des accès IP.
- **Vitesse** : Les requêtes sont beaucoup plus rapides depuis les fonctions Vercel.
- **Sécurité** : Gestion native de l'authentification et des clés API.

## Troubleshooting

- **Erreur de build** : Vérifiez que toutes vos images sont présentes dans `/public`.
- **Pages 404** : Assurez-vous que votre route produit `app/produits/[id]/page.tsx` ne tente pas de charger des fichiers inexistants (le correctif a déjà été appliqué).
- **Images manquantes** : Si le logo ne s'affiche pas, vérifiez que l'extension est bien `.jpg` (comme configuré dans le code).
