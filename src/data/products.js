export const products = [
  {
    id: 1,
    name: "Earl Grey Classique",
    category: "Thé Noir",
    image: "/src/assets/the_infusion_ecommerce.webp",
    description: "Un thé noir parfumé à la bergamote, aux notes d'agrumes rafraîchissantes.",
    origin: "Sri Lanka",
    brewingTime: "3-5 minutes",
    temperature: "95°C",
    ingredients: ["Thé noir", "Huile de bergamote", "Pétales de bleuet"],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 127,
    grammages: [
      { quantity: 50, unit: "g", price: 12.50 },
      { quantity: 100, unit: "g", price: 24.90 },
      { quantity: 250, unit: "g", price: 59.90 }
    ]
  },
  {
    id: 2,
    name: "Dragon Well",
    category: "Thé Vert",
    image: "/src/assets/packaging_the_design.jpg",
    description: "Thé vert chinois délicat aux notes végétales et douces.",
    origin: "Chine - Hangzhou",
    brewingTime: "2-3 minutes",
    temperature: "80°C",
    ingredients: ["Thé vert"],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: 89,
    grammages: [
      { quantity: 50, unit: "g", price: 16.50 },
      { quantity: 100, unit: "g", price: 32.50 },
      { quantity: 250, unit: "g", price: 79.90 }
    ]
  },
  {
    id: 3,
    name: "Camomille Douce",
    category: "Infusion",
    image: "/src/assets/personnalisation_the_1.png",
    description: "Infusion apaisante de fleurs de camomille, parfaite pour la détente.",
    origin: "France",
    brewingTime: "5-7 minutes",
    temperature: "100°C",
    ingredients: ["Fleurs de camomille"],
    inStock: true,
    featured: false,
    rating: 4.6,
    reviews: 203,
    grammages: [
      { quantity: 50, unit: "g", price: 9.50 },
      { quantity: 100, unit: "g", price: 18.90 },
      { quantity: 250, unit: "g", price: 45.00 }
    ]
  },
  {
    id: 4,
    name: "Mélange Épicé",
    category: "Thé Noir",
    image: "/src/assets/personnalisation_the_2.png",
    description: "Thé noir aux épices orientales : cannelle, cardamome et gingembre.",
    origin: "Inde",
    brewingTime: "4-5 minutes",
    temperature: "95°C",
    ingredients: ["Thé noir", "Cannelle", "Cardamome", "Gingembre", "Clous de girofle"],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: 156,
    grammages: [
      { quantity: 50, unit: "g", price: 14.50 },
      { quantity: 100, unit: "g", price: 28.90 },
      { quantity: 250, unit: "g", price: 69.90 }
    ]
  },
  {
    id: 5,
    name: "Jasmin Phoenix Pearls",
    category: "Thé Vert",
    image: "/src/assets/the_infusion_ecommerce.webp",
    description: "Thé vert roulé en perles et parfumé aux fleurs de jasmin.",
    origin: "Chine - Fujian",
    brewingTime: "2-3 minutes",
    temperature: "75°C",
    ingredients: ["Thé vert", "Fleurs de jasmin"],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: 67,
    grammages: [
      { quantity: 50, unit: "g", price: 23.00 },
      { quantity: 100, unit: "g", price: 45.00 },
      { quantity: 250, unit: "g", price: 109.00 }
    ]
  },
  {
    id: 6,
    name: "Rooibos Vanille",
    category: "Infusion",
    image: "/src/assets/packaging_the_design.jpg",
    description: "Rooibos sud-africain naturellement sans caféine, parfumé à la vanille.",
    origin: "Afrique du Sud",
    brewingTime: "5-7 minutes",
    temperature: "100°C",
    ingredients: ["Rooibos", "Arôme naturel de vanille"],
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: 94,
    grammages: [
      { quantity: 50, unit: "g", price: 11.50 },
      { quantity: 100, unit: "g", price: 22.50 },
      { quantity: 250, unit: "g", price: 54.00 }
    ]
  },
  {
    id: 7,
    name: "Pack Découverte Thés du Monde",
    category: "Nos Packs",
    image: "/src/assets/pack_decouverte.png",
    description: "Un assortiment de 3 thés d'exception pour un voyage gustatif.",
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: 25,
    price: 39.90
  },
  {
    id: 8,
    name: "Pack Infusion Détente & Sommeil",
    category: "Nos Packs",
    image: "/src/assets/pack_detente.png",
    description: "Deux infusions apaisantes et un infuseur pour des nuits sereines.",
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: 18,
    price: 29.90
  }
]


export const blendIngredients = [
  {
    id: 1,
    name: "Thé Noir",
    type: "base",
    price: 2.00,
    description: "Base corsée et robuste"
  },
  {
    id: 2,
    name: "Thé Vert Sencha",
    type: "base",
    price: 2.50,
    description: "Base délicate et végétale"
  },
  {
    id: 3,
    name: "Thé Blanc",
    type: "base",
    price: 3.00,
    description: "Base subtile et raffinée"
  },
  {
    id: 4,
    name: "Rooibos",
    type: "base",
    price: 1.80,
    description: "Base sans caféine, douce et fruitée"
  },
  {
    id: 5,
    name: "Maté Vert",
    type: "base",
    price: 2.20,
    description: "Base énergisante et légèrement amère"
  },
  {
    id: 6,
    name: "Baies de Goji",
    type: "fruit",
    price: 2.50,
    description: "Superfruit aux notes acidulées"
  },
  {
    id: 7,
    name: "Cynorrhodon (Églantier)",
    type: "fruit",
    price: 1.80,
    description: "Fruit riche en vitamine C, saveur douce et acidulée"
  },
  {
    id: 8,
    name: "Écorces d’orange",
    type: "fruit",
    price: 1.20,
    description: "Notes d'agrumes fraîches et zestées"
  },
  {
    id: 9,
    name: "Écorces de citron",
    type: "fruit",
    price: 1.20,
    description: "Notes citronnées vives et rafraîchissantes"
  },
  {
    id: 10,
    name: "Morceaux de pomme",
    type: "fruit",
    price: 1.00,
    description: "Douceur fruitée et texture agréable"
  },
  {
    id: 11,
    name: "Camomille",
    type: "fleur",
    price: 1.50,
    description: "Fleur apaisante aux notes douces"
  },
  {
    id: 12,
    name: "Fleur de souci",
    type: "fleur",
    price: 1.00,
    description: "Ajoute une touche colorée et légèrement amère"
  },
  {
    id: 13,
    name: "Hibiscus",
    type: "fleur",
    price: 1.70,
    description: "Fleur acidulée et colorée"
  },
  {
    id: 14,
    name: "Lavande",
    type: "fleur",
    price: 2.00,
    description: "Parfum floral relaxant"
  },
  {
    id: 15,
    name: "Pétale de rose",
    type: "fleur",
    price: 2.50,
    description: "Touche romantique et parfumée"
  },
  {
    id: 16,
    name: "Cannelle",
    type: "epice",
    price: 1.00,
    description: "Épice chaleureuse et sucrée"
  },
  {
    id: 17,
    name: "Cardamome",
    type: "epice",
    price: 1.50,
    description: "Épice aromatique et exotique"
  },
  {
    id: 18,
    name: "Clou de girofle",
    type: "epice",
    price: 1.20,
    description: "Épice intense et piquante"
  },
  {
    id: 19,
    name: "Fenouil",
    type: "epice",
    price: 0.80,
    description: "Notes anisées et digestives"
  },
  {
    id: 20,
    name: "Gingembre",
    type: "epice",
    price: 1.70,
    description: "Épice piquante et réchauffante"
  },
  {
    id: 21,
    name: "Ginseng",
    type: "epice",
    price: 3.00,
    description: "Racine énergisante et tonifiante"
  },
  {
    id: 22,
    name: "Réglisse",
    type: "epice",
    price: 1.30,
    description: "Saveur douce et anisée"
  },
  {
    id: 23,
    name: "Citronnelle",
    type: "herbe",
    price: 1.00,
    description: "Notes citronnées et rafraîchissantes"
  },
  {
    id: 24,
    name: "Mélisse",
    type: "herbe",
    price: 1.20,
    description: "Herbe apaisante aux notes citronnées"
  },
  {
    id: 25,
    name: "Menthe douce",
    type: "herbe",
    price: 0.90,
    description: "Menthe rafraîchissante et douce"
  },
  {
    id: 26,
    name: "Menthe poivrée",
    type: "herbe",
    price: 1.10,
    description: "Menthe intense et vivifiante"
  },
  {
    id: 27,
    name: "Romarin",
    type: "herbe",
    price: 0.80,
    description: "Herbe aromatique aux notes boisées"
  },
  {
    id: 28,
    name: "Thym",
    type: "herbe",
    price: 0.70,
    description: "Herbe méditerranéenne aux notes terreuses"
  },
  {
    id: 29,
    name: "Verveine",
    type: "herbe",
    price: 1.30,
    description: "Herbe relaxante aux notes citronnées"
  }
]

export const blendCategories = [
  { id: "base", name: "Bases", description: "Choisissez votre base de thé ou d'infusion" },
  { id: "fruit", name: "Fruits", description: "Ajoutez une touche fruitée à votre mélange" },
  { id: "fleur", name: "Fleurs", description: "Parfumez avec des fleurs délicates" },
  { id: "herbe", name: "Herbes & Plantes", description: "Pour une touche fraîche ou aromatique" },
  { id: "epice", name: "Épices", description: "Rehaussez votre mélange avec des épices" },
  { id: "all", name: "Tous les ingrédients", description: "Explorez tous les ingrédients disponibles" }
]





export const categories = [
  "Tous",
  "Thé Noir",
  "Thé Vert",
  "Thé Blanc",
  "Infusion",
  "Nos Packs"
]




