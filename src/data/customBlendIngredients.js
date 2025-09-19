export const customBlendIngredients = {
  bases: [
    { 
      id: 22, 
      name: "Infusion", 
      description: "Base sans théine pour infusions aux plantes", 
      price: [0, 0, 0, 0, 0],
      benefits: ["sans caféine", "relaxant", "minéraux"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 4, 
      name: "Thé Noir", 
      description: "Base corsée et robuste", 
      price: [0, 0, 0, 0, 0],
      benefits: ["énergisant", "focus", "antioxydants"],
      warnings: ["contient caféine"],
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 5, 
      name: "Thé Vert Sencha", 
      description: "Base délicate et végétale", 
      price: [0, 0, 0, 0, 0],
      benefits: ["antioxydants", "énergie légère", "soutien du métabolisme"],
      warnings: ["contient caféine"],
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 3, 
      name: "Thé Blanc", 
      description: "Base subtile et raffinée", 
      price: [1.0, 2.0, 3.5, 8.5, 15.0],
      benefits: ["antioxydants", "énergie très légère"],
      warnings: ["peu de caféine"],
      image: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 2, 
      name: "Rooibos", 
      description: "Base sans caféine, douce et fruitée", 
      price: [0, 0, 0, 0, 0],
      benefits: ["sans caféine", "relaxant", "minéraux"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1597318736999-36f1b99e2841?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 21, 
      name: "Matcha", 
      description: "Poudre de thé vert japonais", 
      price: [0.3, 0.6, 1.0, 2.4, 4.5],
      benefits: ["antioxydants", "énergie légère", "soutien du métabolisme"],
      warnings: ["contient caféine"],
      image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 1, 
      name: "Maté Vert", 
      description: "Base énergisante et légèrement amère", 
      price: [0, 0, 0, 0, 0],
      benefits: ["énergisant", "stimulant mental", "soutien sportif"],
      warnings: ["très caféiné"],
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ],
  fruits: [
    { 
      id: 6, 
      name: "Pomme", 
      description: "Morceaux de pomme séchée", 
      price: [0, 0, 0, 0, 0],
      benefits: ["fibres"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 7, 
      name: "Orange", 
      description: "Écorces d'orange séchées", 
      price: [0, 0, 0, 0, 0],
      benefits: ["vitamine C"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 8, 
      name: "Citron", 
      description: "Écorces de citron séchées", 
      price: [0, 0, 0, 0, 0],
      benefits: ["vitamine C", "détox"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 9, 
      name: "Fraise", 
      description: "Morceaux de fraise lyophilisée", 
      price: [0, 0, 0, 0, 0],
      benefits: ["vitamine C", "antioxydants"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 19, 
      name: "Baies de Goji", 
      description: "Superfruit aux propriétés nutritionnelles", 
      price: [0, 0, 0, 0, 0],
      benefits: ["antioxydants", "vitalité"],
      warnings: ["interactions possibles avec anticoagulants"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 20, 
      name: "Cynorrhodon (Églantier)", 
      description: "Fruits riches en vitamine C", 
      price: [0, 0, 0, 0, 0],
      benefits: ["vitamine C", "soutien immunitaire"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ],
  fleurs: [
    { 
      id: 10, 
      name: "Lavande", 
      description: "Fleurs de lavande apaisantes", 
      price: [0, 0, 0, 0, 0],
      benefits: ["relaxant", "aide au sommeil"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 11, 
      name: "Camomille", 
      description: "Fleurs de camomille relaxantes", 
      price: [0, 0, 0, 0, 0],
      benefits: ["relaxant", "aide au sommeil", "digestif"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 12, 
      name: "Hibiscus", 
      description: "Pétales d'hibiscus colorés", 
      price: [0, 0, 0, 0, 0],
      benefits: ["drainant", "antioxydants"],
      warnings: ["peut abaisser la tension, déconseillé pendant grossesse/allaitement"],
      image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 13, 
      name: "Pétales de Rose", 
      description: "Délicats pétales de rose", 
      price: [0.5, 0.9, 1.5, 3.5, 6.5],
      benefits: ["apaisant"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 18, 
      name: "Fleur de Souci (Calendula)", 
      description: "Fleurs aux propriétés apaisantes", 
      price: [0.15, 0.3, 0.45, 1.0, 1.8],
      benefits: ["apaisant", "digestion"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ],
  herbes: [
    { 
      id: 14, 
      name: "Menthe Poivrée", 
      description: "Feuilles de menthe rafraîchissantes", 
      price: [0, 0, 0, 0, 0],
      benefits: ["digestif", "respiration"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 15, 
      name: "Citronnelle", 
      description: "Herbe citronnée relaxante", 
      price: [0, 0, 0, 0, 0],
      benefits: ["relaxant", "digestif"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 32, 
      name: "Romarin", 
      description: "Herbe aromatique stimulante", 
      price: [0, 0, 0, 0, 0],
      benefits: ["concentration", "digestif", "tonique cérébral"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 33, 
      name: "Thym", 
      description: "Herbe purifiante", 
      price: [0, 0, 0, 0, 0],
      benefits: ["respiration", "purifiant"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 34, 
      name: "Réglisse", 
      description: "Racine au goût sucré", 
      price: [0, 0, 0, 0, 0],
      benefits: ["digestif"],
      warnings: ["déconseillé en cas d'hypertension"],
      image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 25, 
      name: "Verveine", 
      description: "Herbe relaxante", 
      price: [0.15, 0.3, 0.45, 1.0, 1.8],
      benefits: ["relaxant", "aide au sommeil", "digestif"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 35, 
      name: "Fenouil", 
      description: "Graines digestives", 
      price: [0, 0, 0, 0, 0],
      benefits: ["digestif", "anti-ballonnement"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 36, 
      name: "Menthe Douce", 
      description: "Menthe aux notes douces", 
      price: [0, 0, 0, 0, 0],
      benefits: ["digestif", "rafraîchissant"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 37, 
      name: "Mélisse", 
      description: "Herbe calmante", 
      price: [0, 0, 0, 0, 0],
      benefits: ["relaxant", "anti-stress", "aide au sommeil"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ],
  epices: [
    { 
      id: 16, 
      name: "Cannelle", 
      description: "Épice chaude et parfumée", 
      price: [0, 0, 0, 0, 0],
      benefits: ["digestif", "soutien à la glycémie"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 17, 
      name: "Gingembre", 
      description: "Racine épicée et tonifiante", 
      price: [0, 0, 0, 0, 0],
      benefits: ["digestif", "tonifiant"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1541740183896-9c42cb4b4d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 29, 
      name: "Cardamome", 
      description: "Épice parfumée", 
      price: [0.4, 0.7, 1.2, 2.8, 5.3],
      benefits: ["digestif", "haleine fraîche"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 30, 
      name: "Clou de Girofle", 
      description: "Épice tonifiante", 
      price: [0.1, 0.2, 0.3, 0.7, 1.3],
      benefits: ["tonifiant"],
      warnings: [],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 31, 
      name: "Ginseng", 
      description: "Racine énergisante", 
      price: [0.1, 0.2, 0.3, 0.7, 1.3],
      benefits: ["vitalité", "énergie mentale & physique"],
      warnings: ["stimulant, déconseillé grossesse/allaitement, interactions possibles (anticoagulants/antidiabétiques)"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ]
};

// Prix de base selon la quantité
export const basePrices = [3.50, 6.50, 12.50, 28.90, 53.90]; // 25g, 50g, 100g, 250g, 500g
export const quantities = [
  { value: 0, label: "25g", weight: "25 grammes" },
  { value: 1, label: "50g", weight: "50 grammes" },
  { value: 2, label: "100g", weight: "100 grammes" },
  { value: 3, label: "250g", weight: "250 grammes" },
  { value: 4, label: "500g", weight: "500 grammes" }
];

