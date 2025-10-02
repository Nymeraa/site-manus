import React, { useState, useEffect } from 'react'
import { CheckCircle, X } from 'lucide-react'

const CartNotification = ({ show, onClose, productName, isCustomBlend = false }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000) // Auto-close after 3 seconds
      
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className="bg-white border border-green-200 rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900">
              Produit ajouté au panier !
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              {productName}{isCustomBlend ? ' (mélange personnalisé)' : ''} a été ajouté à votre panier.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartNotification
