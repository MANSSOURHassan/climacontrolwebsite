-- Script de mise à jour des produits avec vraies images et prix
-- Version 3 - Images complètes ClimaControl

USE climacontrol;

-- Vider les anciens produits
DELETE FROM produits;

-- Réinitialiser l'auto-increment
ALTER TABLE produits AUTO_INCREMENT = 1;

-- Insérer les produits avec les vraies images et prix
INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES

-- Climatisation - Systèmes complets
(1, 'Climatisation Gainable U-Match CDT 24 - 8 kW', 'climatisation-gainable-u-match-cdt-24-8kw', 'GREE-CDT-24-8KW', 'GREE', 
'Système complet de climatisation gainable avec unité intérieure et extérieure. Technologie Inverter, gaz R32 écologique, thermostat digital programmable inclus. Installation discrète idéale pour maisons et bureaux.', 
'8 kW', 2083.33, 2499.99, 5, 
'/images/climatisation-gainable-u-match-cdt-24-8-kwatts-monophase-r32-prix-2499.jpg', 
TRUE, TRUE),

(1, 'Climatiseur Cassette U-Match 4 kW', 'climatiseur-cassette-u-match-4kw', 'GREE-CASSETTE-4KW-A', 'GREE',
'Climatiseur cassette 4 voies encastrable, design discret, diffusion optimale de l''air dans toutes les directions. Système complet avec unité extérieure. Parfait pour espaces commerciaux.',
'4 kW', 1083.33, 1299.99, 3,
'/images/climatiseur-cassette-u-match-4-kwatts-monophase-r32-prix-1299.jpg',
TRUE, TRUE),

(1, 'Climatiseur Cassette GREE - Vue Encastrée', 'climatiseur-cassette-gree-encastre', 'GREE-CASSETTE-4KW-B', 'GREE',
'Climatiseur cassette 4 voies design premium, installation plafond encastrée pour une intégration parfaite. Gaz R32 écologique, contrôle intelligent de la température.',
'4 kW', 2166.66, 2599.99, 2,
'/images/cassette-prix-2599.jpg',
FALSE, TRUE),

-- Climatisation - Unités séparées
(1, 'Unité Gainable 3.5 kW - Compacte', 'unite-gainable-3-5kw', 'GREE-DUCT-3.5KW', 'GREE',
'Unité intérieure gainable compacte 3.5 kW, installation discrète dans faux-plafond ou combles. Silencieuse et économique. Idéale pour chambres et petits espaces.',
'3.5 kW', 308.33, 369.99, 8,
'/images/unite-gainable-3-5kw-prix-369.jpg',
FALSE, TRUE),

(1, 'Unité Extérieure GREE 3.5 kW', 'unite-exterieure-gree-3-5kw', 'GREE-ODU-3.5KW', 'GREE',
'Unité extérieure compacte 3.5 kW avec technologie Inverter. Fonctionnement silencieux, résistante aux intempéries. Compatible avec unités intérieures gainables.',
'3.5 kW', 583.33, 699.99, 6,
'/images/unite-exterieure-gree-3-5kw-prix-699.jpg',
FALSE, TRUE),

-- Pompes à chaleur
(3, 'Unité Intérieure Gainable Premium', 'unite-interieure-gainable-premium', 'GREE-UI-GAIN-PRO', 'GREE',
'Unité intérieure gainable haute performance, installation discrète dans combles. Basse pression sonore, distribution uniforme de l''air. Technologie avancée.',
'Variable', 1083.33, 1299.99, 4,
'/images/climatisation-gainable-u-match-cdt-24-8-kwatts-monophase-r32-unite-interieure.jpg',
FALSE, TRUE),

(3, 'Unité Extérieure GREE U-Match', 'unite-exterieure-gree-u-match', 'GREE-UE-UMATCH', 'GREE',
'Unité extérieure haute performance avec technologie Inverter. Fonctionnement silencieux même par temps extrêmes, compacte et design moderne.',
'Variable', 1499.99, 1799.99, 5,
'/images/climatisation-gainable-u-match-cdt-24-8-kwatts-monophase-r32-unite-exterieure.jpg',
FALSE, TRUE),

-- Accessoires Climatisation
(5, 'Thermostat Digital GREE', 'thermostat-digital-gree', 'GREE-THERM-DIG', 'GREE',
'Thermostat digital programmable avec grand écran LCD rétroéclairé. Programmation hebdomadaire 7 jours, compatible tous systèmes GREE. Installation filaire.',
NULL, 124.99, 149.99, 15,
'/images/thermostat-digital-gree.jpg',
FALSE, TRUE),

-- Traitement de l'eau
(6, 'Adoucisseur d''Eau à Sel - 20L', 'adoucisseur-eau-sel-20l', 'ADC-SEL-20L', 'Pro',
'Adoucisseur d''eau automatique à sel, capacité 20 litres. Système de régénération programmable, installation complète fournie avec tous les accessoires. Protection optimale contre le calcaire.',
NULL, 574.99, 689.99, 3,
'/images/adoucisseur-a-sel-prix-689.jpg',
TRUE, TRUE),

(6, 'Adoucisseur Sans Sel CO2 - Système Complet', 'adoucisseur-sans-sel-co2-complet', 'ADC-NSEL-CO2-FULL', 'Pro',
'Système anti-calcaire écologique au CO2. Sans sel, sans entretien, installation facile. Préserve les minéraux de l''eau. Comprend bouteille CO2, compteur et tous accessoires.',
NULL, 1499.99, 1799.99, 2,
'/images/adoucisseur-sans-sel-prix-1799.jpg',
TRUE, TRUE),

(6, 'Valve Adoucisseur Sans Sel', 'valve-adoucisseur-sans-sel', 'ADC-VALVE-NSEL', 'Pro',
'Valve premium pour système adoucisseur sans sel. Installation facile, durable, compatible tous systèmes. Corps en laiton haute qualité.',
NULL, 249.99, 299.99, 8,
'/images/adoucisseur-sans-sel-valve.jpg',
FALSE, TRUE),

(6, 'Module Adoucisseur Compact', 'module-adoucisseur-compact', 'ADC-MODULE-COMP', 'Pro',
'Module adoucisseur compact avec technologie avancée sans sel. Installation simple sur arrivée d''eau. Protection efficace contre le calcaire.',
NULL, 333.33, 399.99, 5,
'/images/adoucisseur-sans-sel-module.jpg',
FALSE, TRUE),

(6, 'Système Adoucisseur Premium', 'systeme-adoucisseur-premium', 'ADC-PREM-SYS', 'Pro',
'Système adoucisseur premium complet. Installation professionnelle incluse, garantie 5 ans. Technologie de pointe pour une eau pure.',
NULL, 499.99, 599.99, 4,
'/images/adoucisseur-sans-sel-premium.jpg',
FALSE, TRUE),

-- Accessoires installation
(5, 'Kit Tubes PVC Installation Pro', 'kit-tubes-pvc-installation', 'TUBES-PVC-KIT-PRO', 'Pro',
'Kit complet de tubes PVC pour installation de climatisation. Différents diamètres inclus, résistant aux UV et intempéries. Qualité professionnelle.',
NULL, 74.99, 89.99, 20,
'/images/tubes-pvc-accessoires.jpg',
FALSE, TRUE);

-- Ajouter des images secondaires pour certains produits
INSERT INTO images_produits (produit_id, url, alt, ordre) VALUES
(1, '/images/climatisation-gainable-u-match-cdt-24-8-kwatts-monophase-r32-unite-interieure.jpg', 'Unité intérieure gainable', 1),
(1, '/images/climatisation-gainable-u-match-cdt-24-8-kwatts-monophase-r32-unite-exterieure.jpg', 'Unité extérieure', 2),
(1, '/images/climatisation-gainable-u-match-cdt-24-8-kwatts-monophase-r32-thermostat.jpg', 'Thermostat inclus', 3);

-- Mettre à jour les stocks aléatoirement
UPDATE produits SET stock = FLOOR(RAND() * 10) + 1 WHERE actif = TRUE;

SELECT 'Produits mis à jour avec succès!' as message;
