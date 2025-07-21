import { useState } from 'react';

export function useCart() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === product.id);
      if (itemIndex > -1) {
        return prevItems.map((item, index) =>
          index === itemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== productId)
    );
  };

  const decrementItemQuantity = (productId) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === productId);
      if (prevItems[itemIndex].quantity === 1) {
        return prevItems.filter(item => item.id !== productId);
      } else {
        return prevItems.map((item, index) =>
          index === itemIndex
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  return {cartItems, handleAddToCart, removeFromCart, decrementItemQuantity};
}