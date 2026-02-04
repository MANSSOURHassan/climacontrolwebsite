-- ================================================
-- Script d'insertion des produits Climshop
-- Adapté pour Supabase (PostgreSQL)
-- ================================================

-- D'abord, vérifier/créer les catégories nécessaires
INSERT INTO categories (nom, slug, description, ordre, actif) VALUES
('Climatisation', 'climatisation', 'Systèmes de climatisation résidentiels et professionnels', 1, true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (nom, slug, description, ordre, actif) VALUES
('Chauffage', 'chauffage', 'Solutions de chauffage électrique et thermique', 2, true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (nom, slug, description, ordre, actif) VALUES
('Pompes à Chaleur', 'pompes-a-chaleur', 'Pompes à chaleur air-air, air-eau et géothermiques', 3, true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (nom, slug, description, ordre, actif) VALUES
('Ventilation', 'ventilation', 'Systèmes de ventilation et traitement de l''air', 4, true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (nom, slug, description, ordre, actif) VALUES
('Accessoires', 'accessoires', 'Thermostats, télécommandes et accessoires', 5, true)
ON CONFLICT (slug) DO NOTHING;

-- ================================================
-- Insertion des produits Climshop.com - Climatisation
-- ================================================

-- Produits Samsung
INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Climatiseur Réversible Samsung WindFree Comfort S2 Wifi', 
 'samsung-windfree-comfort-s2-wifi-25kw',
 'AR60F09C1AWNEU',
 'SAMSUNG',
 'Climatiseur réversible Samsung WindFree Comfort S2 avec Wifi intégré. Technologie WindFree™ pour un refroidissement sans courant d''air direct. Classe énergétique A++/A+.',
 '2.5 kW',
 749.00,
 899.00,
 8,
 'https://www.climshop.com/img/p/1/8/8/8/1888-home_default.jpg',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Climatiseur Réversible Samsung Cebu S2 Wifi', 
 'samsung-cebu-s2-wifi-20kw',
 'AR50F07C1AHNEU',
 'SAMSUNG',
 'Climatiseur réversible Samsung Cebu S2 avec Wifi intégré. Design élégant et performances optimales. Classe énergétique A++.',
 '2.0 kW',
 599.00,
 719.00,
 12,
 'https://www.climshop.com/img/p/1/8/5/5/1855-home_default.jpg',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Climatiseur Réversible Samsung AR35 Wifi', 
 'samsung-ar35-wifi-26kw',
 'AR40H09C1AMNEU',
 'SAMSUNG',
 'Climatiseur réversible Samsung AR35 avec Wifi intégré. Solution économique et fiable pour climatiser votre intérieur.',
 '2.6 kW',
 549.00,
 659.00,
 15,
 'https://www.climshop.com/img/p/1/8/4/1/1841-home_default.jpg',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Bi-split Samsung 4.0 kW avec Wifi', 
 'bi-split-samsung-40kw-wifi',
 'AJ040TXJ2KG/EU',
 'SAMSUNG',
 'Système bi-split Samsung 4.0 kW avec 2 unités intérieures et Wifi intégré. Idéal pour climatiser deux pièces avec une seule unité extérieure.',
 '4.0 kW',
 1249.00,
 1499.00,
 5,
 'https://www.climshop.com/img/p/1/8/2/2/1822-home_default.jpg',
 true,
 true);

-- Produits Daikin
INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Climatiseur Réversible Daikin Perfera', 
 'daikin-perfera-ftxm20a-rxm20a-20kw',
 'FTXM20A/RXM20A',
 'DAIKIN',
 'Climatiseur réversible Daikin Perfera 2 kW. Technologie inverter et filtration avancée. Design ultra-compact et silencieux.',
 '2.0 kW',
 999.00,
 1199.00,
 7,
 'https://www.climshop.com/img/p/1/8/0/6/1806-home_default.jpg',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Plafonnier Daikin Sky Air Advance', 
 'daikin-plafonnier-sky-air-advance-34kw',
 'FHA35A9/RXM35A9',
 'DAIKIN',
 'Plafonnier Daikin Sky Air Advance avec télécommande BRC1H52W. Idéal pour les espaces commerciaux et bureaux.',
 '3.4 kW',
 1799.00,
 2159.00,
 4,
 'https://www.climshop.com/img/p/1/1/8/0/1180-home_default.jpg',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Gainable Daikin Sky Air Advance', 
 'daikin-gainable-sky-air-advance-34kw',
 'FBA35A9/RXM35A9',
 'DAIKIN',
 'Climatisation gainable Daikin Sky Air Advance avec télécommande BRC1H52W. Installation discrète dans faux-plafond.',
 '3.4 kW',
 1699.00,
 2039.00,
 6,
 'https://www.climshop.com/img/p/1/1/7/4/1174-home_default.jpg',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Cassette Daikin Sky Air Advance 600x600', 
 'daikin-cassette-sky-air-600x600-25kw',
 'FFA25A9/RXM25A',
 'DAIKIN',
 'Cassette Daikin Sky Air Advance 600x600mm avec télécommande BRC1H52W. Design compact pour plafonds modulaires.',
 '2.5 kW',
 1599.00,
 1919.00,
 5,
 'https://www.climshop.com/img/p/1/2/5/5/1255-home_default.jpg',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Cassette Daikin Sky Air Advance 600x600 5kW', 
 'daikin-cassette-sky-air-600x600-50kw',
 'FFA50A9/RXM50A',
 'DAIKIN',
 'Cassette Daikin Sky Air Advance 600x600mm 5 kW avec télécommande BRC1H52W. Puissance élevée pour grands espaces.',
 '5.0 kW',
 2199.00,
 2639.00,
 3,
 'https://www.climshop.com/img/p/1/9/2/1/1921-home_default.jpg',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Gainable Daikin Sky Air Active 6.8 kW', 
 'daikin-gainable-sky-air-active-68kw',
 'ADEA71A/ARXM71A',
 'DAIKIN',
 'Climatisation gainable Daikin Sky Air Active haute puissance. Parfait pour grandes surfaces commerciales.',
 '6.8 kW',
 2699.00,
 3239.00,
 2,
 'https://www.climshop.com/img/p/1/9/4/2/1942-home_default.jpg',
 false,
 true);

-- Produits LG
INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Climatiseur LG Dualcool Premium', 
 'lg-dualcool-premium-25kw',
 'H09S1PA.NS1/U18',
 'LG',
 'Climatiseur réversible LG Dualcool Premium avec technologie Dual Inverter. Ultra silencieux et économe en énergie.',
 '2.5 kW',
 899.00,
 1079.00,
 10,
 'https://www.climshop.com/img/p/1/6/2/4/1624-home_default.jpg',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Climatiseur LG Artcool Gallery Special', 
 'lg-artcool-gallery-special-26kw',
 'A09GA1.NSE/U18',
 'LG',
 'Climatiseur design LG Artcool Gallery avec écran personnalisable. Transformez votre climatiseur en œuvre d''art.',
 '2.6 kW',
 1199.00,
 1439.00,
 6,
 'https://www.climshop.com/img/p/1/6/1/2/1612-home_default.jpg',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Tri-split LG 6.2 kW avec Wifi', 
 'tri-split-lg-62kw-wifi',
 'MU3R21.U23',
 'LG',
 'Système tri-split LG 6.2 kW avec 3 unités intérieures et Wifi intégré. Solution complète pour climatiser plusieurs pièces.',
 '6.2 kW',
 1899.00,
 2279.00,
 4,
 'https://www.climshop.com/img/p/1/9/1/2/1912-home_default.jpg',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Cassette LG Standard R32', 
 'lg-cassette-standard-r32-25kw',
 'CT09F.NR0/UUA1.ULO',
 'LG',
 'Cassette LG Standard R32 avec télécommande infrarouge. Solution économique pour climatisation commerciale.',
 '2.5 kW',
 1299.00,
 1559.00,
 8,
 'https://www.climshop.com/img/p/1/2/3/1/1231-home_default.jpg',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Plafonnier LG R32 5 kW', 
 'lg-plafonnier-r32-50kw',
 'UV18F.N10/UUB1.U20',
 'LG',
 'Plafonnier LG R32 haute puissance avec télécommande infrarouge. Parfait pour bureaux et commerces.',
 '5.0 kW',
 1699.00,
 2039.00,
 5,
 'https://www.climshop.com/img/p/1/2/0/8/1208-home_default.jpg',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Gainable LG Basse Pression', 
 'lg-gainable-basse-pression-25kw',
 'CL09F.N50/UUA1.UL0',
 'LG',
 'Climatisation gainable LG basse pression avec télécommande PREMTB001. Installation discrète et silencieuse.',
 '2.5 kW',
 1399.00,
 1679.00,
 7,
 'https://www.climshop.com/img/p/1/1/9/5/1195-home_default.jpg',
 false,
 true);

-- Produits Toshiba
INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Climatiseur Réversible Toshiba Yukai', 
 'toshiba-yukai-25kw',
 'RAS-B10E2KVG/RAS-10E2AVG-E',
 'TOSHIBA',
 'Climatiseur réversible Toshiba Yukai 2.5 kW. Excellent rapport qualité-prix avec technologie inverter.',
 '2.5 kW',
 649.00,
 779.00,
 12,
 'https://www.climshop.com/img/p/1/9/0/6/1906-home_default.jpg',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Climatiseur Réversible Toshiba Naka', 
 'toshiba-naka-15kw',
 'RAS-B05B2KVG/RAS-05B2AVG-E',
 'TOSHIBA',
 'Climatiseur réversible Toshiba Naka 1.5 kW. Compact et idéal pour petites pièces.',
 '1.5 kW',
 549.00,
 659.00,
 9,
 'https://www.climshop.com/img/p/1/5/9/4/1594-home_default.jpg',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Bi-split Toshiba 5.2 kW', 
 'bi-split-toshiba-52kw',
 'RAS-2M18G3AVG-E',
 'TOSHIBA',
 'Système bi-split Toshiba 5.2 kW avec 2 unités intérieures Yukai. Solution économique multi-zones.',
 '5.2 kW',
 1399.00,
 1679.00,
 6,
 'https://www.climshop.com/img/p/1/9/3/6/1936-home_default.jpg',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Gainable Compact Toshiba DI 5 kW', 
 'toshiba-gainable-compact-di-50kw',
 'RAV-HM561BTP-E/RAV-GM561ATP-E',
 'TOSHIBA',
 'Climatisation gainable compacte Toshiba DI série 1 avec télécommande RBC-AMSU52-E. Parfait pour rénovation.',
 '5.0 kW',
 1899.00,
 2279.00,
 4,
 'https://www.climshop.com/img/p/1/3/2/5/1325-home_default.jpg',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Plafonnier Toshiba DI 3.4 kW', 
 'toshiba-plafonnier-di-34kw',
 'RAV-HM401CTP-E/RAV-GM401ATP-E',
 'TOSHIBA',
 'Plafonnier Toshiba DI série 1 avec télécommande RBC-AMSU52-E. Design épuré pour espaces professionnels.',
 '3.4 kW',
 1599.00,
 1919.00,
 5,
 'https://www.climshop.com/img/p/1/3/0/1/1301-home_default.jpg',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Cassette Toshiba 4 voies 840x840 DI 5 kW', 
 'toshiba-cassette-4voies-840-di-50kw',
 'RAV-HM561UTP-E/RAV-GM561ATP-E',
 'TOSHIBA',
 'Cassette 4 voies Toshiba 840x840mm DI série 1 avec télécommande. Diffusion optimale dans grands espaces.',
 '5.0 kW',
 1999.00,
 2399.00,
 3,
 'https://www.climshop.com/img/p/1/2/7/3/1273-home_default.jpg',
 false,
 true);

-- Produits Mitsubishi
INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Climatiseur Réversible Mitsubishi HR', 
 'mitsubishi-hr-34kw',
 'MSZ-HR35VFK/MUZ-HR35VF',
 'MITSUBISHI',
 'Climatiseur réversible Mitsubishi HR 3.4 kW. Fiabilité japonaise et performances exceptionnelles.',
 '3.4 kW',
 899.00,
 1079.00,
 10,
 'https://www.climshop.com/img/p/1/9/0/0/1900-home_default.jpg',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Bi-split Mitsubishi MXZ 4.2 kW', 
 'bi-split-mitsubishi-mxz-42kw',
 'MXZ-2F42VF',
 'MITSUBISHI',
 'Système bi-split Mitsubishi 4.2 kW avec 2 unités MSZ-AY20VGK et accès Drive PRO inclus.',
 '4.2 kW',
 1699.00,
 2039.00,
 5,
 'https://www.climshop.com/img/p/1/9/2/7/1927-home_default.jpg',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Cassette Mitsubishi R32 PLA-M35EA2 3.6 kW', 
 'mitsubishi-cassette-r32-36kw',
 'PLA-M35EA2/SUZ-M35VA',
 'MITSUBISHI',
 'Cassette Mitsubishi R32 900x900mm avec télécommande PAR-SL100A-E. Qualité professionnelle.',
 '3.6 kW',
 2099.00,
 2519.00,
 4,
 'https://www.climshop.com/img/p/1/1/6/2/1162-home_default.jpg',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Plafonnier Mitsubishi R32 5 kW', 
 'mitsubishi-plafonnier-r32-50kw',
 'PCA-M50KA2/SUZ-M50VA',
 'MITSUBISHI',
 'Plafonnier Mitsubishi R32 avec télécommande PAC-YT52CRA. Haute performance pour espaces commerciaux.',
 '5.0 kW',
 2299.00,
 2759.00,
 3,
 'https://www.climshop.com/img/p/1/1/5/0/1150-home_default.jpg',
 false,
 true);

-- Produits Atlantic
INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Climatiseur Réversible Atlantic DOJO ECO R32', 
 'atlantic-dojo-eco-r32-26kw',
 'AS009DBB.UI/1U009DBRB.UE',
 'ATLANTIC',
 'Climatiseur réversible Atlantic DOJO ECO R32. Marque française fiable avec très bon rapport qualité-prix.',
 '2.6 kW',
 599.00,
 719.00,
 15,
 'https://www.climshop.com/img/p/1/8/9/4/1894-home_default.jpg',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Console Plafonnier Atlantic DOJO 5.2 kW', 
 'atlantic-console-plafonnier-dojo-52kw',
 'AC018DB.UI/1U018DC.UE',
 'ATLANTIC',
 'Console/Plafonnier Atlantic DOJO avec télécommande infrarouge. Polyvalent et performant.',
 '5.2 kW',
 1499.00,
 1799.00,
 6,
 'https://www.climshop.com/img/p/1/2/8/9/1289-home_default.jpg',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Cassette Atlantic DOJO 600x600 3.5 kW', 
 'atlantic-cassette-dojo-600-35kw',
 'AB012DB.UI/1U012DC.UE',
 'ATLANTIC',
 'Cassette Atlantic DOJO 600x600mm avec télécommande infrarouge. Format standard pour faux-plafonds.',
 '3.5 kW',
 1399.00,
 1679.00,
 7,
 'https://www.climshop.com/img/p/1/2/8/1/1281-home_default.jpg',
 false,
 true);

-- Produits Airwell
INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Console Monobloc Réversible Airwell', 
 'airwell-console-monobloc-reversible-235kw',
 'XDAW-023R-09M25',
 'AIRWELL',
 'Console monobloc réversible inverter Airwell. Se pose au sol et chauffe/refroidit sans unité extérieure.',
 '2.35 kW',
 1199.00,
 1439.00,
 5,
 'https://www.climshop.com/img/p/1/8/8/2/1882-home_default.jpg',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Quadri-split Airwell 10.5 kW', 
 'airwell-quadri-split-105kw',
 'ZDAA-4090-09M25',
 'AIRWELL',
 'Système quadri-split Airwell 10.5 kW avec 4 unités intérieures. Solution multi-zones économique.',
 '10.5 kW',
 2799.00,
 3359.00,
 2,
 'https://www.climshop.com/img/p/1/9/3/0/1930-home_default.jpg',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Gainable Airwell Moyenne Pression 7 kW', 
 'airwell-gainable-moyenne-pression-70kw',
 'DDMX070N-09M25/YDAX-070H-09M25',
 'AIRWELL',
 'Climatisation gainable Airwell moyenne pression avec télécommande RCW11. Idéal pour grands volumes.',
 '7.03 kW',
 2199.00,
 2639.00,
 4,
 'https://www.climshop.com/img/p/1/8/7/6/1876-home_default.jpg',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Gainable Airwell Moyenne Pression 3.5 kW', 
 'airwell-gainable-moyenne-pression-35kw',
 'DDMX035N-09M25/YDAX-035H-09M25',
 'AIRWELL',
 'Climatisation gainable Airwell moyenne pression avec télécommande RCW11. Format compact.',
 '3.52 kW',
 1399.00,
 1679.00,
 6,
 'https://www.climshop.com/img/p/1/1/4/3/1143-home_default.jpg',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Cassette Airwell 360° R32 3.5 kW', 
 'airwell-cassette-360-r32-35kw',
 'CDMX-035N-09M25/YDAX-035H-09M25',
 'AIRWELL',
 'Cassette 360° Airwell R32 avec télécommande RC18. Diffusion circulaire homogène.',
 '3.52 kW',
 1599.00,
 1919.00,
 5,
 'https://www.climshop.com/img/p/1/1/3/1/1131-home_default.jpg',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Allège Plafonnier Airwell 5.28 kW', 
 'airwell-allege-plafonnier-528kw',
 'FDMX-050N-09M25/YDAX-050H-09M25',
 'AIRWELL',
 'Allège-plafonnier Airwell avec télécommande RC18. Double installation possible.',
 '5.28 kW',
 1699.00,
 2039.00,
 4,
 'https://www.climshop.com/img/p/1/1/1/9/1119-home_default.jpg',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Allège Plafonnier Basse Température Airwell', 
 'airwell-allege-plafonnier-basse-temp-53kw',
 'FDLK-050N-09M25/YDAK-050R-09M25',
 'AIRWELL',
 'Allège-plafonnier basse température Airwell. Idéal pour chauffage hivernal performant.',
 '5.3 kW',
 1899.00,
 2279.00,
 3,
 'https://www.climshop.com/img/p/1/3/1/3/1313-home_default.jpg',
 false,
 true);

-- Produits Spéciaux
INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Climatiseur de Cave à Vin Winemaster Fondis C25X', 
 'winemaster-fondis-cave-vin-c25x',
 'WINE-C25X',
 'FONDIS',
 'Climatiseur de cave à vin encastrable Winemaster Fondis. Température et hygrométrie parfaites pour vos vins.',
 '500 W',
 1299.00,
 1559.00,
 3,
 'https://www.climshop.com/img/p/1/9/1/5/1915-home_default.jpg',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'climatisation'), 
 'Climatiseur Window Airwell 3.7 kW', 
 'airwell-window-37kw',
 'AWWR-WFAE-035C',
 'AIRWELL',
 'Climatiseur fenêtre Airwell. Installation simple, idéal pour locaux sans possibilité d''unité extérieure.',
 '3.70 kW',
 799.00,
 959.00,
 8,
 'https://www.climshop.com/img/p/1/9/3/3/1933-home_default.jpg',
 false,
 true);

-- ================================================
-- Accessoires
-- ================================================

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'accessoires'), 
 'Couronne Tube Frigorifique Isolée PRO', 
 'couronne-tube-frigorifique-isolee-pro',
 'TUBE-FRIGO-PRO',
 'GENERIQUE',
 'Couronne de tube frigorifique isolée M1 - 3, 5 ou 10 m (1/4 3/8 et 1/4 1/2). Qualité PRO certifiée.',
 NULL,
 79.00,
 95.00,
 25,
 'https://www.climshop.com/img/p/1/7/7/9/1779-home_default.jpg',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'accessoires'), 
 'Goulotte Clim Artiplastic Blanche 2m', 
 'goulotte-clim-artiplastic-blanche-2m',
 'GOULOTTE-BLANC-2M',
 'ARTIPLASTIC',
 'Goulotte clim Artiplastic blanche 2 mètres. Disponible en 60x45, 80x60, 110x75mm.',
 NULL,
 29.00,
 35.00,
 50,
 'https://www.climshop.com/img/p/1/5/4/0/1540-home_default.jpg',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'accessoires'), 
 'Purificateur d''Air Mitsubishi HEPA 14', 
 'mitsubishi-purificateur-air-hepa14',
 'MA-E85R-E',
 'MITSUBISHI',
 'Purificateur d''air Hepa 14 Mitsubishi Electric. Filtration ultra-fine pour air sain.',
 NULL,
 399.00,
 479.00,
 10,
 'https://www.climshop.com/img/p/1/3/5/1/1351-home_default.jpg',
 true,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'accessoires'), 
 'Interface Wi-Fi Toshiba', 
 'interface-wifi-toshiba',
 'RB-N105S-G',
 'TOSHIBA',
 'Interface Wi-Fi pour climatisations Toshiba. Contrôle à distance via smartphone.',
 NULL,
 99.00,
 119.00,
 15,
 'https://www.climshop.com/img/p/1/3/4/3/1343-home_default.jpg',
 false,
 true);

INSERT INTO produits (categorie_id, nom, slug, reference, marque, description, puissance, prix_ht, prix_ttc, stock, image_principale, en_vedette, actif) VALUES
((SELECT id FROM categories WHERE slug = 'accessoires'), 
 'Hub Cozytouch Atlantic Wi-Fi', 
 'hub-cozytouch-atlantic-wifi',
 'COZYTOUCH-HUB',
 'ATLANTIC',
 'Interface Wi-Fi Hub Cozytouch Atlantic. Pilotez votre climatisation Atlantic à distance.',
 NULL,
 129.00,
 155.00,
 12,
 'https://www.climshop.com/img/p/1/0/8/5/1085-home_default.jpg',
 false,
 true);

-- ================================================
-- Vérification de l'insertion
-- ================================================
-- SELECT COUNT(*) as total_produits FROM produits;
-- SELECT marque, COUNT(*) as nombre FROM produits GROUP BY marque ORDER BY nombre DESC;
