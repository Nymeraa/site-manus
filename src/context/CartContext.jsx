import React, { createContext, useContext, useReducer, useState } from 'react'
import CartNotification from '../components/CartNotification'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        }
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      }
    
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const [notification, setNotification] = useState({ show: false, productName: '', isCustomBlend: false })

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
    // Show notification
    setNotification({ 
      show: true, 
      productName: item.name, 
      isCustomBlend: item.isCustomBlend || false 
    })
  }

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id)
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
    }
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getTotal = () => {
    return state.items.reduce((total, item) => {
      const price = item.price || 0
      const quantity = item.quantity || 1
      return total + (price * quantity)
    }, 0)
  }

  const getItemCount = () => {
    return state.items.reduce((count, item) => count + (item.quantity || 1), 0)
  }

  const closeNotification = () => {
    setNotification({ show: false, productName: '', isCustomBlend: false })
  }

  return (
    <CartContext.Provider value={{
      items: state.items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getTotal,
      getItemCount
    }}>
      {children}
      <CartNotification 
        show={notification.show}
        productName={notification.productName}
        isCustomBlend={notification.isCustomBlend}
        onClose={closeNotification}
      />
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

