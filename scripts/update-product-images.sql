-- ================================================
-- Script de mise à jour des images produits
-- Met à jour uniquement image_principale pour les produits existants
-- ================================================

-- Samsung
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/8/8/8/1888-home_default.jpg' WHERE marque = 'SAMSUNG' AND nom ILIKE '%WindFree%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/8/5/5/1855-home_default.jpg' WHERE marque = 'SAMSUNG' AND nom ILIKE '%Cebu%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/8/4/1/1841-home_default.jpg' WHERE marque = 'SAMSUNG' AND nom ILIKE '%AR35%';

-- Daikin
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/8/0/6/1806-home_default.jpg' WHERE marque = 'DAIKIN' AND nom ILIKE '%Perfera%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/1/8/0/1180-home_default.jpg' WHERE marque = 'DAIKIN' AND nom ILIKE '%Plafonnier%Sky Air%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/1/7/4/1174-home_default.jpg' WHERE marque = 'DAIKIN' AND nom ILIKE '%Gainable%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/2/5/5/1255-home_default.jpg' WHERE marque = 'DAIKIN' AND nom ILIKE '%Cassette%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/9/2/1/1921-home_default.jpg' WHERE marque = 'DAIKIN' AND nom ILIKE '%Sensira%';

-- LG
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/6/2/4/1624-home_default.jpg' WHERE marque = 'LG' AND nom ILIKE '%Dualcool%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/6/1/2/1612-home_default.jpg' WHERE marque = 'LG' AND nom ILIKE '%Artcool%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/2/3/1/1231-home_default.jpg' WHERE marque = 'LG' AND nom ILIKE '%Cassette%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/2/0/8/1208-home_default.jpg' WHERE marque = 'LG' AND nom ILIKE '%Plafonnier%';

-- Toshiba
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/9/0/6/1906-home_default.jpg' WHERE marque = 'TOSHIBA' AND nom ILIKE '%Yukai%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/5/9/4/1594-home_default.jpg' WHERE marque = 'TOSHIBA' AND nom ILIKE '%Naka%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/3/2/5/1325-home_default.jpg' WHERE marque = 'TOSHIBA' AND nom ILIKE '%Gainable%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/3/0/1/1301-home_default.jpg' WHERE marque = 'TOSHIBA' AND nom ILIKE '%Plafonnier%';

-- Mitsubishi
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/9/0/0/1900-home_default.jpg' WHERE marque = 'MITSUBISHI' AND nom ILIKE '%HR%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/1/6/2/1162-home_default.jpg' WHERE marque = 'MITSUBISHI' AND nom ILIKE '%Cassette%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/1/5/0/1150-home_default.jpg' WHERE marque = 'MITSUBISHI' AND nom ILIKE '%Plafonnier%';

-- Atlantic / Fujitsu Atlantic
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/8/9/4/1894-home_default.jpg' WHERE marque ILIKE '%ATLANTIC%' AND nom ILIKE '%DOJO%ECO%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/2/8/9/1289-home_default.jpg' WHERE marque ILIKE '%ATLANTIC%' AND nom ILIKE '%Console%Plafonnier%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/2/8/1/1281-home_default.jpg' WHERE marque ILIKE '%ATLANTIC%' AND nom ILIKE '%Cassette%';

-- Airwell
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/8/8/2/1882-home_default.jpg' WHERE marque = 'AIRWELL' AND nom ILIKE '%Console%Monobloc%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/8/7/6/1876-home_default.jpg' WHERE marque = 'AIRWELL' AND nom ILIKE '%Gainable%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/1/3/1/1131-home_default.jpg' WHERE marque = 'AIRWELL' AND nom ILIKE '%Cassette%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/1/1/9/1119-home_default.jpg' WHERE marque = 'AIRWELL' AND nom ILIKE '%Plafonnier%';

-- GREE (images génériques de climatiseurs)
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/8/0/6/1806-home_default.jpg' WHERE marque = 'GREE' AND nom ILIKE '%Mural%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/3/2/5/1325-home_default.jpg' WHERE marque = 'GREE' AND nom ILIKE '%Gainable%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/2/5/5/1255-home_default.jpg' WHERE marque = 'GREE' AND nom ILIKE '%Cassette%';

-- Pompes à chaleur
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/9/0/0/1900-home_default.jpg' WHERE nom ILIKE '%Pompe%Chaleur%Air-Air%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/9/2/7/1927-home_default.jpg' WHERE nom ILIKE '%Pompe%Chaleur%Air-Eau%';

-- Accessoires
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/7/7/9/1779-home_default.jpg' WHERE nom ILIKE '%Tube%Frigorifique%' OR nom ILIKE '%Gaine%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/5/4/0/1540-home_default.jpg' WHERE nom ILIKE '%Goulotte%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/3/5/1/1351-home_default.jpg' WHERE nom ILIKE '%Purificateur%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/3/4/3/1343-home_default.jpg' WHERE nom ILIKE '%Wi-Fi%' OR nom ILIKE '%Wifi%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/0/8/5/1085-home_default.jpg' WHERE nom ILIKE '%Thermostat%' OR nom ILIKE '%Cozytouch%';
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/3/4/3/1343-home_default.jpg' WHERE nom ILIKE '%Télécommande%';

-- Adoucisseurs / Traitement eau
UPDATE produits SET image_principale = 'https://www.climshop.com/img/p/1/0/8/5/1085-home_default.jpg' WHERE nom ILIKE '%Adoucisseur%' OR nom ILIKE '%Anti-Calcaire%';

-- ================================================
-- Vérification
-- ================================================
-- SELECT nom, marque, image_principale FROM produits WHERE image_principale IS NOT NULL LIMIT 20;
