-- ================================================
-- Base de données ClimaControl (PostgreSQL Version)
-- Système de gestion pour site e-commerce climatisation
-- Compatible Supabase / PostgreSQL
-- ================================================

-- Function to handle automated updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ================================================
-- Table: categories
-- ================================================
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  image_url VARCHAR(255),
  ordre INT DEFAULT 0,
  actif BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- ================================================
-- Table: produits
-- ================================================
CREATE TABLE IF NOT EXISTS produits (
  id SERIAL PRIMARY KEY,
  categorie_id INT NOT NULL,
  nom VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  reference VARCHAR(50),
  marque VARCHAR(50) DEFAULT 'GREE',
  description TEXT,
  caracteristiques JSONB,
  puissance VARCHAR(50),
  prix_ht DECIMAL(10,2),
  prix_ttc DECIMAL(10,2),
  stock INT DEFAULT 0,
  image_principale VARCHAR(255),
  images_supplementaires JSONB,
  en_vedette BOOLEAN DEFAULT FALSE,
  actif BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE INDEX idx_produits_categorie ON produits(categorie_id);
CREATE INDEX idx_produits_slug ON produits(slug);
CREATE INDEX idx_produits_actif ON produits(actif);

CREATE TRIGGER update_produits_updated_at
    BEFORE UPDATE ON produits
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- ================================================
-- Table: clients
-- ================================================
CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255),
  prenom VARCHAR(100),
  nom VARCHAR(100),
  telephone VARCHAR(20),
  adresse TEXT,
  code_postal VARCHAR(10),
  ville VARCHAR(100),
  type_client VARCHAR(50) DEFAULT 'particulier' CHECK (type_client IN ('particulier', 'professionnel')),
  siret VARCHAR(14),
  actif BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_ville ON clients(ville);

CREATE TRIGGER update_clients_updated_at
    BEFORE UPDATE ON clients
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- ================================================
-- Table: devis
-- ================================================
CREATE TABLE IF NOT EXISTS devis (
  id SERIAL PRIMARY KEY,
  numero_devis VARCHAR(50) NOT NULL UNIQUE,
  client_id INT,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telephone VARCHAR(20) NOT NULL,
  adresse TEXT,
  code_postal VARCHAR(10),
  ville VARCHAR(100),
  type_projet VARCHAR(50) NOT NULL CHECK (type_projet IN ('installation', 'entretien', 'depannage', 'autre')),
  type_batiment VARCHAR(50) NOT NULL CHECK (type_batiment IN ('maison', 'appartement', 'local_commercial', 'bureau')),
  surface INT,
  nb_pieces INT,
  message TEXT,
  statut VARCHAR(50) DEFAULT 'nouveau' CHECK (statut IN ('nouveau', 'en_cours', 'envoye', 'accepte', 'refuse', 'expire')),
  montant_ht DECIMAL(10,2),
  montant_ttc DECIMAL(10,2),
  date_validite DATE,
  notes_internes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL
);

CREATE INDEX idx_devis_statut ON devis(statut);
CREATE INDEX idx_devis_created ON devis(created_at);
CREATE INDEX idx_devis_email ON devis(email);

CREATE TRIGGER update_devis_updated_at
    BEFORE UPDATE ON devis
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- ================================================
-- Table: commandes
-- ================================================
CREATE TABLE IF NOT EXISTS commandes (
  id SERIAL PRIMARY KEY,
  numero_commande VARCHAR(50) NOT NULL UNIQUE,
  client_id INT NOT NULL,
  devis_id INT,
  statut VARCHAR(50) DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'confirmee', 'en_preparation', 'en_livraison', 'livree', 'annulee')),
  montant_ht DECIMAL(10,2) NOT NULL,
  montant_tva DECIMAL(10,2) NOT NULL,
  montant_ttc DECIMAL(10,2) NOT NULL,
  adresse_livraison TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  FOREIGN KEY (devis_id) REFERENCES devis(id) ON DELETE SET NULL
);

CREATE INDEX idx_commandes_client ON commandes(client_id);
CREATE INDEX idx_commandes_statut ON commandes(statut);

CREATE TRIGGER update_commandes_updated_at
    BEFORE UPDATE ON commandes
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- ================================================
-- Table: commande_lignes
-- ================================================
CREATE TABLE IF NOT EXISTS commande_lignes (
  id SERIAL PRIMARY KEY,
  commande_id INT NOT NULL,
  produit_id INT,
  nom_produit VARCHAR(200) NOT NULL,
  reference VARCHAR(50),
  quantite INT NOT NULL DEFAULT 1,
  prix_unitaire_ht DECIMAL(10,2) NOT NULL,
  prix_total_ht DECIMAL(10,2) NOT NULL,
  tva_taux DECIMAL(5,2) DEFAULT 20.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE,
  FOREIGN KEY (produit_id) REFERENCES produits(id) ON DELETE SET NULL
);

CREATE INDEX idx_commande_lignes_commande ON commande_lignes(commande_id);

-- ================================================
-- Table: interventions
-- ================================================
CREATE TABLE IF NOT EXISTS interventions (
  id SERIAL PRIMARY KEY,
  client_id INT NOT NULL,
  commande_id INT,
  type_intervention VARCHAR(50) NOT NULL CHECK (type_intervention IN ('installation', 'entretien', 'depannage', 'diagnostic')),
  date_prevue DATE NOT NULL,
  heure_prevue TIME,
  adresse TEXT NOT NULL,
  technicien VARCHAR(100),
  statut VARCHAR(50) DEFAULT 'planifiee' CHECK (statut IN ('planifiee', 'en_cours', 'terminee', 'annulee', 'reportee')),
  description TEXT,
  rapport TEXT,
  duree_minutes INT,
  montant_ht DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE SET NULL
);

CREATE INDEX idx_interventions_date ON interventions(date_prevue);
CREATE INDEX idx_interventions_statut ON interventions(statut);

CREATE TRIGGER update_interventions_updated_at
    BEFORE UPDATE ON interventions
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- ================================================
-- Table: contacts
-- ================================================
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telephone VARCHAR(20),
  sujet VARCHAR(200),
  message TEXT NOT NULL,
  statut VARCHAR(50) DEFAULT 'nouveau' CHECK (statut IN ('nouveau', 'lu', 'traite', 'archive')),
  notes_internes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contacts_statut ON contacts(statut);
CREATE INDEX idx_contacts_created ON contacts(created_at);

CREATE TRIGGER update_contacts_updated_at
    BEFORE UPDATE ON contacts
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

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

-- Client exemple
INSERT INTO clients (email, password_hash, prenom, nom, telephone, adresse, code_postal, ville, type_client) VALUES
('client@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Jean', 'Dupont', '0612345678', '10 rue de la République', '34000', 'Montpellier', 'particulier');

-- ================================================
-- Vues
-- ================================================

CREATE OR REPLACE VIEW v_stats_produits AS
SELECT 
  c.nom as categorie,
  COUNT(p.id) as nb_produits,
  SUM(p.stock) as stock_total,
  AVG(p.prix_ttc) as prix_moyen
FROM categories c
LEFT JOIN produits p ON c.id = p.categorie_id AND p.actif = TRUE
GROUP BY c.id, c.nom;

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
  (CURRENT_DATE - d.created_at::DATE) as jours_attente
FROM devis d
WHERE d.statut IN ('nouveau', 'en_cours')
ORDER BY d.created_at ASC;

-- ================================================
-- Fonctions et Triggers (Logique métier)
-- ================================================

CREATE OR REPLACE FUNCTION generate_devis_number()
RETURNS TRIGGER AS $$
DECLARE
  annee INT;
  mois INT;
  compteur INT;
  nouveau_numero VARCHAR(50);
BEGIN
    IF NEW.numero_devis IS NULL OR NEW.numero_devis = '' THEN
        annee := EXTRACT(YEAR FROM CURRENT_DATE);
        mois := EXTRACT(MONTH FROM CURRENT_DATE);
        
        -- Compter les devis du mois courant
        SELECT COUNT(*) + 1 INTO compteur
        FROM devis
        WHERE EXTRACT(YEAR FROM created_at) = annee AND EXTRACT(MONTH FROM created_at) = mois;
        
        -- Formater: DEV202305-0001
        nouveau_numero := concat('DEV', annee, lpad(mois::text, 2, '0'), '-', lpad(compteur::text, 4, '0'));
        NEW.numero_devis := nouveau_numero;
    END IF;

    -- Date de validité par défaut (30 jours)
    IF NEW.date_validite IS NULL THEN
        NEW.date_validite := CURRENT_DATE + INTERVAL '30 days';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_devis_trigger
    BEFORE INSERT ON devis
    FOR EACH ROW
    EXECUTE FUNCTION generate_devis_number();
