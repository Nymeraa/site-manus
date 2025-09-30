import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShoppingBag, Minus, Plus, Trash2, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotal, getItemCount, clearCart } = useCart()

  const shippingCost = getTotal() >= 50 ? 0 : 5.90
  const finalTotal = getTotal() + shippingCost

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Votre panier est vide</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Découvrez notre sélection de thés et infusions artisanaux
            </p>
            <Button asChild size="lg">
              <Link to="/catalog">Découvrir nos produits</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/catalog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continuer mes achats
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Mon Panier ({getItemCount()} article{getItemCount() > 1 ? 's' : ''})</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles du panier */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg">
                        {item.name}
                        {item.isCustomBlend && <span className="text-sm text-green-600 ml-2">(mélange personnalisé)</span>}
                      </h3>
                      {item.isCustomBlend ? (
                        <div className="text-sm text-muted-foreground mt-1">
                          <p>Base: {item.base ? `${item.base} (base)` : 'N/A'}</p>
                          <p>Ingrédients: {item.ingredients && item.ingredients.length > 0 
                            ? item.ingredients.map(ing => `${ing.name} (${ing.category || 'ingrédient'})`).join(', ') 
                            : 'Aucun'}</p>
                          <p>Quantité: {item.blendQuantity || item.quantity || 1}</p>
                          {item.description && <p>Description: {item.description}</p>}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Prix unitaire: {(item.price || 0).toFixed(2)}€</p>
                      )}
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity || 1}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right min-w-0">
                        <div className="font-semibold text-lg">
                          {((item.price || 0) * (item.quantity || 1)).toFixed(2)}€
                        </div>
                      </div>

                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-between items-center pt-4">
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="text-red-500 border-red-500 hover:bg-red-50"
              >
                Vider le panier
              </Button>
            </div>
          </div>

          {/* Résumé de commande */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Résumé de commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{getTotal().toFixed(2)}€</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600 font-medium">Gratuite</span>
                    ) : (
                      `${shippingCost}€`
                    )}
                  </span>
                </div>

                {getTotal() < 50 && (
                  <div className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">
                    Ajoutez {(50 - getTotal()).toFixed(2)}€ pour bénéficier de la livraison gratuite
                  </div>
                )}

                <Separator />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{finalTotal.toFixed(2)}€</span>
                </div>

                <Button className="w-full" size="lg">
                  Procéder au paiement
                </Button>

                <div className="text-center">
                  <Button variant="link" asChild>
                    <Link to="/catalog">Continuer mes achats</Link>
                  </Button>
                </div>

                {/* Code promo */}
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="promo">Code promo</Label>
                  <div className="flex space-x-2">
                    <Input id="promo" placeholder="Entrez votre code" />
                    <Button variant="outline">Appliquer</Button>
                  </div>
                </div>

                {/* Informations de livraison */}
                <div className="text-sm text-muted-foreground space-y-1 pt-4">
                  <p>🚚 Livraison gratuite dès 50€</p>
                  <p>📦 Expédition sous 24-48h</p>
                  <p>🔒 Paiement sécurisé</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

