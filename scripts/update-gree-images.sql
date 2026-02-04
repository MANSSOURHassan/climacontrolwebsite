-- ================================================
-- Script de mise à jour des images GREE
-- Met à jour image_principale pour les produits existants
-- ================================================

-- Mettre à jour les images pour les produits GREE existants
UPDATE produits SET image_principale = 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/pular-1.png'
WHERE marque = 'GREE' AND (nom ILIKE '%Pular%');

UPDATE produits SET image_principale = 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/fairy-1.png'
WHERE marque = 'GREE' AND (nom ILIKE '%Fairy%' OR nom ILIKE '%Fair %');

UPDATE produits SET image_principale = 'https://global.gree.com/Public/Uploads/uploadfile/images/20220912/hansol-1.png'
WHERE marque = 'GREE' AND (nom ILIKE '%Clivia%' OR nom ILIKE '%Hansol%');

UPDATE produits SET image_principale = 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/soyal-1.png'
WHERE marque = 'GREE' AND (nom ILIKE '%Soyal%' OR nom ILIKE '%Charmo%');

UPDATE produits SET image_principale = 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/console-1.png'
WHERE marque = 'GREE' AND nom ILIKE '%Console%';

UPDATE produits SET image_principale = 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/multi-1.png'
WHERE marque = 'GREE' AND (nom ILIKE '%Free Match%' OR nom ILIKE '%Bi-split%' OR nom ILIKE '%Tri-split%' OR nom ILIKE '%Quadri%' OR nom ILIKE '%Penta%');

UPDATE produits SET image_principale = 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/ducted-1.png'
WHERE marque = 'GREE' AND nom ILIKE '%Gainable%';

UPDATE produits SET image_principale = 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/cassette-1.png'
WHERE marque = 'GREE' AND nom ILIKE '%Cassette%';

UPDATE produits SET image_principale = 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/floor-ceiling-1.png'
WHERE marque = 'GREE' AND (nom ILIKE '%Allège%' OR nom ILIKE '%Plafonnier%');

UPDATE produits SET image_principale = 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/versati-1.png'
WHERE marque = 'GREE' AND nom ILIKE '%Versati%';

UPDATE produits SET image_principale = 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/water-heater-1.png'
WHERE marque = 'GREE' AND nom ILIKE '%Aeros%';

UPDATE produits SET image_principale = 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/gmv6-1.png'
WHERE marque = 'GREE' AND nom ILIKE '%GMV%';

UPDATE produits SET image_principale = 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/wifi-1.png'
WHERE marque = 'GREE' AND nom ILIKE '%Wifi%';

UPDATE produits SET image_principale = 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/remote-1.png'
WHERE marque = 'GREE' AND nom ILIKE '%Télécommande%' AND nom NOT ILIKE '%Filaire%';

UPDATE produits SET image_principale = 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/wired-remote-1.png'
WHERE marque = 'GREE' AND nom ILIKE '%Télécommande%Filaire%';

UPDATE produits SET image_principale = 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/pipe-1.png'
WHERE marque = 'GREE' AND nom ILIKE '%Liaison%Frigorifique%';

UPDATE produits SET image_principale = 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/trunking-1.png'
WHERE marque = 'GREE' AND nom ILIKE '%Goulotte%';

UPDATE produits SET image_principale = 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/bracket-1.png'
WHERE marque = 'GREE' AND nom ILIKE '%Support%';

UPDATE produits SET image_principale = 'https://global.gree.com/Public/Uploads/uploadfile/images/20220629/filter-1.png'
WHERE marque = 'GREE' AND nom ILIKE '%Filtre%';

-- Vérification
SELECT nom, image_principale FROM produits WHERE marque = 'GREE' LIMIT 20;
