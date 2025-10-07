# Instructions de Lancement - TeaBlend (Branch-7)

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé sur votre système :

- **Node.js** version 18 ou supérieure ([télécharger ici](https://nodejs.org/))
- **pnpm** (gestionnaire de paquets)

Pour installer pnpm globalement :
```bash
npm install -g pnpm
```

## 🚀 Installation et Lancement

### Étape 1 : Cloner le Dépôt

Clonez le dépôt GitHub et basculez sur la branche `branch-7` :

```bash
git clone https://github.com/Nymeraa/site-manus.git
cd site-manus
git checkout branch-7
```

### Étape 2 : Installer les Dépendances

Installez toutes les dépendances nécessaires avec pnpm :

```bash
pnpm install
```

Cette commande va installer :
- React 19
- Vite
- Tailwind CSS
- Radix UI
- React Router DOM
- Lucide React
- Et toutes les autres dépendances listées dans `package.json`

L'installation prend généralement moins d'une minute.

### Étape 3 : Lancer le Serveur de Développement

Démarrez le serveur de développement :

```bash
pnpm run dev
```

Le site sera accessible à l'adresse : **http://localhost:5173**

Le navigateur devrait s'ouvrir automatiquement. Si ce n'est pas le cas, ouvrez manuellement l'URL dans votre navigateur.

## 🎯 Commandes Disponibles

### Développement
```bash
pnpm run dev
```
Lance le serveur de développement avec rechargement à chaud (hot reload).

### Build de Production
```bash
pnpm run build
```
Crée une version optimisée pour la production dans le dossier `dist/`.

### Prévisualisation de Production
```bash
pnpm run preview
```
Prévisualise localement la version de production après avoir exécuté `pnpm run build`.

### Vérification du Code
```bash
pnpm run lint
```
Exécute ESLint pour vérifier la qualité du code.

## 📁 Structure du Projet

```
site-manus/
├── src/                      # Code source
│   ├── components/          # Composants réutilisables
│   │   ├── ui/             # Composants UI de base
│   │   ├── Header.jsx      # En-tête avec navigation
│   │   ├── Footer.jsx      # Pied de page
│   │   ├── MegaMenu.jsx    # Mega menus
│   │   └── ...
│   ├── pages/              # Pages de l'application
│   │   ├── Home.jsx        # Page d'accueil
│   │   ├── Catalog.jsx     # Catalogue
│   │   ├── CustomBlend.jsx # Créateur de mélanges
│   │   ├── Accessories.jsx # Accessoires
│   │   └── ...
│   ├── context/            # Contextes React
│   │   ├── CartContext.jsx # Gestion du panier
│   │   └── AuthContext.jsx # Authentification
│   ├── data/               # Données statiques
│   │   ├── products.js     # Produits
│   │   └── customBlendIngredients.js # Ingrédients
│   └── App.jsx            # Composant principal
├── public/                 # Fichiers statiques
├── dist/                   # Build de production (généré)
├── package.json           # Dépendances et scripts
├── vite.config.js         # Configuration Vite
├── tailwind.config.js     # Configuration Tailwind
└── README.md              # Documentation principale
```

## 🌟 Fonctionnalités Disponibles

### Navigation
- **Page d'accueil** : Présentation de TeaBlend
- **Catalogue** : Tous les thés et infusions
- **Catégories** : Thé Noir, Thé Vert, Thé Blanc, Infusions, etc.
- **Créateur de mélanges** : Composez votre thé personnalisé
- **Accessoires** : Théières, tasses, etc.
- **Blog** : Articles sur l'univers du thé
- **FAQ** : Questions fréquentes
- **Contact** : Formulaire de contact

### Fonctionnalités Interactives
- ✅ Mega menus modernes
- ✅ Système de panier avec notifications
- ✅ Filtres par catégorie
- ✅ Créateur de mélanges avec 30+ ingrédients
- ✅ Calcul automatique des prix
- ✅ Design responsive (mobile, tablette, desktop)

## 🔧 Résolution de Problèmes

### Le serveur ne démarre pas
- Vérifiez que Node.js est installé : `node --version`
- Vérifiez que pnpm est installé : `pnpm --version`
- Supprimez `node_modules` et réinstallez : `rm -rf node_modules && pnpm install`

### Port 5173 déjà utilisé
Si le port 5173 est déjà utilisé, Vite utilisera automatiquement le port suivant disponible (5174, 5175, etc.).

### Erreurs de dépendances
Si vous rencontrez des erreurs liées aux dépendances :
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Le site ne s'affiche pas correctement
- Videz le cache du navigateur (Ctrl+Shift+R ou Cmd+Shift+R)
- Vérifiez la console du navigateur pour les erreurs (F12)

## 📝 Notes Importantes

- **Branche** : Cette version correspond à la branche `branch-7` du dépôt
- **Environnement** : Site de démonstration (pas de backend réel)
- **Données** : Toutes les données sont statiques (fichiers JavaScript)
- **Panier** : Les données du panier sont stockées en mémoire (perdues au rechargement)

## 🔗 Liens Utiles

- **Dépôt GitHub** : https://github.com/Nymeraa/site-manus
- **Documentation React** : https://react.dev/
- **Documentation Vite** : https://vitejs.dev/
- **Documentation Tailwind CSS** : https://tailwindcss.com/
- **Documentation Radix UI** : https://www.radix-ui.com/

## 💡 Conseils de Développement

### Rechargement à Chaud
Le serveur de développement Vite supporte le rechargement à chaud (HMR). Toute modification du code sera immédiatement visible dans le navigateur sans rechargement complet de la page.

### Outils de Développement React
Installez l'extension **React Developer Tools** pour Chrome ou Firefox pour inspecter les composants React et leur état.

### Formatage du Code
Pour maintenir un code propre, vous pouvez installer Prettier :
```bash
pnpm add -D prettier
```

### Variables d'Environnement
Pour ajouter des variables d'environnement, créez un fichier `.env.local` à la racine du projet :
```
VITE_API_URL=https://api.example.com
```

Accédez-y dans le code avec `import.meta.env.VITE_API_URL`.

## 🎨 Personnalisation

### Couleurs
Les couleurs principales sont définies dans `tailwind.config.js`. Modifiez-les pour personnaliser le thème :
```javascript
theme: {
  extend: {
    colors: {
      primary: '#8B5CF6',  // Violet
      secondary: '#10B981', // Vert
    }
  }
}
```

### Produits
Ajoutez ou modifiez les produits dans `src/data/products.js`.

### Ingrédients
Ajoutez ou modifiez les ingrédients dans `src/data/customBlendIngredients.js`.

## 📞 Support

Pour toute question ou problème :
1. Consultez d'abord le README.md principal
2. Vérifiez les issues GitHub existantes
3. Créez une nouvelle issue si nécessaire

## ✅ Checklist de Démarrage

- [ ] Node.js 18+ installé
- [ ] pnpm installé
- [ ] Dépôt cloné
- [ ] Branche branch-7 active
- [ ] Dépendances installées (`pnpm install`)
- [ ] Serveur de développement lancé (`pnpm run dev`)
- [ ] Site accessible sur http://localhost:5173
- [ ] Navigation testée
- [ ] Panier testé
- [ ] Créateur de mélanges testé

Bon développement ! 🚀
