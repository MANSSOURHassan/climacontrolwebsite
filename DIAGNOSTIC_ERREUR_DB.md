# 🔍 Diagnostic des Erreurs de Base de Données

## L'erreur 500 sur /api/test-db peut avoir plusieurs causes

### 1. ⚠️ Module mysql2 non installé

**Symptôme :** `Cannot find module 'mysql2'`

**Solution :**
```bash
npm install mysql2
```

Puis redémarrez le serveur :
```bash
npm run dev
```

---

### 2. 🔴 XAMPP MySQL pas démarré

**Symptôme :** `ENOTFOUND` ou `ECONNREFUSED`

**Solution :**
1. Ouvrez XAMPP Control Panel
2. Cliquez sur "Start" à côté de **MySQL** (pas seulement Apache)
3. Vérifiez que MySQL est bien en vert "Running"

---

### 3. 📦 Base de données pas importée

**Symptôme :** `ER_BAD_DB_ERROR: Unknown database 'climacontrol'`

**Solution :**
1. Ouvrez http://localhost/phpmyadmin
2. Cliquez sur "Importer" dans le menu du haut
3. Cliquez sur "Choisir un fichier"
4. Sélectionnez `climacontrol.sql` à la racine du projet
5. Cliquez sur "Exécuter" en bas de page
6. Attendez le message "Importation réussie"

---

### 4. 📋 Tables manquantes

**Symptôme :** `ER_NO_SUCH_TABLE: Table 'climacontrol.produits' doesn't exist`

**Solution :**
La base de données existe mais les tables n'ont pas été créées. Réimportez le fichier SQL complet :
1. Dans phpMyAdmin, sélectionnez la base `climacontrol`
2. Cliquez sur "Opérations" > "Supprimer la base de données"
3. Réimportez le fichier `climacontrol.sql` complètement

---

### 5. 🔐 Problème d'accès

**Symptôme :** `ER_ACCESS_DENIED_ERROR`

**Solution :**
Vérifiez votre fichier `.env.local` :
```env
DB_USER=root
DB_PASSWORD=        # Doit être vide pour XAMPP par défaut
```

---

### 6. ⚙️ Variables d'environnement mal chargées

**Solution :**
1. Vérifiez que le fichier `.env.local` est bien à la **racine du projet**
2. Redémarrez complètement le serveur Next.js :
   - Arrêtez avec `Ctrl+C`
   - Relancez avec `npm run dev`

---

## 🧪 Tester la connexion

Après avoir corrigé le problème, testez à nouveau :

```
http://localhost:3000/api/test-db
```

**Résultat attendu :**
```json
{
  "success": true,
  "message": "✅ Connexion à la base de données réussie !",
  "statistics": {
    "produits": 10,
    "categories": 4
  }
}
```

---

## 📊 Vérifier dans phpMyAdmin

Pour confirmer que tout est OK :

1. Allez sur http://localhost/phpmyadmin
2. Cliquez sur `climacontrol` à gauche
3. Vous devriez voir ces tables :
   - ✅ categories
   - ✅ produits
   - ✅ clients
   - ✅ devis
   - ✅ devis_items
   - ✅ commandes
   - ✅ commande_items
   - ✅ interventions

4. Cliquez sur `produits` > "Parcourir"
5. Vous devriez voir 10 produits GREE

---

## 🆘 Toujours bloqué ?

Vérifiez les logs dans votre terminal. Cherchez les lignes commençant par `[v0]` qui donnent des informations détaillées sur l'erreur.
