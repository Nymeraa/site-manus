import React, { useState, useEffect } from 'react';
import { customBlendIngredients, basePrices, quantities } from '../data/customBlendIngredients';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, X, Scale, Plus, Minus, AlertCircle, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CustomBlend = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedBases, setSelectedBases] = useState([]);
  const [blendName, setBlendName] = useState('');
  const [blendDescription, setBlendDescription] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(2); // Default to 100g (index 2)
  const [blendQuantity, setBlendQuantity] = useState(1); // Number of blend units to add
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const { addItem } = useCart();

  // Auto-select "Infusion" base when 5 ingredients are selected and no other base
  useEffect(() => {
    if (selectedIngredients.length === 5 && selectedBases.length === 0) {
      const infusionBase = customBlendIngredients.bases.find(base => base.name === "Infusion");
      if (infusionBase) {
        setSelectedBases([infusionBase]);
      }
    }
  }, [selectedIngredients.length, selectedBases.length]);

  const filterOptions = [
    { label: 'Relaxant', value: 'relaxant' },
    { label: 'Énergisant', value: 'énergisant' },
    { label: 'Digestif', value: 'digestif' },
    { label: 'Antioxydants', value: 'antioxydants' },
    { label: 'Fruité', value: 'fruité' },
    { label: 'Épicé', value: 'épicé' },
    { label: 'Floral', value: 'floral' },
    { label: 'Rafraîchissant', value: 'rafraîchissant' },
    { label: 'Tonifiant', value: 'tonifiant' },
    { label: 'Apaisant', value: 'apaisant' }
  ];

  const toggleFilter = (filterValue) => {
    setActiveFilters(prev => 
      prev.includes(filterValue) 
        ? prev.filter(f => f !== filterValue)
        : [...prev, filterValue]
    );
  };

  const filterIngredients = (ingredients) => {
    let filtered = ingredients;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(ingredient =>
        ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ingredient.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by active filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter(ingredient => {
        const benefits = ingredient.benefits || [];
        return activeFilters.some(filter => 
          benefits.some(benefit => benefit.toLowerCase().includes(filter.toLowerCase()))
        );
      });
    }

    return filtered;
  };

  const calculateTotalPrice = () => {
    const basePrice = basePrices[selectedQuantity];
    const basesPrice = selectedBases.reduce((sum, base) => sum + base.price[selectedQuantity], 0);
    const ingredientsPrice = selectedIngredients.reduce((sum, ing) => sum + ing.price[selectedQuantity], 0);
    return basePrice + basesPrice + ingredientsPrice;
  };

  const calculatePricePer100g = () => {
    const totalPrice = calculateTotalPrice();
    const weight = quantities[selectedQuantity].weight;
    const weightInGrams = parseInt(weight.replace(' grammes', ''));
    return (totalPrice * 100 / weightInGrams).toFixed(2);
  };

  const calculateSavings = () => {
    if (selectedQuantity <= 2) return null; // No savings for 25g, 50g, 100g
    
    const pricePer100g = parseFloat(calculatePricePer100g());
    const baselinePricePer100g = (basePrices[2] * 100 / 100); // Price per 100g for 100g quantity
    const savingsPercent = ((baselinePricePer100g - pricePer100g) / baselinePricePer100g * 100);
    
    return savingsPercent > 0 ? Math.round(savingsPercent) : null;
  };

  const getIngredientCount = () => {
    const nonInfusionBases = selectedBases.filter(base => base.name !== "Infusion" && base.name !== "Matcha").length;
    const matchaBases = selectedBases.filter(base => base.name === "Matcha").length;
    const ingredients = selectedIngredients.length;
    
    return {
      total: nonInfusionBases + ingredients, // Infusion and Matcha don't count towards limit
      bases: nonInfusionBases,
      matcha: matchaBases,
      ingredients: ingredients,
      hasInfusion: selectedBases.some(base => base.name === "Infusion")
    };
  };

  const canAddToCart = () => {
    const counts = getIngredientCount();
    const hasValidBase = counts.bases === 1 || counts.hasInfusion;
    const hasValidIngredientCount = counts.ingredients >= 1 && counts.ingredients <= 5;
    const totalWithinLimit = counts.total <= 5;
    
    return hasValidBase && hasValidIngredientCount && totalWithinLimit && blendName.trim();
  };

  const getValidationMessage = () => {
    const counts = getIngredientCount();
    
    if (!counts.hasInfusion && counts.bases === 0) {
      return "Veuillez choisir 1 base";
    }
    if (counts.bases > 1) {
      return "Veuillez choisir seulement 1 base (le matcha peut être ajouté en complément)";
    }
    if (counts.ingredients === 0) {
      return "Veuillez choisir au moins 1 ingrédient";
    }
    if (counts.ingredients > 5) {
      return "Maximum 5 ingrédients autorisés";
    }
    if (counts.total > 5) {
      return "Maximum 5 éléments au total (1 base + 4 ingrédients max)";
    }
    if (!blendName.trim()) {
      return "Veuillez nommer votre mélange";
    }
    
    return "";
  };

  const getMaxIngredients = () => {
    const counts = getIngredientCount();
    // Si aucune base sélectionnée : 5 ingrédients max
    // Si une base est sélectionnée : 4 ingrédients max
    return counts.bases === 0 && !counts.hasInfusion ? 5 : 4;
  };

  const toggleIngredient = (ingredient, isBase = false) => {
    if (isBase) {
      const isSelected = selectedBases.some(base => base.id === ingredient.id);
      if (isSelected) {
        setSelectedBases(selectedBases.filter(base => base.id !== ingredient.id));
      } else {
        if (ingredient.name === "Matcha") {
          // Matcha can be added to any existing base
          setSelectedBases([...selectedBases, ingredient]);
        } else if (ingredient.name === "Infusion") {
          // Infusion can only be selected if no other base is selected
          const hasOtherBase = selectedBases.some(base => base.name !== "Matcha");
          if (!hasOtherBase) {
            setSelectedBases([...selectedBases, ingredient]);
          }
        } else {
          // Regular base: replace all non-matcha bases but keep matcha
          const matchaBase = selectedBases.find(base => base.name === "Matcha");
          const keepBases = matchaBase ? [matchaBase] : [];
          setSelectedBases([...keepBases, ingredient]);
        }
      }
    } else {
      const counts = getIngredientCount();
      const isSelected = selectedIngredients.some(ing => ing.id === ingredient.id);
      
      if (isSelected) {
        setSelectedIngredients(selectedIngredients.filter(ing => ing.id !== ingredient.id));
      } else {
        const maxIngredients = getMaxIngredients();
        
        // Check if adding this ingredient would exceed limits
        if (counts.ingredients >= maxIngredients) {
          alert(`Maximum ${maxIngredients} ingrédients autorisés`);
          return;
        }
        if (counts.total >= 5 && !counts.hasInfusion) {
          alert("Maximum 5 éléments au total");
          return;
        }
        // Déterminer la catégorie de l'ingrédient
        let category = 'ingrédient';
        if (customBlendIngredients.fruits.some(f => f.id === ingredient.id)) {
          category = 'fruit';
        } else if (customBlendIngredients.fleurs.some(f => f.id === ingredient.id)) {
          category = 'fleur';
        } else if (customBlendIngredients.herbesPlantes.some(h => h.id === ingredient.id)) {
          category = 'herbe et plante';
        } else if (customBlendIngredients.epices.some(e => e.id === ingredient.id)) {
          category = 'épice';
        }
        
        const ingredientWithCategory = { ...ingredient, category };
        setSelectedIngredients([...selectedIngredients, ingredientWithCategory]);
      }
    }
  };

  const isIngredientSelected = (ingredient, isBase = false) => {
    if (isBase) {
      return selectedBases.some(base => base.id === ingredient.id);
    }
    return selectedIngredients.some(ing => ing.id === ingredient.id);
  };

  const removeIngredient = (ingredientId, isBase = false) => {
    if (isBase) {
      setSelectedBases(selectedBases.filter(base => base.id !== ingredientId));
    } else {
      setSelectedIngredients(selectedIngredients.filter(ing => ing.id !== ingredientId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canAddToCart()) {
      alert(getValidationMessage());
      return;
    }

    const customBlend = {
      id: `custom-${Date.now()}`,
      name: blendName,
      price: calculateTotalPrice(),
      image: '/src/assets/personnalisation_the_1.png',
      quantity: blendQuantity,
      weight: quantities[selectedQuantity].weight,
      isCustomBlend: true,
      base: selectedBases.length > 0 ? selectedBases[0].name : null,
      ingredients: selectedIngredients.map(ing => ({
        name: ing.name,
        category: ing.category
      })),
      description: blendDescription,
      blendQuantity: blendQuantity
    };

    addItem(customBlend);

    // Reset form
    setSelectedIngredients([]);
    setSelectedBases([]);
    setBlendName('');
    setBlendDescription('');
    setSelectedQuantity(2);
    setBlendQuantity(1);
  };

  const renderIngredientSection = (categoryName, ingredients, tabValue, isBase = false) => {
    const filteredIngredients = filterIngredients(ingredients);
    
    return (
      <TabsContent value={tabValue}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIngredients.map((ingredient) => {
            const isSelected = isIngredientSelected(ingredient, isBase);
            const ingredientPrice = ingredient.price[selectedQuantity];
            const counts = getIngredientCount();
            
            // Check if ingredient can be selected
            let canSelect = isSelected;
            if (!isSelected) {
              if (isBase) {
                if (ingredient.name === "Infusion") {
                  // Infusion can only be selected if no other base is selected
                  canSelect = !selectedBases.some(base => base.name !== "Matcha");
                } else {
                  canSelect = ingredient.name === "Matcha" || counts.bases === 0;
                }
              } else {
                const maxIngredients = getMaxIngredients();
                canSelect = counts.ingredients < maxIngredients && counts.total < 5;
              }
            }
            
            return (
              <Card 
                key={ingredient.id} 
                className={`cursor-pointer transition-all duration-300 border-2 overflow-hidden group ${
                  isSelected 
                    ? 'border-green-700 bg-green-50 shadow-lg scale-105' 
                    : canSelect 
                      ? 'border-gray-200 hover:border-green-400 hover:shadow-md hover:scale-102'
                      : 'border-gray-300 bg-gray-100 cursor-not-allowed opacity-50'
                }`}
                onClick={() => canSelect && toggleIngredient(ingredient, isBase)}
              >
                {/* Image Header */}
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={ingredient.image}
                    alt={ingredient.name}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      isSelected ? 'brightness-110' : canSelect ? 'group-hover:scale-110' : 'grayscale'
                    }`}
                  />
                </div>
                
                <CardContent className="p-3">
                  <CardTitle className={`text-base mb-1 ${isSelected ? 'text-green-800' : canSelect ? 'text-gray-900' : 'text-gray-500'}`}>
                    {ingredient.name}
                  </CardTitle>
                  
                  <p className={`text-xs mb-2 leading-snug ${canSelect ? 'text-gray-600' : 'text-gray-400'}`}>
                    {ingredient.description}
                  </p>

                  {/* Benefits */}
                  {ingredient.benefits && ingredient.benefits.length > 0 && (
                    <div className="mb-2">
                      <div className="flex flex-wrap gap-1">
                        {ingredient.benefits.map((benefit, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Warnings */}
                  {ingredient.warnings && ingredient.warnings.length > 0 && (
                    <div className="mb-2">
                      <div className="flex flex-wrap gap-1">
                        {ingredient.warnings.map((warning, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full"
                          >
                            {warning}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    {ingredientPrice > 0 ? (
                      <span className={`font-bold text-sm ${canSelect ? 'text-green-700' : 'text-gray-400'}`}>
                        +{ingredientPrice.toFixed(2)}€
                      </span>
                    ) : (
                      <span></span>
                    )}
                    {isSelected && (
                      <div className="text-green-700 text-xs font-medium bg-green-100 px-2 py-1 rounded-full">
                        Sélectionné
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        {filteredIngredients.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucun ingrédient ne correspond à votre recherche ou aux filtres sélectionnés.
          </div>
        )}
      </TabsContent>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Créez Votre Mélange Unique
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Composez votre thé personnalisé en sélectionnant vos ingrédients préférés. 
            Laissez libre cours à votre créativité !
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients Selection */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Composition de votre mélange
                </CardTitle>
                <p className="text-gray-600">
                  Sélectionnez vos ingrédients étape par étape
                </p>
              </CardHeader>
              <CardContent className="p-8">
                {/* Search and Filters */}
                <div className="mb-8 space-y-4">
                  {/* Search Bar and Filter */}
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Rechercher un ingrédient..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    {/* Filter Dropdown */}
                    <select 
                      value={activeFilters.length > 0 ? activeFilters[0] : "tous"} 
                      onChange={(e) => {
                        if (e.target.value === "tous") {
                          setActiveFilters([]);
                        } else {
                          setActiveFilters([e.target.value]);
                        }
                      }}
                      className="w-[180px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="tous">Tous</option>
                      {filterOptions.map((filter) => (
                        <option key={filter.value} value={filter.value}>
                          {filter.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Tabs defaultValue="bases" className="w-full">
                  <TabsList className="grid w-full grid-cols-6 mb-8">
                    <TabsTrigger value="bases">Bases</TabsTrigger>
                    <TabsTrigger value="fruits">Fruits</TabsTrigger>
                    <TabsTrigger value="herbes">Herbes & Plantes</TabsTrigger>
                    <TabsTrigger value="fleurs">Fleurs</TabsTrigger>
                    <TabsTrigger value="epices">Épices</TabsTrigger>
                    <TabsTrigger value="tous">Tous les ingrédients</TabsTrigger>
                  </TabsList>

                  {/* Résultats de recherche affichés en-dessous des onglets */}
                  {searchTerm && (
                    <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-semibold text-blue-900 mb-4">
                        Résultats de recherche pour "{searchTerm}" ({
                          Object.values(customBlendIngredients).flat().filter(ingredient => 
                            filterIngredients([ingredient]).length > 0
                          ).length
                        } résultats)
                      </h3>
                      <div className="space-y-8">
                        {/* Bases trouvées */}
                        {(() => {
                          const basesFound = filterIngredients(customBlendIngredients.bases);
                          if (basesFound.length > 0) {
                            return (
                              <div>
                                <h4 className="text-md font-medium text-gray-900 mb-3">Bases ({basesFound.length})</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {basesFound.map((ingredient) => {
                                    const isSelected = isIngredientSelected(ingredient, true);
                                    const ingredientPrice = ingredient.price[selectedQuantity];
                                    const counts = getIngredientCount();
                                    let canSelect = isSelected;
                                    
                                    if (!isSelected) {
                                      if (ingredient.name === "Infusion") {
                                        canSelect = !selectedBases.some(base => base.name !== "Matcha");
                                      } else {
                                        canSelect = ingredient.name === "Matcha" || counts.bases === 0;
                                      }
                                    }
                                    
                                    return (
                                      <Card 
                                        key={ingredient.id} 
                                        className={`cursor-pointer transition-all duration-300 border-2 overflow-hidden group ${
                                          isSelected 
                                            ? 'border-green-700 bg-green-50 shadow-lg scale-105' 
                                            : canSelect 
                                              ? 'border-gray-200 hover:border-green-400 hover:shadow-md hover:scale-102'
                                              : 'border-gray-300 bg-gray-100 cursor-not-allowed opacity-50'
                                        }`}
                                        onClick={() => canSelect && toggleIngredient(ingredient, true)}
                                      >
                                        <div className="aspect-square overflow-hidden bg-gray-100">
                                          <img
                                            src={ingredient.image}
                                            alt={ingredient.name}
                                            className={`w-full h-full object-cover transition-all duration-300 ${
                                              isSelected ? 'brightness-110' : canSelect ? 'group-hover:scale-110' : 'grayscale'
                                            }`}
                                          />
                                        </div>
                                        
                                        <CardContent className="p-3">
                                          <CardTitle className={`text-sm mb-1 ${isSelected ? 'text-green-800' : canSelect ? 'text-gray-900' : 'text-gray-500'}`}>
                                            {ingredient.name}
                                          </CardTitle>
                                          
                                          <p className={`text-xs mb-2 leading-snug ${canSelect ? 'text-gray-600' : 'text-gray-400'}`}>
                                            {ingredient.description}
                                          </p>

                                          {/* Benefits */}
                                          {ingredient.benefits && ingredient.benefits.length > 0 && (
                                            <div className="mb-2">
                                              <div className="flex flex-wrap gap-1">
                                                {ingredient.benefits.slice(0, 2).map((benefit, index) => (
                                                  <span 
                                                    key={index}
                                                    className="text-xs bg-green-100 text-green-700 px-1 py-0.5 rounded-full text-xs"
                                                  >
                                                    {benefit}
                                                  </span>
                                                ))}
                                                {ingredient.benefits.length > 2 && (
                                                  <span className="text-xs text-gray-500">+{ingredient.benefits.length - 2}</span>
                                                )}
                                              </div>
                                            </div>
                                          )}

                                          {/* Warnings */}
                                          {ingredient.warnings && ingredient.warnings.length > 0 && (
                                            <div className="mb-2">
                                              <div className="flex flex-wrap gap-1">
                                                {ingredient.warnings.slice(0, 1).map((warning, index) => (
                                                  <span 
                                                    key={index}
                                                    className="text-xs bg-amber-100 text-amber-700 px-1 py-0.5 rounded-full text-xs"
                                                  >
                                                    {warning}
                                                  </span>
                                                ))}
                                                {ingredient.warnings.length > 1 && (
                                                  <span className="text-xs text-gray-500">+{ingredient.warnings.length - 1}</span>
                                                )}
                                              </div>
                                            </div>
                                          )}
                                          
                                          <div className="flex items-center justify-between">
                                            {ingredientPrice > 0 ? (
                                              <span className={`font-bold text-sm ${canSelect ? 'text-green-700' : 'text-gray-400'}`}>
                                                +{ingredientPrice.toFixed(2)}€
                                              </span>
                                            ) : (
                                              <span></span>
                                            )}
                                            {isSelected && (
                                              <div className="text-green-700 text-xs font-medium bg-green-100 px-1 py-0.5 rounded-full">
                                                ✓
                                              </div>
                                            )}
                                          </div>
                                        </CardContent>
                                      </Card>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })()}

                        {/* Autres ingrédients trouvés */}
                        {Object.entries(customBlendIngredients).map(([categoryKey, ingredients]) => {
                          if (categoryKey === 'bases') return null;
                          const categoryNames = {
                            'fruits': 'Fruits',
                            'herbes': 'Herbes & Plantes',
                            'fleurs': 'Fleurs',
                            'epices': 'Épices'
                          };
                          
                          const filteredIngredients = filterIngredients(ingredients);
                          if (filteredIngredients.length === 0) return null;
                          
                          return (
                            <div key={categoryKey}>
                              <h4 className="text-md font-medium text-gray-900 mb-3">
                                {categoryNames[categoryKey]} ({filteredIngredients.length})
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredIngredients.map((ingredient) => {
                                  const isSelected = isIngredientSelected(ingredient, false);
                                  const ingredientPrice = ingredient.price[selectedQuantity];
                                  const counts = getIngredientCount();
                                  const maxIngredients = getMaxIngredients();
                                  const canSelect = isSelected || (counts.ingredients < maxIngredients && counts.total < 5);
                                  
                                  return (
                                    <Card 
                                      key={ingredient.id} 
                                      className={`cursor-pointer transition-all duration-300 border-2 overflow-hidden group ${
                                        isSelected 
                                          ? 'border-green-700 bg-green-50 shadow-lg scale-105' 
                                          : canSelect 
                                            ? 'border-gray-200 hover:border-green-400 hover:shadow-md hover:scale-102'
                                            : 'border-gray-300 bg-gray-100 cursor-not-allowed opacity-50'
                                      }`}
                                      onClick={() => canSelect && toggleIngredient(ingredient, false)}
                                    >
                                      <div className="aspect-square overflow-hidden bg-gray-100">
                                        <img
                                          src={ingredient.image}
                                          alt={ingredient.name}
                                          className={`w-full h-full object-cover transition-all duration-300 ${
                                            isSelected ? 'brightness-110' : canSelect ? 'group-hover:scale-110' : 'grayscale'
                                          }`}
                                        />
                                      </div>
                                      
                                      <CardContent className="p-3">
                                        <CardTitle className={`text-sm mb-1 ${isSelected ? 'text-green-800' : canSelect ? 'text-gray-900' : 'text-gray-500'}`}>
                                          {ingredient.name}
                                        </CardTitle>
                                        
                                        <p className={`text-xs mb-2 leading-snug ${canSelect ? 'text-gray-600' : 'text-gray-400'}`}>
                                          {ingredient.description}
                                        </p>

                                        {/* Benefits */}
                                        {ingredient.benefits && ingredient.benefits.length > 0 && (
                                          <div className="mb-2">
                                            <div className="flex flex-wrap gap-1">
                                              {ingredient.benefits.slice(0, 2).map((benefit, index) => (
                                                <span 
                                                  key={index}
                                                  className="text-xs bg-green-100 text-green-700 px-1 py-0.5 rounded-full text-xs"
                                                >
                                                  {benefit}
                                                </span>
                                              ))}
                                              {ingredient.benefits.length > 2 && (
                                                <span className="text-xs text-gray-500">+{ingredient.benefits.length - 2}</span>
                                              )}
                                            </div>
                                          </div>
                                        )}

                                        {/* Warnings */}
                                        {ingredient.warnings && ingredient.warnings.length > 0 && (
                                          <div className="mb-2">
                                            <div className="flex flex-wrap gap-1">
                                              {ingredient.warnings.slice(0, 1).map((warning, index) => (
                                                <span 
                                                  key={index}
                                                  className="text-xs bg-amber-100 text-amber-700 px-1 py-0.5 rounded-full text-xs"
                                                >
                                                  {warning}
                                                </span>
                                              ))}
                                              {ingredient.warnings.length > 1 && (
                                                <span className="text-xs text-gray-500">+{ingredient.warnings.length - 1}</span>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                        
                                        <div className="flex items-center justify-between">
                                          {ingredientPrice > 0 ? (
                                            <span className={`font-bold text-sm ${canSelect ? 'text-green-700' : 'text-gray-400'}`}>
                                              +{ingredientPrice.toFixed(2)}€
                                            </span>
                                          ) : (
                                            <span></span>
                                          )}
                                          {isSelected && (
                                            <div className="text-green-700 text-xs font-medium bg-green-100 px-1 py-0.5 rounded-full">
                                              ✓
                                            </div>
                                          )}
                                        </div>
                                      </CardContent>
                                    </Card>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {renderIngredientSection("Bases", customBlendIngredients.bases, "bases", true)}
                  {renderIngredientSection("Fruits", customBlendIngredients.fruits, "fruits")}
                  {renderIngredientSection("Herbes & Plantes", customBlendIngredients.herbes, "herbes")}
                  {renderIngredientSection("Fleurs", customBlendIngredients.fleurs, "fleurs")}
                  {renderIngredientSection("Épices", customBlendIngredients.epices, "epices")}
                  
                  <TabsContent value="tous">
                    <div className="space-y-8">
                      {/* Bases Section */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Bases
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">Sélectionnez une base principale. Le matcha peut être ajouté en complément.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {filterIngredients(customBlendIngredients.bases).map((ingredient) => {
                            const isSelected = isIngredientSelected(ingredient, true);
                            const ingredientPrice = ingredient.price[selectedQuantity];
                            const counts = getIngredientCount();
                            let canSelect = isSelected;
                            
                            if (!isSelected) {
                              if (ingredient.name === "Infusion") {
                                canSelect = !selectedBases.some(base => base.name !== "Matcha");
                              } else {
                                canSelect = ingredient.name === "Matcha" || counts.bases === 0;
                              }
                            }
                            
                            return (
                              <Card 
                                key={ingredient.id} 
                                className={`cursor-pointer transition-all duration-300 border-2 overflow-hidden group ${
                                  isSelected 
                                    ? 'border-green-700 bg-green-50 shadow-lg scale-105' 
                                    : canSelect 
                                      ? 'border-gray-200 hover:border-green-400 hover:shadow-md hover:scale-102'
                                      : 'border-gray-300 bg-gray-100 cursor-not-allowed opacity-50'
                                }`}
                                onClick={() => canSelect && toggleIngredient(ingredient, true)}
                              >
                                {/* Image Header */}
                                <div className="aspect-square overflow-hidden bg-gray-100">
                                  <img
                                    src={ingredient.image}
                                    alt={ingredient.name}
                                    className={`w-full h-full object-cover transition-all duration-300 ${
                                      isSelected ? 'brightness-110' : canSelect ? 'group-hover:scale-110' : 'grayscale'
                                    }`}
                                  />
                                </div>
                                
                                <CardContent className="p-3">
                                  <CardTitle className={`text-base mb-1 ${isSelected ? 'text-green-800' : canSelect ? 'text-gray-900' : 'text-gray-500'}`}>
                                    {ingredient.name}
                                  </CardTitle>
                                  
                                  <p className={`text-xs mb-2 leading-snug ${canSelect ? 'text-gray-600' : 'text-gray-400'}`}>
                                    {ingredient.description}
                                  </p>

                                  {/* Benefits */}
                                  {ingredient.benefits && ingredient.benefits.length > 0 && (
                                    <div className="mb-2">
                                      <div className="flex flex-wrap gap-1">
                                        {ingredient.benefits.map((benefit, index) => (
                                          <span 
                                            key={index}
                                            className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full"
                                          >
                                            {benefit}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Warnings */}
                                  {ingredient.warnings && ingredient.warnings.length > 0 && (
                                    <div className="mb-3">
                                      <div className="flex flex-wrap gap-1">
                                        {ingredient.warnings.map((warning, index) => (
                                          <span 
                                            key={index}
                                            className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full text-xs"
                                          >
                                            {warning}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  
                                  <div className="flex items-center justify-between">
                                    {ingredientPrice > 0 ? (
                                      <span className={`font-bold text-lg ${canSelect ? 'text-green-700' : 'text-gray-400'}`}>
                                        +{ingredientPrice.toFixed(2)}€
                                      </span>
                                    ) : (
                                      <span></span>
                                    )}
                                    {isSelected && (
                                      <div className="text-green-700 text-sm font-medium bg-green-100 px-2 py-1 rounded-full">
                                        Sélectionné
                                      </div>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      </div>

                      {/* Other Ingredients */}
                      {Object.entries(customBlendIngredients).map(([categoryKey, ingredients]) => {
                        if (categoryKey === 'bases') return null;
                        const categoryOrder = ['fruits', 'herbes', 'fleurs', 'epices'];
                        const categoryNames = {
                          'fruits': 'Fruits',
                          'herbes': 'Herbes & Plantes',
                          'fleurs': 'Fleurs',
                          'epices': 'Épices'
                        };
                        
                        return (
                          <div key={categoryKey}>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                              {categoryNames[categoryKey]}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {filterIngredients(ingredients).map((ingredient) => {
                                const isSelected = isIngredientSelected(ingredient, false);
                                const ingredientPrice = ingredient.price[selectedQuantity];
                                const counts = getIngredientCount();
                                const maxIngredients = getMaxIngredients();
                                const canSelect = isSelected || (counts.ingredients < maxIngredients && counts.total < 5);
                                
                                return (
                                  <Card 
                                    key={ingredient.id} 
                                    className={`cursor-pointer transition-all duration-300 border-2 overflow-hidden group ${
                                      isSelected 
                                        ? 'border-green-700 bg-green-50 shadow-lg scale-105' 
                                        : canSelect 
                                          ? 'border-gray-200 hover:border-green-400 hover:shadow-md hover:scale-102'
                                          : 'border-gray-300 bg-gray-100 cursor-not-allowed opacity-50'
                                    }`}
                                    onClick={() => canSelect && toggleIngredient(ingredient, false)}
                                  >
                                    {/* Image Header */}
                                    <div className="aspect-square overflow-hidden bg-gray-100">
                                      <img
                                        src={ingredient.image}
                                        alt={ingredient.name}
                                        className={`w-full h-full object-cover transition-all duration-300 ${
                                          isSelected ? 'brightness-110' : canSelect ? 'group-hover:scale-110' : 'grayscale'
                                        }`}
                                      />
                                    </div>
                                    
                                    <CardContent className="p-3">
                                      <CardTitle className={`text-base mb-1 ${isSelected ? 'text-green-800' : canSelect ? 'text-gray-900' : 'text-gray-500'}`}>
                                        {ingredient.name}
                                      </CardTitle>
                                      
                                      <p className={`text-xs mb-2 leading-snug ${canSelect ? 'text-gray-600' : 'text-gray-400'}`}>
                                        {ingredient.description}
                                      </p>

                                      {/* Benefits */}
                                      {ingredient.benefits && ingredient.benefits.length > 0 && (
                                        <div className="mb-2">
                                          <div className="flex flex-wrap gap-1">
                                            {ingredient.benefits.map((benefit, index) => (
                                              <span 
                                                key={index}
                                                className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full"
                                              >
                                                {benefit}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      {/* Warnings */}
                                      {ingredient.warnings && ingredient.warnings.length > 0 && (
                                        <div className="mb-2">
                                          <div className="flex flex-wrap gap-1">
                                            {ingredient.warnings.map((warning, index) => (
                                              <span 
                                                key={index}
                                                className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full text-xs"
                                              >
                                                {warning}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                      
                                      <div className="flex items-center justify-between">
                                        {ingredientPrice > 0 ? (
                                          <span className={`font-bold text-lg ${canSelect ? 'text-green-700' : 'text-gray-400'}`}>
                                            +{ingredientPrice.toFixed(2)}€
                                          </span>
                                        ) : (
                                          <span></span>
                                        )}
                                        {isSelected && (
                                          <div className="text-green-700 text-sm font-medium bg-green-100 px-2 py-1 rounded-full">
                                            Sélectionné
                                          </div>
                                        )}
                                      </div>
                                    </CardContent>
                                  </Card>
                                );
                              })}
                            </div>
                            {filterIngredients(ingredients).length === 0 && (
                              <div className="text-center py-4 text-gray-500">
                                Aucun ingrédient ne correspond à votre recherche ou aux filtres sélectionnés.
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Blend Summary - Made wider */}
          <div className="space-y-6">
            {/* Quantity Selector with Pills - 3 columns */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Scale className="h-5 w-5 mr-2" />
                  Quantité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {quantities.map((qty, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedQuantity(index)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                        selectedQuantity === index
                          ? 'border-green-600 bg-green-50 text-green-800 shadow-md'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-25'
                      }`}
                    >
                      <div className="font-semibold text-sm">{qty.weight}</div>
                      <div className={`text-xs mt-1 ${
                        selectedQuantity === index ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {basePrices[index].toFixed(2)}€
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Soit {calculatePricePer100g()}€ / 100g
                  {calculateSavings() && (
                    <span className="text-green-600 font-medium">
                      . Vous économisez {calculateSavings()}% !
                    </span>
                  )}
                </p>
              </CardContent>
            </Card>

            {/* Selected Ingredients */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Votre Mélange</CardTitle>
                  <div className="text-sm text-gray-500">
                    {(() => {
                      const counts = getIngredientCount();
                      return `${counts.total}/5 éléments${counts.matcha > 0 ? ` (+${counts.matcha} matcha)` : ''}${counts.hasInfusion ? ' (+infusion)' : ''}`;
                    })()}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {selectedBases.length === 0 && selectedIngredients.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    Aucun ingrédient sélectionné
                  </p>
                ) : (
                  <div className="space-y-2">
                    {/* Benefits and Warnings Summary */}
                    {(selectedBases.length > 0 || selectedIngredients.length > 0) && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        {/* All Benefits */}
                        {(() => {
                          const allBenefits = [...selectedBases, ...selectedIngredients]
                            .flatMap(item => item.benefits || [])
                            .filter((benefit, index, arr) => arr.indexOf(benefit) === index);
                          
                          if (allBenefits.length > 0) {
                            return (
                              <div className="mb-3">
                                <p className="text-xs font-medium text-gray-700 mb-2">Bénéfices:</p>
                                <div className="flex flex-wrap gap-1">
                                  {allBenefits.map((benefit, index) => (
                                    <span 
                                      key={index}
                                      className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                                    >
                                      {benefit}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })()}

                        {/* All Warnings */}
                        {(() => {
                          const allWarnings = [...selectedBases, ...selectedIngredients]
                            .flatMap(item => item.warnings || [])
                            .filter((warning, index, arr) => arr.indexOf(warning) === index);
                          
                          if (allWarnings.length > 0) {
                            return (
                              <div>
                                <div className="flex flex-wrap gap-1">
                                  {allWarnings.map((warning, index) => (
                                    <span 
                                      key={index}
                                      className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full"
                                    >
                                      {warning}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    )}

                    {/* Selected Bases */}
                    {selectedBases.map((base, index) => (
                      <div key={`base-${base.id}-${index}`} className="py-2 border-b">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium">{base.name}</span>
                            <span className="text-xs text-green-600 ml-2">(Base)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {base.price[selectedQuantity] > 0 && (
                              <span className="text-sm text-green-600">
                                +{base.price[selectedQuantity].toFixed(2)}€
                              </span>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeIngredient(base.id, true)}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                            >
                              <X size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Other Selected Ingredients */}
                    {selectedIngredients.map((ingredient, index) => (
                      <div key={`${ingredient.id}-${index}`} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div>
                          <span className="text-sm font-medium">{ingredient.name}</span>
                          <span className="text-xs text-green-600 ml-2">({ingredient.category})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {ingredient.price[selectedQuantity] > 0 && (
                            <span className="text-sm text-green-600">
                              +{ingredient.price[selectedQuantity].toFixed(2)}€
                            </span>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeIngredient(ingredient.id)}
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                          >
                            <X size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-4 pt-4 border-t space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Prix de base ({quantities[selectedQuantity].weight})</span>
                    <span>{basePrices[selectedQuantity].toFixed(2)}€</span>
                  </div>
                  {selectedBases.filter(base => base.price[selectedQuantity] > 0).length > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span>Supplément bases</span>
                      <span>+{selectedBases.reduce((sum, base) => sum + base.price[selectedQuantity], 0).toFixed(2)}€</span>
                    </div>
                  )}
                  {selectedIngredients.filter(ing => ing.price[selectedQuantity] > 0).length > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span>Suppléments ingrédients</span>
                      <span>+{selectedIngredients.reduce((sum, ing) => sum + ing.price[selectedQuantity], 0).toFixed(2)}€</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                    <span>Prix total</span>
                    <span className="text-green-600">{calculateTotalPrice().toFixed(2)}€</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personalization Form */}
            <Card>
              <CardHeader>
                <CardTitle>Personnalisation</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="blend-name" className="block text-sm font-medium text-gray-900 mb-1">
                      Nom de votre mélange *
                    </label>
                    <Input
                      id="blend-name"
                      type="text"
                      placeholder="Mon mélange unique"
                      value={blendName}
                      onChange={(e) => setBlendName(e.target.value)}
                      maxLength={50}
                      required
                    />
                    <div className="text-xs text-gray-500 text-right mt-1">
                      {blendName.length}/50
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="blend-description" className="block text-sm font-medium text-gray-900 mb-1">
                      Description (optionnel)
                    </label>
                    <Textarea
                      id="blend-description"
                      placeholder="Décrivez votre création..."
                      value={blendDescription}
                      onChange={(e) => setBlendDescription(e.target.value)}
                      maxLength={200}
                      rows={3}
                    />
                    <div className="text-xs text-gray-500 text-right mt-1">
                      {blendDescription.length}/200
                    </div>
                  </div>

                  {/* Liquid Glass Quantity selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Quantité
                    </label>
                    <div className="flex items-center justify-center">
                      <div className="flex items-center bg-gradient-to-r from-gray-100 to-gray-200 backdrop-blur-sm border border-gray-300/40 rounded-2xl shadow-lg p-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setBlendQuantity(Math.max(1, blendQuantity - 1))}
                          disabled={blendQuantity <= 1}
                          className="h-12 w-12 p-0 rounded-xl bg-gray-200/80 backdrop-blur-sm border border-gray-300/60 shadow-sm hover:bg-gray-300/90 hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="h-5 w-5 text-gray-700" />
                        </Button>
                        <div className="px-6 py-3 mx-2 bg-gray-300/90 backdrop-blur-sm rounded-xl border border-gray-400/60 shadow-inner">
                          <span className="text-xl font-semibold text-gray-900 min-w-[2rem] text-center block">
                            {blendQuantity}
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setBlendQuantity(blendQuantity + 1)}
                          className="h-12 w-12 p-0 rounded-xl bg-gray-200/80 backdrop-blur-sm border border-gray-300/60 shadow-sm hover:bg-gray-300/90 hover:shadow-md transition-all duration-300"
                        >
                          <Plus className="h-5 w-5 text-gray-700" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-red-500 hover:bg-red-600 text-white"
                    size="lg"
                    disabled={!canAddToCart()}
                  >
                    Ajouter au panier
                  </Button>

                  {/* Validation message */}
                  {!canAddToCart() && (
                    <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{getValidationMessage()}</span>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-yellow-800">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Conseils
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2 text-yellow-700">
                <p>• Commencez toujours par choisir une base de thé</p>
                <p>• Les épices se marient bien avec les thés noirs</p>
                <p>• Les fleurs complètent parfaitement les thés verts</p>
                <p>• Le matcha peut être ajouté en complément d'une autre base</p>
                <p>• Maximum 5 éléments : 1 base + 4 ingrédients pour garder une harmonie des saveurs</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomBlend;

