import { useState } from 'react'

// STUB: Ajhok replaces the body on feat/products-api.
// The returned shape is the team-agreed interface, so do not change it.
export default function useProducts() {
  const [products] = useState([])
  return {
    products,
    loading: false,
    loadError: null,
    refreshProducts: () => {},
    addProduct: async () => {},
    updateProduct: async () => {},
    deleteProduct: async () => {},
  }
}