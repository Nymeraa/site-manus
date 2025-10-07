import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, ShoppingCart, Leaf, ChevronDown, Search, User } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useCart } from '../context/CartContext'
import SearchModal from './SearchModal'
import MegaMenu from './MegaMenu'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [teaMegaMenuOpen, setTeaMegaMenuOpen] = useState(false)
  const [accessoryMegaMenuOpen, setAccessoryMegaMenuOpen] = useState(false)
  const location = useLocation()
  const { getItemCount } = useCart()

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Thés et Infusions', href: '/thes-et-infusions', isMegaMenu: true, megaMenuType: 'tea' },
    { name: 'Créer ton mélange !', href: '/custom-blend' },
    { name: 'Accessoires', href: '/accessories', isMegaMenu: true, megaMenuType: 'accessories' },
    { name: 'Blogs', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/src/assets/logo_reves_en_feuilles.png" alt="Rêves en Feuilles Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold text-primary">RÊVES EN FEUILLES</span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              item.isMegaMenu ? (
                <div key={item.name} className="relative">
                  <Button 
                    variant="ghost" 
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive(item.href)
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-muted-foreground'
                    }`}
                    onMouseEnter={() => {
                      if (item.megaMenuType === 'tea') {
                        setTeaMegaMenuOpen(true)
                        setAccessoryMegaMenuOpen(false)
                      } else if (item.megaMenuType === 'accessories') {
                        setAccessoryMegaMenuOpen(true)
                        setTeaMegaMenuOpen(false)
                      }
                    }}
                  >
                    {item.name} <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href)
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Recherche */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Compte */}
            <Button variant="outline" size="sm" asChild>
              <Link to="/account">
                <User className="h-4 w-4" />
              </Link>
            </Button>



            {/* Panier */}
            <Link to="/cart">
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {getItemCount() > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {getItemCount()}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Menu Mobile */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-primary ${
                        isActive(item.href)
                          ? 'text-primary'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
      {/* Modal de recherche */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      {/* Méga Menus */}
      <div 
        className="relative"
        onMouseLeave={() => {
          setTeaMegaMenuOpen(false)
          setAccessoryMegaMenuOpen(false)
        }}
      >
        <MegaMenu
          title="Thés et Infusions"
          type="tea"
          isOpen={teaMegaMenuOpen}
          onToggle={() => setTeaMegaMenuOpen(!teaMegaMenuOpen)}
          onClose={() => {
            setTeaMegaMenuOpen(false)
            setAccessoryMegaMenuOpen(false)
          }}
        />
        <MegaMenu
          title="Accessoires"
          type="accessories"
          isOpen={accessoryMegaMenuOpen}
          onToggle={() => setAccessoryMegaMenuOpen(!accessoryMegaMenuOpen)}
          onClose={() => {
            setTeaMegaMenuOpen(false)
            setAccessoryMegaMenuOpen(false)
          }}
        />
      </div>
    </header>
  )
}

export default Header

