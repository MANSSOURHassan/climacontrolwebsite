# Comment trouver et utiliser .env.local

## Emplacement du fichier

Le fichier `.env.local` se trouve à la **RACINE** de votre projet :

```
votre-projet-climacontrol/
│
├── 📄 .env.local              ⬅️ VOICI LE FICHIER !
├── 📄 .env.example
├── 📄 .gitignore
├── 📄 package.json
├── 📄 next.config.mjs
├── 📄 climacontrol.sql
├── 📄 README.md
│
├── 📁 app/
├── 📁 components/
├── 📁 lib/
├── 📁 public/
├── 📁 cypress/
└── 📁 database/
```

## Pourquoi vous ne le voyez pas ?

### Raison 1 : Fichiers cachés
Les fichiers qui commencent par un point (`.`) sont **cachés par défaut**.

**Windows :**
1. Ouvrez l'Explorateur de fichiers
2. Cliquez sur **Affichage** → **Afficher** → Cochez **Éléments masqués**

**Mac :**
1. Dans Finder, appuyez sur **CMD + SHIFT + .** (point)

**VS Code :**
Le fichier devrait être visible directement dans l'explorateur de fichiers à gauche.

### Raison 2 : Vous êtes dans v0 (navigateur)
Si vous travaillez encore dans v0 en ligne, vous devez d'abord **télécharger le projet** :
1. Cliquez sur les 3 points en haut à droite
2. **Download ZIP**
3. Extrayez le ZIP sur votre ordinateur
4. Ouvrez le dossier extrait

## Vérifier que le fichier existe

### Option 1 : Ligne de commande
```bash
# Windows (PowerShell)
dir .env.local

# Mac/Linux
ls -la .env.local
```

### Option 2 : VS Code
1. Ouvrez le dossier du projet dans VS Code
2. Le fichier `.env.local` apparaît dans l'arborescence à gauche
3. Double-cliquez pour l'ouvrir

## Contenu actuel du fichier

Votre fichier `.env.local` contient déjà la configuration pour XAMPP :

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=climacontrol
DB_USER=root
DB_PASSWORD=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Étapes suivantes

### 1. Démarrer XAMPP
- Lancez XAMPP Control Panel
- Démarrez **Apache** et **MySQL**

### 2. Importer la base de données
- Ouvrez http://localhost/phpmyadmin
- Cliquez sur "Importer"
- Sélectionnez le fichier `climacontrol.sql`
- Cliquez sur "Exécuter"

### 3. Démarrer le site
```bash
npm install
npm run dev
```

### 4. Tester la connexion
Ouvrez votre navigateur : http://localhost:3000/api/test-db

Vous devriez voir :
```json
{
  "success": true,
  "message": "Database connected successfully"
}
```

### 5. Lancer les tests Cypress
```bash
npm run cypress:open
```

## Dépannage

### Le fichier n'existe toujours pas ?
Créez-le manuellement :
1. Ouvrez votre éditeur de code (VS Code, Notepad++, etc.)
2. Créez un nouveau fichier nommé `.env.local` à la racine
3. Copiez le contenu ci-dessus
4. Sauvegardez

### Mot de passe XAMPP différent ?
Si vous avez défini un mot de passe pour MySQL dans XAMPP, modifiez la ligne :
```env
DB_PASSWORD=votre_mot_de_passe
```

## Questions fréquentes

**Q : Dois-je créer ce fichier à chaque fois ?**
Non, une fois créé, il reste dans votre projet.

**Q : Pourquoi .env.local et pas .env ?**
`.env.local` est spécifique à votre machine locale et n'est jamais envoyé sur GitHub (sécurité).

**Q : Puis-je le renommer ?**
Non, Next.js cherche spécifiquement `.env.local` pour le développement local.

**Q : Est-ce que ce fichier ira sur Vercel ?**
Non, sur Vercel vous ajouterez les variables d'environnement via l'interface web de Vercel.
