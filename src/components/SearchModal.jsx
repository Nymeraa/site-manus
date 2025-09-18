import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, X } from 'lucide-react'
import { products } from '../data/products'
import { accessories } from '../data/accessories'

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    if (searchTerm.trim()) {
      const productResults = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).map(product => ({ ...product, type: 'product' }))

      const accessoryResults = accessories.filter(accessory =>
        accessory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        accessory.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        accessory.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).map(accessory => ({ ...accessory, type: 'accessory' }))

      setResults([...productResults, ...accessoryResults].slice(0, 8))
    } else {
      setResults([])
    }
  }, [searchTerm])

  const handleClose = () => {
    setSearchTerm('')
    setResults([])
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Rechercher un produit
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tapez votre recherche..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          {searchTerm && (
            <div className="max-h-96 overflow-y-auto">
              {results.length > 0 ? (
                <div className="space-y-2">
                  {results.map((item) => (
                    <Link
                      key={`${item.type}-${item.id}`}
                      to={item.type === 'product' ? `/product/${item.id}` : `/accessory/${item.id}`}
                      onClick={handleClose}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium line-clamp-1">{item.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {item.type === 'product' ? 'Thé' : 'Accessoire'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {item.description}
                        </p>
                        <p className="text-sm font-medium text-primary">
                          {item.price}€
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Aucun résultat trouvé pour "{searchTerm}"</p>
                </div>
              )}
            </div>
          )}

          {!searchTerm && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Commencez à taper pour rechercher des produits</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SearchModal

