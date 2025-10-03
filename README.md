# TeaBlend - E-commerce de Thés et Infusions

Site e-commerce moderne pour la vente de thés, infusions et accessoires avec une fonctionnalité unique de personnalisation de mélanges.

## 🌟 Fonctionnalités

### E-commerce Complet
- Catalogue de produits avec filtres par catégorie
- Système de panier et gestion des commandes
- Pages produits détaillées avec avis clients
- Système d'authentification utilisateur
- Gestion des comptes clients

### Personnalisation de Mélanges
- **Créateur de mélanges personnalisés** avec plus de 30 ingrédients
- Sélection intelligente : 1 base + jusqu'à 4-5 ingrédients selon le type
- Calcul automatique des prix avec suppléments pour ingrédients premium
- Affichage des bénéfices et avertissements pour chaque ingrédient
- Sélecteur de quantité (25g à 500g) avec économies sur gros volumes

### Interface Moderne
- Design responsive avec Tailwind CSS
- Composants UI avec Radix UI
- Animations fluides et transitions
- Style "Liquid Glass" pour certains éléments
- Couleurs thématiques (violet et vert)

### Fonctionnalités Avancées
- Barre d'annonces personnalisable
- Système de recherche avec modal
- Blog intégré
- Page FAQ complète
- Section accessoires
- Newsletter et contact

## 🛠️ Technologies

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **State Management**: React Context
- **Routing**: React Router DOM

## 🚀 Installation

```bash
# Cloner le repository
git clone https://github.com/Nymeraa/site-manus.git
cd site-manus

# Installer les dépendances
pnpm install

# Lancer en développement
pnpm run dev

# Build pour production
pnpm run build
```

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants UI de base
│   ├── Header.jsx      # En-tête avec navigation
│   ├── Footer.jsx      # Pied de page
│   └── ...
├── pages/              # Pages principales
│   ├── Home.jsx        # Page d'accueil
│   ├── Catalog.jsx     # Catalogue produits
│   ├── CustomBlend.jsx # Personnalisateur de mélanges
│   ├── Account.jsx     # Gestion compte
│   └── ...
├── context/            # Contextes React
│   ├── CartContext.jsx # Gestion panier
│   └── AuthContext.jsx # Authentification
├── data/               # Données statiques
│   ├── products.js     # Produits du catalogue
│   ├── customBlendIngredients.js # Ingrédients personnalisation
│   └── ...
└── App.jsx            # Composant principal
```

## 🎨 Personnalisation des Mélanges

Le système de personnalisation permet de créer des mélanges uniques :

### Bases Disponibles
- Infusion (sans théine)
- Thé Noir, Vert, Blanc
- Rooibos, Matcha, Maté Vert

### Ingrédients par Catégorie
- **Fruits** : Pomme, Orange, Citron, Fraise, Baies de Goji...
- **Fleurs** : Lavande, Camomille, Hibiscus, Pétales de rose...
- **Herbes & Plantes** : Menthe, Citronnelle, Verveine, Mélisse...
- **Épices** : Cannelle, Gingembre, Cardamome, Ginseng...

### Logique de Sélection
- **Avec base classique** : 1 base + max 4 ingrédients
- **Sans base** : max 5 ingrédients → sélection auto de "Infusion"
- **Matcha** : peut être ajouté en complément d'une autre base

## 💰 Système de Prix

- Prix de base selon quantité : 3,50€ (25g) à 53,90€ (500g)
- Suppléments pour ingrédients premium (cardamome, thé blanc, etc.)
- Calcul automatique des économies sur gros volumes
- Affichage du prix au 100g

## 🔧 Configuration

Le projet utilise :
- **Tailwind CSS** avec configuration personnalisée
- **Vite** pour le build et développement
- **ESLint** pour la qualité du code
- **Composants UI** pré-configurés avec Radix

## 📝 Licence

Ce projet est sous licence MIT.

## 👥 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou proposer une pull request.
