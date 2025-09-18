import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au chargement
    const savedUser = localStorage.getItem('teablend_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Simulation d'une API de connexion
      // Dans un vrai projet, ceci ferait appel à votre backend
      const mockUser = {
        id: 1,
        email: email,
        firstName: 'Jean',
        lastName: 'Dupont',
        joinDate: '2024-01-15'
      }

      // Simulation d'une vérification basique
      if (email && password.length >= 6) {
        setUser(mockUser)
        localStorage.setItem('teablend_user', JSON.stringify(mockUser))
        return { success: true }
      } else {
        return { success: false, error: 'Email ou mot de passe incorrect' }
      }
    } catch (error) {
      return { success: false, error: 'Erreur de connexion' }
    }
  }

  const register = async (userData) => {
    try {
      // Simulation d'une API d'inscription
      const newUser = {
        id: Date.now(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        joinDate: new Date().toISOString().split('T')[0]
      }

      setUser(newUser)
      localStorage.setItem('teablend_user', JSON.stringify(newUser))
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Erreur lors de l\'inscription' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('teablend_user')
  }

  const updateProfile = async (userData) => {
    try {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem('teablend_user', JSON.stringify(updatedUser))
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Erreur lors de la mise à jour' }
    }
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

