# 🔧 Solution : Variables d'environnement non chargées

## Le problème

Erreur : `Access denied for user ''@'localhost' (using password: NO)`

Cela signifie que Next.js ne lit pas le fichier `.env.local`.

---

## ✅ SOLUTION EN 3 ÉTAPES

### Étape 1 : Vérifier que `.env.local` existe

Le fichier doit être à la **racine du projet** (même niveau que `package.json`) :

```
clima-control-e-commerce-website/
├── .env.local          ← ICI
├── package.json
├── next.config.mjs
├── app/
└── lib/
```

### Étape 2 : Vérifier le contenu de `.env.local`

Ouvrez `.env.local` et assurez-vous qu'il contient :

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=climacontrol
DB_USER=root
DB_PASSWORD=
```

**Important :** `DB_PASSWORD=` peut être vide pour XAMPP par défaut.

### Étape 3 : REDÉMARRER le serveur Next.js

C'est l'étape la plus importante ! Next.js ne recharge pas `.env.local` automatiquement.

**Dans le terminal :**

1. **Arrêter le serveur** → Appuyez sur `Ctrl + C`
2. **Redémarrer** → Tapez `npm run dev`
3. **Attendre** → Le message "Ready in X.Xs" doit apparaître

---

## 🧪 Tester après redémarrage

### Test 1 : Vérifier les logs de débogage

Dans le terminal, vous devriez maintenant voir :

```
[v0] Configuration DB: {
  host: 'localhost',
  port: '3306',
  user: 'root',
  database: 'climacontrol',
  hasPassword: false
}
```

Si vous voyez `user: 'PAS DÉFINI'`, les variables ne sont toujours pas chargées.

### Test 2 : Tester l'API de diagnostic

Allez sur : http://localhost:3000/api/diagnostic

Vous devriez voir tous les tests en ✅

### Test 3 : Réessayer l'inscription

Allez sur : http://localhost:3000/compte

Créez un compte. Ça devrait fonctionner maintenant !

---

## 🚨 Si ça ne fonctionne toujours pas

### Problème 1 : MySQL non démarré dans XAMPP

**Solution :**
1. Ouvrez XAMPP Control Panel
2. Cliquez sur "Start" pour MySQL
3. Le bouton doit devenir vert

### Problème 2 : Base de données pas importée

**Solution :**
1. Allez sur http://localhost/phpmyadmin
2. Cliquez sur "Importer"
3. Sélectionnez `climacontrol.sql`
4. Cliquez sur "Exécuter"

### Problème 3 : Port MySQL différent

**Solution :**
Dans XAMPP, vérifiez le port MySQL (Config > my.ini), cherchez `port=`.
Si ce n'est pas 3306, modifiez dans `.env.local` :

```env
DB_PORT=3307
```

Puis redémarrez Next.js.

---

## 📝 Checklist finale

- [ ] Le fichier `.env.local` existe à la racine
- [ ] Les variables `DB_*` sont définies correctement
- [ ] MySQL est démarré dans XAMPP (voyant vert)
- [ ] La base de données `climacontrol` existe dans phpMyAdmin
- [ ] Next.js a été **redémarré** après modification de `.env.local`
- [ ] Les logs `[v0] Configuration DB` s'affichent correctement
- [ ] L'API `/api/diagnostic` retourne tous les tests en ✅

Si tous ces points sont cochés, l'inscription devrait fonctionner !
