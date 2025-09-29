import React, { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Star, Search, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { accessories } from '../data/accessories'

const AccessoryCategory = () => {
  const { category } = useParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const { addItem } = useCart()

  // Mapping des URLs vers les catégories
  const categoryMapping = {
    'theieres': 'Théières',
    'tasses-mugs': 'Tasses & Mugs',
    'infusion': 'Infusion',
    'conservation': 'Conservation',
    'service': 'Service',
    'electromenager': 'Électroménager'
  }

  const categoryName = categoryMapping[category] || 'Tous'
  const categoryTitle = categoryName === 'Tous' ? 'Tous les Accessoires' : categoryName

  // Filtrer les produits par catégorie
  const filteredProducts = useMemo(() => {
    let products = accessories || []
    
    // Filtrer par catégorie si spécifiée
    if (categoryName !== 'Tous') {
      products = products.filter(product => product.category === categoryName)
    }
    
    // Filtrer par terme de recherche
    if (searchTerm) {
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Trier les produits
    products.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })
    
    return products
  }, [categoryName, searchTerm, sortBy])

  const handleAddToCart = (product) => {
    addItem({
      ...product,
      selectedGrammage: { quantity: 1, unit: 'pièce', price: product.price }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{categoryTitle}</h1>
          <p className="text-lg text-muted-foreground">
            Découvrez notre sélection d'accessoires de qualité pour sublimer votre expérience du thé
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un accessoire..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Tri */}
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="name">Nom A-Z</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating">Mieux notés</option>
            </select>

            {/* Nombre de résultats */}
            <div className="flex items-center text-sm text-muted-foreground">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Grille des accessoires */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts && filteredProducts.map((accessory) => (
            <Card key={accessory.id} className="group hover:shadow-lg transition-shadow">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={accessory.image}
                  alt={accessory.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!accessory.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive">Rupture de stock</Badge>
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="secondary" className="mb-2">{accessory.category}</Badge>
                    <CardTitle className="text-lg line-clamp-2">{accessory.name}</CardTitle>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{accessory.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({accessory.reviews} avis)</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">{accessory.price}€</span>
                  </div>
                  
                  <Button 
                    onClick={() => handleAddToCart(accessory)}
                    disabled={!accessory.inStock}
                    className="w-full"
                    variant={accessory.inStock ? "default" : "secondary"}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {accessory.inStock ? 'Ajouter au panier' : 'Rupture de stock'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Message si aucun produit */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              Aucun accessoire trouvé pour cette recherche.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccessoryCategory
