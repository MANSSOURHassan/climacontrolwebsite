# Installation Base de Données ClimaControl avec XAMPP

## Étape 1: Démarrer XAMPP

1. Ouvrez XAMPP Control Panel
2. Démarrez **Apache** et **MySQL**
3. Vérifiez que les deux sont en vert (Running)

## Étape 2: Importer la base de données

### Méthode 1: Via phpMyAdmin (Recommandé)

1. Ouvrez votre navigateur et allez sur: `http://localhost/phpmyadmin`
2. Cliquez sur l'onglet **"SQL"** en haut
3. Copiez tout le contenu du fichier `climacontrol.sql`
4. Collez-le dans la zone de texte
5. Cliquez sur le bouton **"Exécuter"** en bas à droite
6. Attendez que l'import se termine (vous verrez un message de succès)

### Méthode 2: Via Import de fichier

1. Ouvrez `http://localhost/phpmyadmin`
2. Cliquez sur l'onglet **"Importer"**
3. Cliquez sur **"Choisir un fichier"**
4. Sélectionnez le fichier `climacontrol.sql`
5. Cliquez sur **"Exécuter"**

## Étape 3: Vérifier l'installation

1. Dans phpMyAdmin, cherchez la base de données **"climacontrol"** dans la liste à gauche
2. Cliquez dessus
3. Vous devriez voir toutes les tables:
   - categories
   - produits
   - clients
   - devis
   - commandes
   - commande_lignes
   - interventions
   - contacts

4. Cliquez sur **"produits"** puis sur **"Afficher"** pour voir les 10 produits de test

## Étape 4: Identifiants de connexion

Pour connecter votre site à la base de données, utilisez ces paramètres:

```php
// Connexion locale XAMPP
$host = 'localhost';
$dbname = 'climacontrol';
$username = 'root';
$password = ''; // Laissez vide par défaut sur XAMPP
$port = 3306;
```

## Étape 5: Tester la connexion

Créez un fichier `test-db.php` dans `C:\xampp\htdocs\` avec ce contenu:

```php
<?php
$host = 'localhost';
$dbname = 'climacontrol';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "✅ Connexion réussie à la base de données ClimaControl!<br><br>";
    
    // Test: Compter les produits
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM produits");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "Nombre de produits en base: " . $result['total'];
    
} catch(PDOException $e) {
    echo "❌ Erreur de connexion: " . $e->getMessage();
}
?>
```

Puis visitez: `http://localhost/test-db.php`

## Données de test incluses

La base de données contient déjà:
- ✅ 6 catégories de produits
- ✅ 10 produits GREE et accessoires
- ✅ 1 client de test (email: client@example.com)
- ✅ Vues SQL pour statistiques
- ✅ Procédures stockées pour génération automatique de numéros de devis

## Problèmes courants

### Erreur "Table already exists"
- Solution: Supprimez d'abord la base de données `climacontrol` puis réimportez

### Erreur de connexion
- Vérifiez que MySQL est bien démarré dans XAMPP
- Vérifiez que le port 3306 n'est pas utilisé par un autre programme

### Import trop long
- L'import peut prendre 10-20 secondes, c'est normal
- Ne fermez pas la fenêtre pendant l'import

## Pour Hostinger

Quand vous serez prêt à mettre en ligne:

1. Créez une base de données MySQL dans le panneau Hostinger
2. Notez les identifiants fournis
3. Importez le même fichier `climacontrol.sql` via phpMyAdmin Hostinger
4. Changez les paramètres de connexion dans votre code

---

**Besoin d'aide?** Contactez-nous: climacontrol.clim@gmail.com
