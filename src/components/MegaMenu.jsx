import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Leaf, Coffee, Sparkles, Gift } from 'lucide-react'

const MegaMenu = ({ title, type, isOpen, onToggle, onClose }) => {
  const teaCategories = [
    {
      name: 'Thés Noirs',
      href: '/thes-et-infusions/the-noir',
      description: 'Corsés et riches en saveurs',
      icon: Coffee,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      items: ['Earl Grey', 'English Breakfast', 'Darjeeling', 'Assam']
    },
    {
      name: 'Thés Verts',
      href: '/thes-et-infusions/the-vert',
      description: 'Délicats et rafraîchissants',
      icon: Leaf,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      items: ['Sencha', 'Matcha', 'Jasmin', 'Gunpowder']
    },
    {
      name: 'Thés Blancs',
      href: '/thes-et-infusions/the-blanc',
      description: 'Subtils et raffinés',
      icon: Sparkles,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      items: ['Pai Mu Tan', 'Silver Needle', 'Moonlight White']
    },
    {
      name: 'Rooibos',
      href: '/thes-et-infusions/rooibos',
      description: 'Sans théine, naturellement doux',
      icon: Leaf,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      items: ['Nature', 'Vanille', 'Épices', 'Fruits rouges']
    },
    {
      name: 'Infusions',
      href: '/thes-et-infusions/infusions',
      description: 'Plantes et fruits pour le bien-être',
      icon: Sparkles,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      items: ['Camomille', 'Menthe', 'Verveine', 'Tilleul']
    },
    {
      name: 'Nos Packs',
      href: '/thes-et-infusions/nos-packs',
      description: 'Coffrets et assortiments',
      icon: Gift,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      items: ['Découverte', 'Premium', 'Détente', 'Énergie']
    }
  ]

  const accessoryCategories = [
    {
      name: 'Théières',
      href: '/accessories?category=Théières',
      description: 'Pour infuser avec style',
      icon: Coffee,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      items: ['Fonte', 'Porcelaine', 'Verre', 'Céramique']
    },
    {
      name: 'Tasses & Mugs',
      href: '/accessories?category=Tasses & Mugs',
      description: 'Pour savourer vos thés',
      icon: Coffee,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      items: ['Porcelaine', 'Grès', 'Verre', 'Bambou']
    },
    {
      name: 'Infusion',
      href: '/accessories?category=Infusion',
      description: 'Accessoires d\'infusion',
      icon: Leaf,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      items: ['Boules à thé', 'Filtres', 'Passoires', 'Infuseurs']
    },
    {
      name: 'Conservation',
      href: '/accessories?category=Conservation',
      description: 'Pour préserver vos thés',
      icon: Sparkles,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      items: ['Boîtes hermétiques', 'Sachets', 'Bocaux', 'Étuis']
    },
    {
      name: 'Service',
      href: '/accessories?category=Service',
      description: 'Art de la table',
      icon: Gift,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      items: ['Plateaux', 'Cuillères', 'Sucriers', 'Pots à lait']
    },
    {
      name: 'Électroménager',
      href: '/accessories?category=Électroménager',
      description: 'Appareils modernes',
      icon: Coffee,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      items: ['Bouilloires', 'Théières électriques', 'Minuteurs']
    }
  ]

  const categories = type === 'tea' ? teaCategories : accessoryCategories
  const featuredItems = type === 'tea' 
    ? [
        { name: 'Créer ton mélange !', href: '/custom-blend', description: 'Compose ton thé unique' },
        { name: 'Nouveautés', href: '/thes-et-infusions?filter=new', description: 'Nos dernières découvertes' },
        { name: 'Meilleures ventes', href: '/thes-et-infusions?filter=bestseller', description: 'Les favoris de nos clients' }
      ]
    : [
        { name: 'Nouveautés', href: '/accessories?filter=new', description: 'Derniers arrivages' },
        { name: 'Meilleures ventes', href: '/accessories?filter=bestseller', description: 'Les plus populaires' },
        { name: 'Coffrets cadeaux', href: '/accessories?category=Service', description: 'Idées cadeaux' }
      ]

  if (!isOpen) return null

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Catégories principales */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <Link
                    key={category.name}
                    to={category.href}
                    onClick={onClose}
                    className="group p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${category.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                        <IconComponent className={`h-5 w-5 ${category.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {category.description}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {category.items.slice(0, 3).map((item, index) => (
                            <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {item}
                            </span>
                          ))}
                          {category.items.length > 3 && (
                            <span className="text-xs text-gray-400">+{category.items.length - 3}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Section mise en avant */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border">
              <h3 className="font-bold text-gray-900 mb-4">
                {type === 'tea' ? 'À découvrir' : 'Sélection'}
              </h3>
              <div className="space-y-3">
                {featuredItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow duration-200"
                  >
                    <h4 className="font-medium text-gray-900 hover:text-primary transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
              
              {type === 'tea' && (
                <div className="mt-6 p-4 bg-white rounded-lg border-2 border-dashed border-green-200">
                  <div className="text-center">
                    <Leaf className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Personnalisation</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Créez votre mélange unique avec nos ingrédients premium
                    </p>
                    <Link
                      to="/custom-blend"
                      onClick={onClose}
                      className="inline-block mt-3 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Commencer
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lien "Voir tout" */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link
            to={type === 'tea' ? '/thes-et-infusions' : '/accessories'}
            onClick={onClose}
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Voir tout {type === 'tea' ? 'nos thés et infusions' : 'nos accessoires'}
            <ChevronDown className="ml-1 h-4 w-4 rotate-[-90deg]" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MegaMenu
