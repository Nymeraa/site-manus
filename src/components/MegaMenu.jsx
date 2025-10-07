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
      bgColor: 'bg-amber-50'
    },
    {
      name: 'Thés Verts',
      href: '/thes-et-infusions/the-vert',
      description: 'Délicats et rafraîchissants',
      icon: Leaf,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Thés Blancs',
      href: '/thes-et-infusions/the-blanc',
      description: 'Subtils et raffinés',
      icon: Sparkles,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Rooibos',
      href: '/thes-et-infusions/rooibos',
      description: 'Sans théine, naturellement doux',
      icon: Leaf,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      name: 'Infusions',
      href: '/thes-et-infusions/infusions',
      description: 'Plantes et fruits pour le bien-être',
      icon: Sparkles,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      name: 'Nos Packs',
      href: '/thes-et-infusions/nos-packs',
      description: 'Coffrets et assortiments',
      icon: Gift,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    }
  ]

  const accessoryCategories = [
    {
      name: 'Théières',
      href: '/accessories/theieres',
      description: 'Pour infuser avec style',
      icon: Coffee,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      name: 'Tasses & Mugs',
      href: '/accessories/tasses-mugs',
      description: 'Pour savourer vos thés',
      icon: Coffee,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Infusion',
      href: '/accessories/infusion',
      description: 'Accessoires d\'infusion',
      icon: Leaf,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Conservation',
      href: '/accessories/conservation',
      description: 'Pour préserver vos thés',
      icon: Sparkles,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      name: 'Service',
      href: '/accessories/service',
      description: 'Art de la table',
      icon: Gift,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      name: 'Électroménager',
      href: '/accessories/electromenager',
      description: 'Appareils modernes',
      icon: Coffee,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
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
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-xl border border-gray-200 rounded-lg z-50" style={{width: '800px'}}>
      <div className="px-6 py-4">
        <div className="w-full">
          {/* Catégories principales */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link
                  key={category.name}
                  to={category.href}
                  onClick={onClose}
                  className="group p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <div className={`p-1.5 rounded-lg ${category.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className={`h-4 w-4 ${category.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-gray-900 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Lien "Voir tout" */}
          <div className="mt-4 pt-3 border-t border-gray-200 text-center">
            <Link
              to={type === 'tea' ? '/thes-et-infusions' : '/accessories'}
              onClick={onClose}
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors text-sm"
            >
              Voir tout {type === 'tea' ? 'nos thés et infusions' : 'nos accessoires'}
              <ChevronDown className="ml-1 h-4 w-4 rotate-[-90deg]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MegaMenu
