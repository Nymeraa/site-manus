import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Star, Search, Filter, ShoppingCart, Plus, Minus } from 'lucide-react'
import { accessories, accessoryCategories } from '../data/accessories'
import { useCart } from '../context/CartContext'

const Accessories = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [sortBy, setSortBy] = useState('name')
  const [priceRange, setPriceRange] = useState('all')
  const [quantities, setQuantities] = useState({}) // Track quantities for each accessory
  const { addItem } = useCart()

  const filteredAndSortedAccessories = useMemo(() => {
    let filtered = accessories.filter(accessory => {
      const matchesSearch = accessory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           accessory.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'Tous' || accessory.category === selectedCategory
      
      let matchesPrice = true
      if (priceRange === 'under-20') {
        matchesPrice = accessory.price < 20
      } else if (priceRange === '20-50') {
        matchesPrice = accessory.price >= 20 && accessory.price <= 50
      } else if (priceRange === 'over-50') {
        matchesPrice = accessory.price > 50
      }

      return matchesSearch && matchesCategory && matchesPrice
    })

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, sortBy, priceRange])

  const getQuantity = (accessoryId) => {
    return quantities[accessoryId] || 1
  }

  const updateQuantity = (accessoryId, newQuantity) => {
    if (newQuantity >= 1) {
      setQuantities(prev => ({ ...prev, [accessoryId]: newQuantity }))
    }
  }

  const handleAddToCart = (accessory) => {
    const quantity = getQuantity(accessory.id)
    addItem({
      id: accessory.id,
      name: accessory.name,
      price: accessory.price,
      image: accessory.image,
      type: 'accessory',
      quantity: quantity
    })
    // Reset quantity after adding to cart
    setQuantities(prev => ({ ...prev, [accessory.id]: 1 }))
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Accessoires pour le Thé</h1>
          <p className="text-lg text-muted-foreground">
            Découvrez notre sélection d'accessoires de qualité pour sublimer votre expérience du thé
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

            {/* Catégorie */}
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {accessoryCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Prix */}
            <select 
              value={priceRange} 
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">Tous les prix</option>
              <option value="under-20">Moins de 20€</option>
              <option value="20-50">20€ - 50€</option>
              <option value="over-50">Plus de 50€</option>
            </select>

            {/* Tri */}
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="name">Nom</option>
              <option value="price-low">Prix croissant</option>
              <option value="price-high">Prix décroissant</option>
              <option value="rating">Note</option>
            </select>
          </div>
        </div>

        {/* Grille des accessoires */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedAccessories.map((accessory) => (
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
                <CardDescription className="line-clamp-3">
                  {accessory.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">{accessory.price}€</span>
                  </div>
                  
                  {/* Quantity selector and Add button */}
                  {accessory.inStock ? (
                    <div className="flex items-center justify-between">
                      {/* Quantity selector */}
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(accessory.id, getQuantity(accessory.id) - 1)}
                          disabled={getQuantity(accessory.id) <= 1}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                          {getQuantity(accessory.id)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(accessory.id, getQuantity(accessory.id) + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Add to cart button */}
                      <Button 
                        onClick={() => handleAddToCart(accessory)}
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Ajouter
                      </Button>
                    </div>
                  ) : (
                    <Button disabled size="sm" className="w-full">
                      Indisponible
                    </Button>
                  )}
                  
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/accessory/${accessory.id}`}>Voir les détails</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Message si aucun accessoire */}
        {filteredAndSortedAccessories.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Aucun accessoire trouvé</h3>
            <p className="text-muted-foreground mb-4">
              Essayez de modifier vos critères de recherche ou de filtrage.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('Tous')
                setPriceRange('all')
                setSortBy('name')
              }}
              variant="outline"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Accessories

