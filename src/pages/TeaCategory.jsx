import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { ChevronRight, Filter, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '../context/CartContext';

// Composant ProductCard inline
const ProductCard = ({ product }) => {
  const [selectedGrammage, setSelectedGrammage] = useState(0);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (product.grammages && product.grammages[selectedGrammage]) {
      const productWithGrammage = {
        ...product,
        selectedGrammage: product.grammages[selectedGrammage],
        price: product.grammages[selectedGrammage].price
      };
      addItem(productWithGrammage);
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
      <div className="aspect-square overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
          <Badge variant="secondary" className="ml-2 shrink-0">
            {product.category}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-muted-foreground">
            ({product.reviews})
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Grammage
            </label>
            <select 
              value={selectedGrammage.toString()} 
              onChange={(e) => setSelectedGrammage(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {product.grammages && product.grammages.map((grammage, index) => (
                <option key={index} value={index.toString()}>
                  {grammage.quantity}{grammage.unit} - {grammage.price.toFixed(2)}€
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
              {product.grammages && product.grammages[selectedGrammage] ? product.grammages[selectedGrammage].price.toFixed(2) : '0.00'}€
            </div>
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="bg-primary hover:bg-primary/90"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Ajouter
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TeaCategory = () => {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState('all');

  // Mapping des catégories URL vers les noms de catégories dans les données
  const categoryMapping = {
    'the-noir': 'Thé Noir',
    'the-vert': 'Thé Vert', 
    'the-blanc': 'Thé Blanc',
    'the-oolong': 'Thé Oolong',
    'rooibos': 'Rooibos',
    'infusions': 'Tisanes', // Mapping vers "Tisanes" dans les données
    'the-matcha': 'Matcha',
    'nos-packs': 'Nos Packs'
  };

  const categoryName = categoryMapping[category] || 'Thés et Infusions';

  // Descriptions par catégorie
  const categoryDescriptions = {
    'the-noir': 'Découvrez notre sélection de thés noirs aux arômes riches et corsés, parfaits pour commencer la journée.',
    'the-vert': 'Explorez nos thés verts délicats et rafraîchissants, riches en antioxydants et aux saveurs subtiles.',
    'the-blanc': 'Savourez nos thés blancs d\'exception, les plus délicats et raffinés de notre collection.',
    'the-oolong': 'Appréciez nos thés Oolong semi-fermentés, offrant un équilibre parfait entre fraîcheur et complexité.',
    'rooibos': 'Dégustez nos rooibos sans théine, naturellement sucrés et parfaits à tout moment de la journée.',
    'infusions': 'Découvrez nos infusions de plantes et de fruits, naturellement sans théine et aux bienfaits variés.',
    'the-matcha': 'Explorez notre gamme de matcha premium, poudre de thé vert japonais aux propriétés énergisantes.',
    'nos-packs': 'Découvrez nos coffrets et assortiments soigneusement composés pour tous les goûts.'
  };

  useEffect(() => {
    // Filtrer les produits par catégorie
    let filtered = products.filter(product => {
      const mappedCategory = categoryMapping[category];
      console.log('Category:', category, 'Mapped:', mappedCategory, 'Product category:', product.category);
      return product.category === mappedCategory;
    });

    // Filtrer par prix si nécessaire
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        const price = product.price;
        return price >= min && (max ? price <= max : true);
      });
    }

    // Trier les produits
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [category, categoryName, sortBy, priceRange]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-primary">
            Accueil
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/thes-et-infusions" className="hover:text-primary">
            Nos thés & Infusions
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">{categoryName}</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {categoryName}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {categoryDescriptions[category] || 'Découvrez notre sélection de thés et infusions de qualité premium.'}
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Price Filter */}
            <select 
              value={priceRange} 
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-[180px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">Tous les prix</option>
              <option value="0-15">Moins de 15€</option>
              <option value="15-25">15€ - 25€</option>
              <option value="25-35">25€ - 35€</option>
              <option value="35-999">Plus de 35€</option>
            </select>

            {/* Sort */}
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="w-[180px] px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="name">Nom A-Z</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v1M7 8h10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-gray-500 mb-6">
              Essayez de modifier vos filtres ou explorez d'autres catégories.
            </p>
            <Button asChild>
              <Link to="/thes-et-infusions">
                Voir tous les produits
              </Link>
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Créez votre mélange personnalisé
          </h2>
          <p className="text-gray-600 mb-6">
            Composez votre thé unique en sélectionnant vos ingrédients préférés
          </p>
          <Button asChild size="lg">
            <Link to="/custom-blend">
              Créer mon mélange
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeaCategory;

