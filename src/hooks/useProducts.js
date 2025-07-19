import { useState } from 'react';
import { products as initialProducts } from '../data/products.js';

export function useProducts() {
  const [products, setProducts] = useState(initialProducts);

  const handleAddProduct = (newProduct) => {
    // En un futuro, en lugar de Date.now(), el ID vendrá de Firebase.
    const productWithId = { ...newProduct, id: Date.now() };
    setProducts(prevProducts => [...prevProducts, productWithId]);
  };

  // El hook devuelve el estado y las funciones que lo modifican.
  return { products, handleAddProduct };
}