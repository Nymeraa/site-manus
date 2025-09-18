import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Star, Search, Filter } from 'lucide-react'
import { products, categories } from '../data/products'

const Catalog = () => {
  const [searchParams] = useSearchParams()
  const categoryFromUrl = searchParams.get('category')
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || 'Tous')
  const [sortBy, setSortBy] = useState("rating")
  const [priceRange, setPriceRange] = useState("all")
  const [selectedGrammage, setSelectedGrammage] = useState({})

  // Update category when URL changes
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl)
    }
  }, [categoryFromUrl])

  const handleGrammageChange = (productId, grammage) => {
    setSelectedGrammage(prev => ({ ...prev, [productId]: grammage }))
  }

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'Tous' || product.category === selectedCategory
      
      let matchesPrice = true
      if (priceRange === 'under-25') {
        matchesPrice = product.price < 25
      } else if (priceRange === '25-35') {
        matchesPrice = product.price >= 25 && product.price <= 35
      } else if (priceRange === 'over-35') {
        matchesPrice = product.price > 35
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

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Notre Catalogue</h1>
          <p className="text-lg text-muted-foreground">
            Découvrez notre sélection complète de thés et infusions artisanaux
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un thé..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Catégorie */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Prix */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Prix" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les prix</SelectItem>
                <SelectItem value="under-25">Moins de 25€</SelectItem>
                <SelectItem value="25-35">25€ - 35€</SelectItem>
                <SelectItem value="over-35">Plus de 35€</SelectItem>
              </SelectContent>
            </Select>

            {/* Tri */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nom A-Z</SelectItem>
                <SelectItem value="price-low">Prix croissant</SelectItem>
                <SelectItem value="price-high">Prix décroissant</SelectItem>
                <SelectItem value="rating">Mieux notés</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Résultats */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredAndSortedProducts.length} produit{filteredAndSortedProducts.length > 1 ? 's' : ''} trouvé{filteredAndSortedProducts.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product, index) => (
            <Card key={product.id} className={`tea-card fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({product.reviews} avis)</span>
                  </div>
                </div>
                <CardDescription className="line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Origine: {product.origin}</span>
                    <span>{product.temperature}</span>
                  </div>
                  {product.grammages && product.grammages.length > 0 ? (
                    <div className="space-y-2">
                      <Select
                        value={selectedGrammage[product.id] || product.grammages[0].quantity.toString()}
                        onValueChange={(value) => handleGrammageChange(product.id, parseInt(value))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionner le grammage" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.grammages.map((g) => (
                            <SelectItem key={g.quantity} value={g.quantity.toString()}>
                              {g.quantity}{g.unit} - {g.price.toFixed(2)}€
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary">
                          {(selectedGrammage[product.id] ? 
                            product.grammages.find(g => g.quantity === selectedGrammage[product.id])?.price : 
                            product.grammages[0].price).toFixed(2)}€
                        </span>
                        <Button asChild>
                          <Link to={`/product/${product.id}`}>Voir le produit</Link>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">{product.price.toFixed(2)}€</span>
                      <Button asChild>
                        <Link to={`/product/${product.id}`}>Voir le produit</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Message si aucun produit */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
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

export default Catalog

