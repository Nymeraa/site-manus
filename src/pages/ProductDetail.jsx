import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Star, ShoppingCart, Heart, ArrowLeft, Clock, Thermometer, MapPin, Minus, Plus } from 'lucide-react'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import ReviewForm from '../components/ReviewForm'
import { useAuth } from '../context/AuthContext'

const ProductDetail = () => {
  const { id } = useParams()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const { isAuthenticated } = useAuth()

  // Dummy function to check if user has purchased the product
  const hasPurchased = (productId) => {
    // In a real application, this would check user's order history
    // For now, let's assume a user has purchased if they are authenticated
    return isAuthenticated
  }

  const handleReviewSubmit = (review) => {
    console.log("New review submitted:", review)
    alert("Votre avis a été soumis avec succès ! (Fonctionnalité de sauvegarde non implémentée)")
    // In a real app, send review to backend
  }

  const product = products.find(p => p.id === parseInt(id))
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 3)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Produit non trouvé</h2>
          <Button asChild>
            <Link to="/catalog">Retour au catalogue</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    })
  }

  const updateQuantity = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/catalog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au catalogue
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Informations produit */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} avis)</span>
                </div>
                {product.inStock ? (
                  <Badge variant="outline" className="text-green-600 border-green-600">En stock</Badge>
                ) : (
                  <Badge variant="outline" className="text-red-600 border-red-600">Rupture de stock</Badge>
                )}
              </div>
              <p className="text-lg text-muted-foreground mb-6">{product.description}</p>
              <div className="text-3xl font-bold text-primary mb-6">{product.price}€</div>
            </div>

            {/* Informations de préparation */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/30 rounded-lg">
              <div className="text-center">
                <Thermometer className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">{product.temperature}</div>
                <div className="text-xs text-muted-foreground">Température</div>
              </div>
              <div className="text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">{product.brewingTime}</div>
                <div className="text-xs text-muted-foreground">Infusion</div>
              </div>
              <div className="text-center">
                <MapPin className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">{product.origin}</div>
                <div className="text-xs text-muted-foreground">Origine</div>
              </div>
            </div>

            {/* Quantité et ajout au panier */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantité:</span>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => updateQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => updateQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Ajouter au panier
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={isFavorite ? 'text-red-500 border-red-500' : ''}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Onglets d'informations détaillées */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="ingredients">Ingrédients</TabsTrigger>
              <TabsTrigger value="preparation">Préparation</TabsTrigger>
              <TabsTrigger value="reviews">Avis ({product.reviews})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Description détaillée</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>{product.description}</p>
                  <p className="mt-4">
                    Ce thé d'exception provient de {product.origin} et offre une expérience gustative unique. 
                    Parfait pour les amateurs de thé recherchant qualité et authenticité.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ingredients" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Composition</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preparation" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Guide de préparation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Température de l'eau</h4>
                      <p className="text-muted-foreground">{product.temperature}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Temps d'infusion</h4>
                      <p className="text-muted-foreground">{product.brewingTime}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">Instructions</h4>
                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                      <li>Chauffer l'eau à la température recommandée</li>
                      <li>Utiliser 1 cuillère à café de thé pour 200ml d'eau</li>
                      <li>Laisser infuser pendant le temps indiqué</li>
                      <li>Filtrer et déguster</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Avis des clients</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Affichage des avis existants */}
                  <div className="space-y-4 mb-6">
                    {product.reviews > 0 ? (
                      Array.from({ length: product.reviews }).map((_, i) => (
                        <div key={i} className="border-b pb-4 last:border-b-0 last:pb-0">
                          <div className="flex items-center mb-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span className="text-sm font-medium ml-2">Excellent produit !</span>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">"J'adore ce thé, il est parfait pour le matin."</p>
                          <span className="text-xs text-gray-500">Par Jean Dupont, le 10 septembre 2025</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">Aucun avis pour le moment. Soyez le premier à laisser un avis !</p>
                    )}
                  </div>

                  {/* Bouton pour écrire un avis */}
                  <Button 
                    className="w-full"
                    onClick={() => {
                      if (isAuthenticated) {
                        if (hasPurchased(product.id)) {
                          setIsReviewModalOpen(true)
                        } else {
                          alert("Vous devez avoir acheté ce produit pour laisser un avis.")
                        }
                      } else {
                        alert("Vous devez être connecté pour laisser un avis.")
                      }
                    }}
                  >
                    Écrire un avis
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <ReviewForm 
              isOpen={isReviewModalOpen} 
              onClose={() => setIsReviewModalOpen(false)} 
              onSubmit={handleReviewSubmit} 
            />
          </Tabs>
        </div>

        {/* Produits similaires */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Produits similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="tea-card">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">{relatedProduct.category}</Badge>
                    <CardTitle className="text-lg">{relatedProduct.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {relatedProduct.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-primary">{relatedProduct.price}€</span>
                      <Button asChild size="sm">
                        <Link to={`/product/${relatedProduct.id}`}>Voir</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail

