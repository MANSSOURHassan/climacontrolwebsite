# Base de Données ClimaControl

## Installation en Local

### 1. Prérequis
- MySQL 5.7+ ou MariaDB 10.3+
- phpMyAdmin ou MySQL Workbench (optionnel)
- XAMPP, WAMP, ou MAMP (pour environnement local)

### 2. Import de la base de données

#### Via phpMyAdmin:
1. Ouvrez phpMyAdmin dans votre navigateur (http://localhost/phpmyadmin)
2. Cliquez sur "Nouveau" pour créer une base de données
3. Nommez-la `climacontrol`
4. Sélectionnez l'encodage `utf8mb4_unicode_ci`
5. Cliquez sur l'onglet "Importer"
6. Choisissez le fichier `climacontrol.sql`
7. Cliquez sur "Exécuter"

#### Via ligne de commande:
```bash
# Connexion à MySQL
mysql -u root -p

# Création et import
CREATE DATABASE climacontrol CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE climacontrol;
SOURCE /chemin/vers/climacontrol.sql;
```

### 3. Configuration de connexion

#### Paramètres locaux:
```
Host: localhost
Database: climacontrol
Username: root
Password: (votre mot de passe MySQL)
Port: 3306
```

## Installation sur Hostinger

### 1. Créer la base de données
1. Connectez-vous à votre panneau Hostinger (hPanel)
2. Allez dans "Bases de données MySQL"
3. Cliquez sur "Créer une nouvelle base de données"
4. Notez les informations fournies:
   - Nom de la base
   - Nom d'utilisateur
   - Mot de passe
   - Hôte (généralement: localhost ou une IP)

### 2. Importer la base
1. Dans hPanel, cliquez sur "phpMyAdmin" à côté de votre base
2. Sélectionnez votre base de données dans le menu gauche
3. Cliquez sur "Importer"
4. Choisissez `climacontrol.sql`
5. Cliquez sur "Exécuter"

### 3. Configuration PHP pour Hostinger
Créez un fichier `config.php`:

```php
<?php
// Configuration Hostinger
define('DB_HOST', 'localhost'); // ou l'hôte fourni par Hostinger
define('DB_NAME', 'u123456789_climacontrol'); // votre nom de base
define('DB_USER', 'u123456789_admin'); // votre utilisateur
define('DB_PASS', 'VotreMotDePasse'); // votre mot de passe
define('DB_CHARSET', 'utf8mb4');

try {
    $pdo = new PDO(
        "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=".DB_CHARSET,
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );
} catch(PDOException $e) {
    die("Erreur de connexion: " . $e->getMessage());
}
?>
```

## Structure de la Base

### Tables principales:
- **categories** - Catégories de produits
- **produits** - Catalogue complet
- **clients** - Informations clients
- **devis** - Demandes et devis envoyés
- **commandes** - Commandes clients
- **commande_lignes** - Détails des commandes
- **interventions** - Planning des installations/entretiens
- **contacts** - Messages du formulaire de contact

### Vues:
- **v_stats_produits** - Statistiques par catégorie
- **v_devis_en_attente** - Devis nécessitant un suivi

## Données de Test

Un client de test est inclus:
- Email: client@example.com
- Mot de passe: climacontrol2024

10 produits GREE et accessoires sont pré-chargés dans 6 catégories.

## Maintenance

### Sauvegarde régulière:
```bash
mysqldump -u root -p climacontrol > backup_climacontrol_$(date +%Y%m%d).sql
```

### Optimisation:
```sql
OPTIMIZE TABLE produits, commandes, devis;
ANALYZE TABLE produits, clients;
```

## Support

Pour toute question sur la base de données, contactez:
- Email: climacontrol.clim@gmail.com
- Tél: 04 67 20 04 44
