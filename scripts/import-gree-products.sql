-- ================================================
-- Script d'insertion des produits GREE avec vraies images
-- Source: greeproducts.com/fr/ et global.gree.com
-- Pour Supabase (PostgreSQL)
-- ================================================

-- ================================================
-- CATÉGORIES
-- ================================================
INSERT INTO categories (nom, slug, description, ordre, actif) VALUES
('Climatisation', 'climatisation', 'Systèmes de climatisation résidentiels et professionnels GREE', 1, true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (nom, slug, description, ordre, actif) VALUES
('Pompes à Chaleur', 'pompes-a-chaleur', 'Pompes à chaleur air-eau GREE Versati', 3, true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (nom, slug, description, ordre, actif) VALUES
('Accessoires', 'accessoires', 'Accessoires et pièces détachées GREE', 5, true)
ON CONFLICT (slug) DO NOTHING;

-- ================================================
-- CLIMATISEURS MURAUX RÉSIDENTIELS - MONOSPLITS
-- ================================================

-- Gamme PULAR (R32) - Entrée de gamme
INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE Pular R32 2.5 kW',
 'gree-pular-r32-25kw',
 'GWH09AGA-K6DNA1A',
 'GREE',
 'Climatiseur mural GREE Pular R32, entrée de gamme fiable et économique. Classe énergétique A++/A+. Technologie inverter DC. Fonctions Auto, Sleep, Timer.',
 '2.5 kW',
 499.00,
 599.00,
 20,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/pular-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE Pular R32 3.5 kW',
 'gree-pular-r32-35kw',
 'GWH12AGA-K6DNA1A',
 'GREE',
 'Climatiseur mural GREE Pular R32, puissance idéale pour pièces moyennes. Classe énergétique A++/A+. Design compact et silencieux.',
 '3.5 kW',
 599.00,
 719.00,
 15,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/pular-1.png',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE Pular R32 5.2 kW',
 'gree-pular-r32-52kw',
 'GWH18AGA-K6DNA1A',
 'GREE',
 'Climatiseur mural GREE Pular R32 haute puissance. Parfait pour grandes pièces. Wifi optionnel disponible.',
 '5.2 kW',
 799.00,
 959.00,
 10,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/pular-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE Pular R32 7 kW',
 'gree-pular-r32-70kw',
 'GWH24AGA-K6DNA1A',
 'GREE',
 'Climatiseur mural GREE Pular R32 très haute puissance pour grands volumes. Technologie inverter DC.',
 '7.0 kW',
 999.00,
 1199.00,
 8,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/pular-1.png',
 false,
 true);

-- Gamme FAIRY / FAIR (R32) - Milieu de gamme
INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE Fairy R32 2.5 kW',
 'gree-fairy-r32-25kw',
 'GWH09ACC-K6DNA1A',
 'GREE',
 'Climatiseur mural GREE Fairy R32 design élégant. Classe A+++/A++. Wifi intégré. Filtration avancée anti-bactérienne.',
 '2.5 kW',
 699.00,
 839.00,
 12,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/fairy-1.png',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE Fairy R32 3.5 kW',
 'gree-fairy-r32-35kw',
 'GWH12ACC-K6DNA1A',
 'GREE',
 'Climatiseur mural GREE Fairy R32, le meilleur rapport qualité-prix. Design premium blanc brillant.',
 '3.5 kW',
 799.00,
 959.00,
 10,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/fairy-1.png',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE Fairy R32 5.2 kW',
 'gree-fairy-r32-52kw',
 'GWH18ACC-K6DNA1A',
 'GREE',
 'Climatiseur mural GREE Fairy R32 grande puissance. Fonctionnalités premium avec contrôle Wifi.',
 '5.2 kW',
 999.00,
 1199.00,
 8,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/fairy-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE Fairy R32 7 kW',
 'gree-fairy-r32-70kw',
 'GWH24ACC-K6DNA1A',
 'GREE',
 'Climatiseur mural GREE Fairy R32 très haute puissance. Idéal pour espaces ouverts et lofts.',
 '7.0 kW',
 1199.00,
 1439.00,
 6,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/fairy-1.png',
 false,
 true);

-- Gamme CLIVIA / HANSOL (R32) - Haut de gamme
INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE Clivia R32 2.5 kW',
 'gree-clivia-r32-25kw',
 'GWH09YD-K6DNA1A',
 'GREE',
 'Climatiseur mural premium GREE Clivia. Classe A+++/A+++. Ultra-silencieux 19dB. Wifi intégré. Filtration I-Feel.',
 '2.5 kW',
 899.00,
 1079.00,
 10,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220912/hansol-1.png',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE Clivia R32 3.5 kW',
 'gree-clivia-r32-35kw',
 'GWH12YD-K6DNA1A',
 'GREE',
 'Climatiseur mural premium GREE Clivia haute performance. Design épuré et technologie de pointe.',
 '3.5 kW',
 1099.00,
 1319.00,
 8,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220912/hansol-1.png',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE Clivia R32 5.2 kW',
 'gree-clivia-r32-52kw',
 'GWH18YD-K6DNA1A',
 'GREE',
 'Climatiseur mural premium GREE Clivia grande puissance. Performances exceptionnelles et confort absolu.',
 '5.2 kW',
 1299.00,
 1559.00,
 6,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220912/hansol-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE Clivia R32 7 kW',
 'gree-clivia-r32-70kw',
 'GWH24YD-K6DNA1A',
 'GREE',
 'Climatiseur mural premium GREE Clivia très haute puissance. Le summum du confort résidentiel.',
 '7.0 kW',
 1499.00,
 1799.00,
 5,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220912/hansol-1.png',
 false,
 true);

-- Gamme SOYAL (R32) - Design premium noir
INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE Soyal R32 3.5 kW Noir',
 'gree-soyal-r32-35kw-noir',
 'GWH12AKC-K6DNA1A',
 'GREE',
 'Climatiseur design GREE Soyal noir mat. Écran LED caché, design minimaliste. Classe A+++. Wifi intégré.',
 '3.5 kW',
 1199.00,
 1439.00,
 7,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/soyal-1.png',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE Soyal R32 2.5 kW Blanc',
 'gree-soyal-r32-25kw-blanc',
 'GWH09AKC-K6DNA1A',
 'GREE',
 'Climatiseur design GREE Soyal blanc. Esthétique moderne pour intérieurs contemporains.',
 '2.5 kW',
 999.00,
 1199.00,
 8,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/soyal-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE Soyal R32 5.2 kW Noir',
 'gree-soyal-r32-52kw-noir',
 'GWH18AKC-K6DNA1A',
 'GREE',
 'Climatiseur design GREE Soyal grande puissance. Finition noir mat haut de gamme.',
 '5.2 kW',
 1399.00,
 1679.00,
 5,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/soyal-1.png',
 false,
 true);

-- ================================================
-- CONSOLES MURALES
-- ================================================

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE Console R32 2.5 kW',
 'gree-console-r32-25kw',
 'GEH09AA-K6DNA1B',
 'GREE',
 'Console GREE à poser au sol ou accrocher au mur. Diffusion basse pour chauffage optimal. Classe A++.',
 '2.5 kW',
 899.00,
 1079.00,
 8,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/console-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE Console R32 3.5 kW',
 'gree-console-r32-35kw',
 'GEH12AA-K6DNA1B',
 'GREE',
 'Console GREE polyvalente sol/mur. Parfaite pour chambres et espaces sous fenêtre.',
 '3.5 kW',
 1099.00,
 1319.00,
 6,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/console-1.png',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE Console R32 5.2 kW',
 'gree-console-r32-52kw',
 'GEH18AA-K6DNA1B',
 'GREE',
 'Console GREE grande puissance. Double flux air chaud/froid pour confort uniforme.',
 '5.2 kW',
 1299.00,
 1559.00,
 5,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/console-1.png',
 false,
 true);

-- ================================================
-- SYSTÈMES MULTISPLITS FREE MATCH
-- ================================================

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE Free Match Bi-split 4.1 kW',
 'gree-free-match-bi-split-41kw',
 'GWHD(14)NK6LO',
 'GREE',
 'Unité extérieure GREE Free Match pour 2 unités intérieures. Compatible avec toute la gamme GREE.',
 '4.1 kW',
 999.00,
 1199.00,
 8,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/multi-1.png',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE Free Match Tri-split 6.2 kW',
 'gree-free-match-tri-split-62kw',
 'GWHD(21)NK6LO',
 'GREE',
 'Unité extérieure GREE Free Match pour 3 unités intérieures. Flexibilité maximale.',
 '6.2 kW',
 1399.00,
 1679.00,
 6,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/multi-1.png',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE Free Match Quadri-split 8.2 kW',
 'gree-free-match-quadri-split-82kw',
 'GWHD(28)NK6LO',
 'GREE',
 'Unité extérieure GREE Free Match pour 4 unités intérieures. Solution multi-zones complète.',
 '8.2 kW',
 1799.00,
 2159.00,
 4,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/multi-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE Free Match Penta-split 10.5 kW',
 'gree-free-match-penta-split-105kw',
 'GWHD(36)NK6LO',
 'GREE',
 'Unité extérieure GREE Free Match pour 5 unités intérieures. La solution ultime pour maisons.',
 '10.5 kW',
 2199.00,
 2639.00,
 3,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/multi-1.png',
 false,
 true);

-- ================================================
-- GAINABLES U-MATCH (Petit Tertiaire)
-- ================================================

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE U-Match Gainable 3.5 kW',
 'gree-u-match-gainable-35kw',
 'GUD35PS/A-T',
 'GREE',
 'Gainable GREE U-Match compact pour faux-plafonds. Installation discrète, pression statique 30Pa.',
 '3.5 kW',
 1299.00,
 1559.00,
 8,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/ducted-1.png',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE U-Match Gainable 5.0 kW',
 'gree-u-match-gainable-50kw',
 'GUD50PS/A-T',
 'GREE',
 'Gainable GREE U-Match puissance moyenne. Idéal bureaux et commerces de taille moyenne.',
 '5.0 kW',
 1599.00,
 1919.00,
 6,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/ducted-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE U-Match Gainable 7.0 kW',
 'gree-u-match-gainable-70kw',
 'GUD71PS/A-T',
 'GREE',
 'Gainable GREE U-Match haute puissance pour grands espaces commerciaux.',
 '7.0 kW',
 1999.00,
 2399.00,
 4,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/ducted-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE U-Match Gainable 10 kW',
 'gree-u-match-gainable-100kw',
 'GUD100PS/A-T',
 'GREE',
 'Gainable GREE U-Match très haute puissance. Solution professionnelle pour locaux commerciaux.',
 '10.0 kW',
 2499.00,
 2999.00,
 3,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/ducted-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE U-Match Gainable 14 kW',
 'gree-u-match-gainable-140kw',
 'GUD140PS/A-T',
 'GREE',
 'Gainable GREE U-Match très haute puissance. Pour grands volumes commerciaux et industriels.',
 '14.0 kW',
 3499.00,
 4199.00,
 2,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/ducted-1.png',
 false,
 true);

-- ================================================
-- CASSETTES U-MATCH
-- ================================================

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE U-Match Cassette 600x600 3.5 kW',
 'gree-u-match-cassette-600-35kw',
 'GUD35T/A-T',
 'GREE',
 'Cassette GREE U-Match format 600x600mm. Design compact pour plafonds modulaires. 4 directions.',
 '3.5 kW',
 1399.00,
 1679.00,
 7,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/cassette-1.png',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE U-Match Cassette 600x600 5.0 kW',
 'gree-u-match-cassette-600-50kw',
 'GUD50T/A-T',
 'GREE',
 'Cassette GREE U-Match 600x600mm puissance moyenne. Diffusion homogène 360°.',
 '5.0 kW',
 1699.00,
 2039.00,
 5,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/cassette-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE U-Match Cassette 600x600 7.0 kW',
 'gree-u-match-cassette-600-70kw',
 'GUD71T/A-T',
 'GREE',
 'Cassette GREE U-Match 600x600mm haute puissance. Parfaite pour open-spaces et commerces.',
 '7.0 kW',
 2099.00,
 2519.00,
 4,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/cassette-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE U-Match Cassette 840x840 5.0 kW',
 'gree-u-match-cassette-840-50kw',
 'GUD50T/A-T-840',
 'GREE',
 'Cassette GREE U-Match grand format 840x840mm. Débit d''air supérieur pour grands volumes.',
 '5.0 kW',
 1899.00,
 2279.00,
 4,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/cassette-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE U-Match Cassette 840x840 10 kW',
 'gree-u-match-cassette-840-100kw',
 'GUD100T/A-T-840',
 'GREE',
 'Cassette GREE U-Match 840x840mm très haute puissance. Pour halls et grands espaces commerciaux.',
 '10.0 kW',
 2699.00,
 3239.00,
 3,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/cassette-1.png',
 false,
 true);

-- ================================================
-- ALLÈGES/PLAFONNIERS U-MATCH
-- ================================================

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE U-Match Allège/Plafonnier 3.5 kW',
 'gree-u-match-allege-plafonnier-35kw',
 'GUD35ZD/A-T',
 'GREE',
 'Allège/Plafonnier GREE U-Match. Double possibilité d''installation sol ou plafond.',
 '3.5 kW',
 1299.00,
 1559.00,
 6,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/floor-ceiling-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE U-Match Allège/Plafonnier 5.0 kW',
 'gree-u-match-allege-plafonnier-50kw',
 'GUD50ZD/A-T',
 'GREE',
 'Allège/Plafonnier GREE U-Match puissance moyenne. Polyvalent pour bureaux et commerces.',
 '5.0 kW',
 1599.00,
 1919.00,
 5,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/floor-ceiling-1.png',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE U-Match Allège/Plafonnier 7.0 kW',
 'gree-u-match-allege-plafonnier-70kw',
 'GUD71ZD/A-T',
 'GREE',
 'Allège/Plafonnier GREE U-Match haute puissance. Solution professionnelle polyvalente.',
 '7.0 kW',
 1999.00,
 2399.00,
 4,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/floor-ceiling-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE U-Match Allège/Plafonnier 10 kW',
 'gree-u-match-allege-plafonnier-100kw',
 'GUD100ZD/A-T',
 'GREE',
 'Allège/Plafonnier GREE U-Match très haute puissance. Pour grands espaces commerciaux.',
 '10.0 kW',
 2499.00,
 2999.00,
 3,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/floor-ceiling-1.png',
 false,
 true);

-- ================================================
-- POMPES À CHALEUR VERSATI
-- ================================================

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'pompes-a-chaleur'),
 'GREE Versati IV Monobloc 8 kW',
 'gree-versati-iv-monobloc-8kw',
 'GRS-CQ8.0Pd/NhG-E',
 'GREE',
 'Pompe à chaleur air-eau GREE Versati IV Monobloc. Installation simplifiée sans liaison frigorifique. R32. COP 4.5.',
 '8.0 kW',
 4999.00,
 5999.00,
 4,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/versati-1.png',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'pompes-a-chaleur'),
 'GREE Versati IV Monobloc 10 kW',
 'gree-versati-iv-monobloc-10kw',
 'GRS-CQ10.0Pd/NhG-E',
 'GREE',
 'PAC air-eau GREE Versati IV Monobloc moyenne puissance. Chauffage, ECS et rafraîchissement.',
 '10.0 kW',
 5999.00,
 7199.00,
 3,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/versati-1.png',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'pompes-a-chaleur'),
 'GREE Versati IV Monobloc 12 kW',
 'gree-versati-iv-monobloc-12kw',
 'GRS-CQ12.0Pd/NhG-E',
 'GREE',
 'PAC air-eau GREE Versati IV Monobloc haute puissance pour grandes maisons.',
 '12.0 kW',
 6999.00,
 8399.00,
 2,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/versati-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'pompes-a-chaleur'),
 'GREE Versati IV Monobloc 16 kW',
 'gree-versati-iv-monobloc-16kw',
 'GRS-CQ16.0Pd/NhG-E',
 'GREE',
 'PAC air-eau GREE Versati IV Monobloc très haute puissance. Idéale pour bâtiments tertiaires.',
 '16.0 kW',
 8499.00,
 10199.00,
 2,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/versati-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'pompes-a-chaleur'),
 'GREE Versati IV Split 8 kW',
 'gree-versati-iv-split-8kw',
 'GRS-CQ8.0Pd/NhH-M',
 'GREE',
 'PAC air-eau GREE Versati IV Split avec module hydraulique intérieur. Installation flexible.',
 '8.0 kW',
 5499.00,
 6599.00,
 3,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/versati-split-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'pompes-a-chaleur'),
 'GREE Versati IV Split 12 kW',
 'gree-versati-iv-split-12kw',
 'GRS-CQ12.0Pd/NhH-M',
 'GREE',
 'PAC air-eau GREE Versati IV Split haute puissance. Module intérieur avec ballon ECS optionnel.',
 '12.0 kW',
 7499.00,
 8999.00,
 2,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/versati-split-1.png',
 false,
 true);

-- ================================================
-- BALLONS THERMODYNAMIQUES
-- ================================================

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'pompes-a-chaleur'),
 'GREE Aeros Ballon Thermodynamique 200L',
 'gree-aeros-ballon-thermodynamique-200l',
 'GWH-200AE-K6DNA1A',
 'GREE',
 'Chauffe-eau thermodynamique GREE Aeros 200L. COP 3.5. Jusqu''à 70% d''économies d''énergie.',
 '1.5 kW',
 1499.00,
 1799.00,
 6,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/water-heater-1.png',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'pompes-a-chaleur'),
 'GREE Aeros Ballon Thermodynamique 270L',
 'gree-aeros-ballon-thermodynamique-270l',
 'GWH-270AE-K6DNA1A',
 'GREE',
 'Chauffe-eau thermodynamique GREE Aeros 270L pour familles nombreuses. Éco-responsable.',
 '1.5 kW',
 1799.00,
 2159.00,
 5,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/water-heater-1.png',
 false,
 true);

-- ================================================
-- CLIMATISATION PROFESSIONNELLE GMV
-- ================================================

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE GMV6 Unité Extérieure 14 kW',
 'gree-gmv6-unite-exterieure-14kw',
 'GMV-140WM/B-X',
 'GREE',
 'Unité extérieure VRF GREE GMV6. Technologie inverter DC. Jusqu''à 8 unités intérieures connectables.',
 '14.0 kW',
 4999.00,
 5999.00,
 3,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/gmv6-1.png',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE GMV6 Unité Extérieure 22.4 kW',
 'gree-gmv6-unite-exterieure-224kw',
 'GMV-224WM/B-X',
 'GREE',
 'Unité extérieure VRF GREE GMV6 puissance moyenne. Jusqu''à 12 unités intérieures.',
 '22.4 kW',
 7499.00,
 8999.00,
 2,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/gmv6-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'),
 'GREE GMV6 Unité Extérieure 33.5 kW',
 'gree-gmv6-unite-exterieure-335kw',
 'GMV-335WM/B-X',
 'GREE',
 'Unité extérieure VRF GREE GMV6 haute puissance. Jusqu''à 20 unités intérieures.',
 '33.5 kW',
 9999.00,
 11999.00,
 2,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/gmv6-1.png',
 false,
 true);

-- ================================================
-- ACCESSOIRES
-- ================================================

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'accessoires'),
 'GREE Module Wifi G+',
 'gree-module-wifi-g-plus',
 'GF-WLAN-A',
 'GREE',
 'Module Wifi GREE G+ pour contrôle à distance. Compatible avec tous les modèles muraux GREE.',
 NULL,
 79.00,
 95.00,
 30,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/wifi-1.png',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'accessoires'),
 'GREE Télécommande Infrarouge YAN1F1',
 'gree-telecommande-yan1f1',
 'YAN1F1',
 'GREE',
 'Télécommande infrarouge GREE pour tous modèles muraux. Écran LCD rétro-éclairé.',
 NULL,
 29.00,
 35.00,
 50,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/remote-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'accessoires'),
 'GREE Télécommande Filaire XK74',
 'gree-telecommande-filaire-xk74',
 'XK74',
 'GREE',
 'Télécommande filaire GREE pour gainables et cassettes. Programmation hebdomadaire intégrée.',
 NULL,
 89.00,
 107.00,
 25,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/wired-remote-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'accessoires'),
 'GREE Kit Liaison Frigorifique 3m',
 'gree-kit-liaison-frigorifique-3m',
 'KIT-FRIGO-3M',
 'GREE',
 'Kit liaison frigorifique GREE préchargé 3 mètres. Cuivre qualité PRO isolé M1.',
 NULL,
 99.00,
 119.00,
 20,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/pipe-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'accessoires'),
 'GREE Kit Liaison Frigorifique 5m',
 'gree-kit-liaison-frigorifique-5m',
 'KIT-FRIGO-5M',
 'GREE',
 'Kit liaison frigorifique GREE préchargé 5 mètres. Installation professionnelle simplifiée.',
 NULL,
 139.00,
 167.00,
 15,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/pipe-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'accessoires'),
 'GREE Kit Goulotte Décorative 2m Blanc',
 'gree-kit-goulotte-decorative-2m-blanc',
 'GOULOTTE-2M-BLANC',
 'GREE',
 'Goulotte décorative GREE blanche 2 mètres. Cache câbles et tubes pour finition propre.',
 NULL,
 39.00,
 47.00,
 30,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/trunking-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'accessoires'),
 'GREE Support Mural Unité Extérieure',
 'gree-support-mural-unite-exterieure',
 'SUPPORT-EXT-450',
 'GREE',
 'Support mural GREE pour unité extérieure. Acier galvanisé anti-corrosion. Capacité 150kg.',
 NULL,
 49.00,
 59.00,
 25,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/bracket-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'accessoires'),
 'GREE Filtre Cold Plasma de Remplacement',
 'gree-filtre-cold-plasma-remplacement',
 'FILTRE-CP',
 'GREE',
 'Filtre Cold Plasma GREE de remplacement. Élimine 99% des bactéries, virus et allergènes.',
 NULL,
 39.00,
 47.00,
 40,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/filter-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'accessoires'),
 'GREE Pompe de Relevage Condensats',
 'gree-pompe-relevage-condensats',
 'POMPE-COND-MINI',
 'GREE',
 'Mini pompe de relevage condensats GREE. Silencieuse, débit 12L/h, hauteur refoulement 10m.',
 NULL,
 69.00,
 83.00,
 15,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/pump-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'accessoires'),
 'GREE Grille Murale Soufflage',
 'gree-grille-murale-soufflage',
 'GRILLE-SOUF-300',
 'GREE',
 'Grille de soufflage GREE pour gainables. Format 300x150mm. Aluminium anodisé blanc.',
 NULL,
 35.00,
 42.00,
 20,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/grille-1.png',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'accessoires'),
 'GREE Panneau Cassette 600x600 Blanc',
 'gree-panneau-cassette-600-blanc',
 'PANNEAU-600-BLANC',
 'GREE',
 'Panneau décoratif GREE pour cassettes 600x600mm. Finition blanc mat élégante.',
 NULL,
 79.00,
 95.00,
 15,
 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/panel-1.png',
 false,
 true);

-- ================================================
-- Vérification
-- ================================================
-- SELECT COUNT(*) as total_produits FROM produits WHERE marque = ''GREE'';
-- SELECT nom, prix_ttc, image_principale FROM produits WHERE marque = ''GREE'' ORDER BY prix_ttc;
