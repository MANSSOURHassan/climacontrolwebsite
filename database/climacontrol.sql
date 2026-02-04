-- ================================================
-- Base de données ClimaControl
-- Système de gestion pour site e-commerce climatisation
-- Compatible MySQL 5.7+ / MariaDB 10.3+
-- ================================================

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS climacontrol CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE climacontrol;

-- ================================================
-- Table: categories
-- Catégories de produits (Climatisation, Chauffage, PAC, etc.)
-- ================================================
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  image_url VARCHAR(255),
  ordre INT DEFAULT 0,
  actif BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================
-- Table: produits
-- Catalogue de produits ClimaControl
-- ================================================
CREATE TABLE IF NOT EXISTS produits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  categorie_id INT NOT NULL,
  nom VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  reference VARCHAR(50),
  marque VARCHAR(50) DEFAULT 'GREE',
  description TEXT,
  caracteristiques JSON,
  puissance VARCHAR(50),
  prix_ht DECIMAL(10,2),
  prix_ttc DECIMAL(10,2),
  stock INT DEFAULT 0,
  image_principale VARCHAR(255),
  images_supplementaires JSON,
  en_vedette BOOLEAN DEFAULT FALSE,
  actif BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE CASCADE,
  INDEX idx_categorie (categorie_id),
  INDEX idx_slug (slug),
  INDEX idx_actif (actif)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================
-- Table: clients
-- Informations clients
-- ================================================
CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255),
  prenom VARCHAR(100),
  nom VARCHAR(100),
  telephone VARCHAR(20),
  adresse TEXT,
  code_postal VARCHAR(10),
  ville VARCHAR(100),
  type_client ENUM('particulier', 'professionnel') DEFAULT 'particulier',
  siret VARCHAR(14),
  actif BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================
-- Table: devis
-- Demandes de devis
-- ================================================
CREATE TABLE IF NOT EXISTS devis (
  id INT AUTO_INCREMENT PRIMARY KEY,
  numero_devis VARCHAR(50) NOT NULL UNIQUE,
  client_id INT,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telephone VARCHAR(20) NOT NULL,
  adresse TEXT,
  code_postal VARCHAR(10),
  ville VARCHAR(100),
  type_projet ENUM('installation', 'entretien', 'depannage', 'autre') NOT NULL,
  type_batiment ENUM('maison', 'appartement', 'local_commercial', 'bureau') NOT NULL,
  surface INT,
  nb_pieces INT,
  message TEXT,
  statut ENUM('nouveau', 'en_cours', 'envoye', 'accepte', 'refuse', 'expire') DEFAULT 'nouveau',
  montant_ht DECIMAL(10,2),
  montant_ttc DECIMAL(10,2),
  date_validite DATE,
  notes_internes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL,
  INDEX idx_statut (statut),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================
-- Table: commandes
-- Commandes clients
-- ================================================
CREATE TABLE IF NOT EXISTS commandes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  numero_commande VARCHAR(50) NOT NULL UNIQUE,
  client_id INT NOT NULL,
  devis_id INT,
  statut ENUM('en_attente', 'confirmee', 'en_preparation', 'en_livraison', 'livree', 'annulee') DEFAULT 'en_attente',
  montant_ht DECIMAL(10,2) NOT NULL,
  montant_tva DECIMAL(10,2) NOT NULL,
  montant_ttc DECIMAL(10,2) NOT NULL,
  adresse_livraison TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  FOREIGN KEY (devis_id) REFERENCES devis(id) ON DELETE SET NULL,
  INDEX idx_client (client_id),
  INDEX idx_statut (statut)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================
-- Table: commande_lignes
-- Lignes de détail des commandes
-- ================================================
CREATE TABLE IF NOT EXISTS commande_lignes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  commande_id INT NOT NULL,
  produit_id INT,
  nom_produit VARCHAR(200) NOT NULL,
  reference VARCHAR(50),
  quantite INT NOT NULL DEFAULT 1,
  prix_unitaire_ht DECIMAL(10,2) NOT NULL,
  prix_total_ht DECIMAL(10,2) NOT NULL,
  tva_taux DECIMAL(5,2) DEFAULT 20.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE,
  FOREIGN KEY (produit_id) REFERENCES produits(id) ON DELETE SET NULL,
  INDEX idx_commande (commande_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================
-- Table: interventions
-- Suivi des interventions (installation, entretien, dépannage)
-- ================================================
CREATE TABLE IF NOT EXISTS interventions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  commande_id INT,
  type_intervention ENUM('installation', 'entretien', 'depannage', 'diagnostic') NOT NULL,
  date_prevue DATE NOT NULL,
  heure_prevue TIME,
  adresse TEXT NOT NULL,
  technicien VARCHAR(100),
  statut ENUM('planifiee', 'en_cours', 'terminee', 'annulee', 'reportee') DEFAULT 'planifiee',
  description TEXT,
  rapport TEXT,
  duree_minutes INT,
  montant_ht DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE SET NULL,
  INDEX idx_date (date_prevue),
  INDEX idx_statut (statut)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================
-- Table: contacts
-- Messages du formulaire de contact
-- ================================================
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telephone VARCHAR(20),
  sujet VARCHAR(200),
  message TEXT NOT NULL,
  statut ENUM('nouveau', 'lu', 'traite', 'archive') DEFAULT 'nouveau',
  notes_internes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_statut (statut),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================
-- Insertion des données de base
-- ================================================

-- Catégories de produits
INSERT INTO categories (nom, slug, description, ordre) VALUES
('Climatisation', 'climatisation', 'Systèmes de climatisation résidentiels et professionnels', 1),
('Chauffage', 'chauffage', 'Solutions de chauffage électrique et thermique', 2),
('Pompes à Chaleur', 'pompes-a-chaleur', 'Pompes à chaleur air-air, air-eau et géothermiques', 3),
('Ventilation', 'ventilation', 'Systèmes de ventilation et traitement de l''air', 4),
('Accessoires', 'accessoires', 'Thermostats, télécommandes et accessoires', 5),
('Traitement de l''eau', 'traitement-eau', 'Adoucisseurs et systèmes de filtration', 6);

-- Produits GREE (exemples)
INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, stock, en_vedette, actif) VALUES
(1, 'Climatiseur Mural GREE U-Match', 'climatiseur-mural-gree-u-match', 'GREE-UMATCH-35', 'GREE', 'Climatiseur mural réversible ultra-silencieux avec technologie inverter', '3.5 kW', 899.00, 5, TRUE, TRUE),
(1, 'Climatiseur Gainable GREE U-Match CDT 24', 'climatiseur-gainable-gree-u-match-cdt-24', 'GREE-CDT-24', 'GREE', 'Système gainable discret 8 kW avec thermostat digital programmable', '8 kW', 1899.00, 3, TRUE, TRUE),
(1, 'Climatiseur Cassette 4 Voies GREE', 'climatiseur-cassette-4-voies-gree', 'GREE-CASSETTE-4V', 'GREE', 'Cassette à encastrer 4 directions de soufflage, idéal commerces', '4 kW', 1599.00, 2, TRUE, TRUE),
(3, 'Pompe à Chaleur Air-Air GREE', 'pompe-chaleur-air-air-gree', 'GREE-PAC-AA-50', 'GREE', 'PAC réversible haute efficacité énergétique classe A+++', '5 kW', 2499.00, 4, TRUE, TRUE),
(3, 'Pompe à Chaleur Air-Eau GREE', 'pompe-chaleur-air-eau-gree', 'GREE-PAC-AE-80', 'GREE', 'PAC pour chauffage central et production d''eau chaude sanitaire', '8 kW', 4999.00, 2, TRUE, TRUE),
(5, 'Thermostat Digital Programmable GREE', 'thermostat-digital-gree', 'GREE-THERM-DIG', 'GREE', 'Thermostat intelligent avec programmation hebdomadaire', NULL, 159.00, 15, FALSE, TRUE),
(5, 'Télécommande Filaire GREE', 'telecommande-filaire-gree', 'GREE-RC-WIRE', 'GREE', 'Télécommande filaire pour systèmes gainables et cassettes', NULL, 89.00, 10, FALSE, TRUE),
(6, 'Adoucisseur d''eau à Sel 20L', 'adoucisseur-eau-sel-20l', 'ADC-SEL-20', 'Point CLIM', 'Adoucisseur d''eau automatique 20 litres avec système de régénération', NULL, 699.00, 3, FALSE, TRUE),
(6, 'Système Anti-Calcaire Sans Sel', 'anti-calcaire-sans-sel', 'ADC-NSEL-CO2', 'Point CLIM', 'Système écologique de traitement anti-calcaire au CO2', NULL, 899.00, 2, FALSE, TRUE),
(4, 'Gaines Isolées PVC (Kit)', 'gaines-isolees-pvc-kit', 'GAINE-PVC-KIT', 'Générique', 'Kit de gaines PVC isolées pour installation gainable', NULL, 129.00, 20, FALSE, TRUE);

-- Client exemple (mot de passe: climacontrol2024)
INSERT INTO clients (email, password_hash, prenom, nom, telephone, adresse, code_postal, ville, type_client) VALUES
('client@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Jean', 'Dupont', '0612345678', '10 rue de la République', '34000', 'Montpellier', 'particulier');

-- ================================================
-- Vues utiles pour les statistiques
-- ================================================

-- Vue: Statistiques produits
CREATE OR REPLACE VIEW v_stats_produits AS
SELECT 
  c.nom as categorie,
  COUNT(p.id) as nb_produits,
  SUM(p.stock) as stock_total,
  AVG(p.prix_ttc) as prix_moyen
FROM categories c
LEFT JOIN produits p ON c.id = p.categorie_id AND p.actif = TRUE
GROUP BY c.id, c.nom;

-- Vue: Devis en attente
CREATE OR REPLACE VIEW v_devis_en_attente AS
SELECT 
  d.id,
  d.numero_devis,
  d.nom,
  d.email,
  d.telephone,
  d.type_projet,
  d.statut,
  d.created_at,
  DATEDIFF(CURRENT_DATE, d.created_at) as jours_attente
FROM devis d
WHERE d.statut IN ('nouveau', 'en_cours')
ORDER BY d.created_at ASC;

-- ================================================
-- Procédure: Générer numéro de devis
-- ================================================
DELIMITER //

CREATE PROCEDURE generer_numero_devis(OUT nouveau_numero VARCHAR(50))
BEGIN
  DECLARE annee INT;
  DECLARE mois INT;
  DECLARE compteur INT;
  
  SET annee = YEAR(CURDATE());
  SET mois = MONTH(CURDATE());
  
  SELECT COUNT(*) + 1 INTO compteur
  FROM devis
  WHERE YEAR(created_at) = annee AND MONTH(created_at) = mois;
  
  SET nouveau_numero = CONCAT('DEV', annee, LPAD(mois, 2, '0'), '-', LPAD(compteur, 4, '0'));
END //

DELIMITER ;

-- ================================================
-- Triggers pour audit et automatisation
-- ================================================

-- Trigger: Générer automatiquement le numéro de devis
DELIMITER //

CREATE TRIGGER before_insert_devis
BEFORE INSERT ON devis
FOR EACH ROW
BEGIN
  IF NEW.numero_devis IS NULL OR NEW.numero_devis = '' THEN
    CALL generer_numero_devis(@nouveau_numero);
    SET NEW.numero_devis = @nouveau_numero;
  END IF;
  
  -- Date de validité par défaut: 30 jours
  IF NEW.date_validite IS NULL THEN
    SET NEW.date_validite = DATE_ADD(CURRENT_DATE, INTERVAL 30 DAY);
  END IF;
END //

DELIMITER ;

-- ================================================
-- Index pour optimisation des performances
-- ================================================
ALTER TABLE produits ADD FULLTEXT INDEX idx_fulltext_produits (nom, description, reference);
ALTER TABLE clients ADD INDEX idx_ville (ville);
ALTER TABLE devis ADD INDEX idx_email (email);

-- ================================================
-- Instructions d'utilisation
-- ================================================

-- Pour importer cette base de données:
-- 1. Créez une nouvelle base de données dans phpMyAdmin ou MySQL Workbench
-- 2. Exécutez ce fichier SQL complet
-- 3. Vérifiez que toutes les tables sont créées avec: SHOW TABLES;
-- 4. Vérifiez les données de test avec: SELECT * FROM categories;

-- Pour connexion locale:
-- Host: localhost
-- Database: climacontrol
-- Username: root (ou votre utilisateur MySQL)
-- Password: (votre mot de passe MySQL local)
-- Port: 3306

-- Pour Hostinger:
-- 1. Créez une base de données MySQL dans le panneau Hostinger
-- 2. Notez les identifiants fournis (host, database, user, password)
-- 3. Importez ce fichier via phpMyAdmin dans Hostinger
-- 4. Configurez votre connexion PHP avec ces identifiants
