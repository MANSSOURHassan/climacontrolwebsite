-- Script de mise à jour des produits avec vraies images et prix
-- Version 2 - Produits ClimaControl réels

USE climacontrol;

-- Vider les anciens produits
DELETE FROM produits;

-- Insérer les produits avec les vraies images et prix
INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES

-- Climatisation
(1, 'Climatisation Gainable U-Match CDT 24 - 8 kW', 'climatisation-gainable-u-match-cdt-24', 'GREE-CDT-24-8KW', 'GREE', 
'Système complet de climatisation gainable avec unité intérieure et extérieure. Technologie Inverter, gaz R32 écologique, thermostat digital programmable inclus.', 
'8 kW', 2083.33, 2499.99, 5, 
'/images/climatisation-gainable-u-match-cdt-24-8-kwatts-monophase-r32-prix-2499.jpg', 
TRUE, TRUE),

(1, 'Climatiseur Cassette U-Match 4 kW', 'climatiseur-cassette-u-match-4kw', 'GREE-CASSETTE-4KW', 'GREE',
'Climatiseur cassette 4 voies encastrable, design discret, diffusion optimale de l''air dans toutes les directions. Système complet avec unité extérieure.',
'4 kW', 1083.33, 1299.99, 3,
'/images/climatiseur-cassette-u-match-4-kwatts-monophase-r32-prix-201299.jpg',
TRUE, TRUE),

-- Pompes à chaleur / Unités
(3, 'Unité Intérieure Gainable', 'unite-interieure-gainable', 'GREE-UI-GAIN', 'GREE',
'Unité intérieure gainable compacte, installation discrète dans les combles ou faux-plafond. Basse pression sonore.',
'Variable', 1083.33, 1299.99, 4,
'/images/climatisation-gainable-u-match-cdt-24-8-kwatts-monophase-r32-20-281-29.jpg',
FALSE, TRUE),

(3, 'Unité Extérieure GREE', 'unite-exterieure-gree', 'GREE-UE-STD', 'GREE',
'Unité extérieure haute performance avec technologie Inverter, fonctionnement silencieux, résistante aux intempéries.',
'Variable', 1333.33, 1599.99, 6,
'/images/climatisation-gainable-u-match-cdt-24-8-kwatts-monophase-r32-20-283-29.jpg',
FALSE, TRUE),

-- Accessoires
(5, 'Thermostat Digital GREE', 'thermostat-digital-gree', 'GREE-THERM-DIG', 'GREE',
'Thermostat digital programmable avec grand écran LCD, programmation hebdomadaire, compatible tous systèmes GREE.',
NULL, 124.99, 149.99, 15,
'/images/climatisation-gainable-u-match-cdt-24-8-kwatts-monophase-r32-20-282-29.jpg',
FALSE, TRUE),

-- Traitement de l'eau
(6, 'Adoucisseur d''Eau à Sel', 'adoucisseur-eau-sel', 'ADC-SEL-20L', 'Pro',
'Adoucisseur d''eau automatique à sel, capacité 20 litres, système de régénération programmable, installation complète fournie.',
NULL, 574.99, 689.99, 3,
'/images/adoucisseur-20-c3-a0-20sel-prix-689.jpg',
TRUE, TRUE),

(6, 'Adoucisseur Sans Sel - Système CO2', 'adoucisseur-sans-sel-co2', 'ADC-NSEL-CO2', 'Pro',
'Système anti-calcaire écologique au CO2, sans sel, sans entretien, installation facile, préserve les minéraux de l''eau.',
NULL, 749.99, 899.99, 2,
'/images/adoucisseur-20sans-20sel-20-20accessoire.png',
FALSE, TRUE),

-- Accessoires installation
(5, 'Kit Tubes PVC Installation', 'kit-tubes-pvc', 'TUBES-PVC-KIT', 'Pro',
'Kit complet de tubes PVC pour installation de climatisation, diamètres variés, résistant aux UV et intempéries.',
NULL, 74.99, 89.99, 20,
'/images/tubes-accessoires.jpg',
FALSE, TRUE);

-- Mettre à jour les stocks
UPDATE produits SET stock = FLOOR(RAND() * 10) + 1 WHERE actif = TRUE;
