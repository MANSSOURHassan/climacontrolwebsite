# Checklist de Déploiement ClimaControl

## Avant le Déploiement

- [ ] Base de données MySQL créée sur Hostinger
- [ ] Fichier `climacontrol.sql` prêt à être importé
- [ ] Accès à hPanel Hostinger
- [ ] Compte Vercel créé (ou connecté via v0)

## Pendant le Déploiement

### Sur v0
- [ ] Cliquer sur "Publish" en haut à droite
- [ ] Connecter GitHub
- [ ] Choisir le nom du repository
- [ ] Attendre la fin du déploiement

### Sur Hostinger
- [ ] Aller dans hPanel → Bases de données
- [ ] Créer/Sélectionner la base `climacontrol`
- [ ] Importer `climacontrol.sql` via phpMyAdmin
- [ ] Vérifier que toutes les tables sont créées
- [ ] Activer l'accès distant MySQL
- [ ] Noter les identifiants de connexion

### Sur Vercel
- [ ] Aller dans Settings → Environment Variables
- [ ] Ajouter `DATABASE_HOST`
- [ ] Ajouter `DATABASE_USER`
- [ ] Ajouter `DATABASE_PASSWORD`
- [ ] Ajouter `DATABASE_NAME`
- [ ] Ajouter `DATABASE_PORT` (3306)
- [ ] Redéployer le projet

## Après le Déploiement

### Tests
- [ ] Visiter la page d'accueil
- [ ] Tester `/api/test-db`
- [ ] Vérifier que les produits s'affichent
- [ ] Tester le formulaire de contact
- [ ] Tester le formulaire de devis
- [ ] Vérifier le panier d'achat
- [ ] Tester sur mobile

### Vérifications Base de Données
- [ ] Les produits sont visibles sur `/produits`
- [ ] Les formulaires enregistrent dans la BDD
- [ ] Les devis sont créés avec numéro automatique

### Performance
- [ ] Toutes les pages se chargent rapidement
- [ ] Les images s'affichent correctement
- [ ] Pas d'erreurs dans la console

## Configuration Optionnelle

- [ ] Configurer un domaine personnalisé
- [ ] Activer Analytics Vercel
- [ ] Configurer les emails (SMTP)
- [ ] Ajouter Google Analytics
- [ ] Configurer le sitemap SEO

## URLs à Tester

Remplacez `votre-site` par votre URL Vercel :

- [ ] `https://votre-site.vercel.app/`
- [ ] `https://votre-site.vercel.app/produits`
- [ ] `https://votre-site.vercel.app/services`
- [ ] `https://votre-site.vercel.app/devis`
- [ ] `https://votre-site.vercel.app/contact`
- [ ] `https://votre-site.vercel.app/api/test-db`
- [ ] `https://votre-site.vercel.app/api/produits`

## Dépannage

### Si la connexion DB échoue :
1. Vérifier les variables d'environnement Vercel
2. Tester phpMyAdmin sur Hostinger
3. Vérifier l'accès distant MySQL
4. Consulter les logs Vercel

### Si les produits ne s'affichent pas :
1. Vérifier que la BDD est importée
2. Tester `/api/produits` directement
3. Vérifier les logs d'erreur

## Contact Support

- **Vercel** : https://vercel.com/help
- **Hostinger** : Support via hPanel
- **Documentation** : Voir `DEPLOIEMENT_VERCEL.md`
