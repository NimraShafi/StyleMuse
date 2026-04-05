'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product } from './products'

interface FavoritesContextType {
  favorites: number[]
  addFavorite: (productId: number) => void
  removeFavorite: (productId: number) => void
  toggleFavorite: (productId: number) => void
  isFavorite: (productId: number) => boolean
  favoritesCount: number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('stylemuse-favorites')
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('stylemuse-favorites', JSON.stringify(favorites))
    }
  }, [favorites, mounted])

  const addFavorite = (productId: number) => {
    setFavorites(prev => [...prev, productId])
  }

  const removeFavorite = (productId: number) => {
    setFavorites(prev => prev.filter(id => id !== productId))
  }

  const toggleFavorite = (productId: number) => {
    if (favorites.includes(productId)) {
      removeFavorite(productId)
    } else {
      addFavorite(productId)
    }
  }

  const isFavorite = (productId: number) => favorites.includes(productId)

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      addFavorite, 
      removeFavorite, 
      toggleFavorite, 
      isFavorite, 
      favoritesCount: favorites.length 
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
