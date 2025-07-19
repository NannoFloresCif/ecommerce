import { useState } from 'react';

export function useCart() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    // Usamos la forma funcional de setState para garantizar que usamos el estado más reciente
    setCartItems(prevItems => {
      // Buscamos el índice del producto en el carrito
      
      const itemIndex = prevItems.findIndex(item => item.id === product.id);
       // Si el producto ya está en el carrito (findIndex no devuelve -1)
      if(itemIndex > -1) {
        // Usamos .map() para crear un nuevo array
        return prevItems.map((item, index) => {
          // Si este es el item que queremos actualizar...
          if (index === itemIndex) {
            // ...devolvemos un NUEVO OBJETO con la cantidad actualizada
            return { ...item, quantity: item.quantity + 1 };
          }
          // Si no, devolvemos el item sin cambios
          return item;
        });
      } else {
        // Si el producto no está, lo agregamos al array con la propiedad 'quantity' en 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems =>
      // .filter() crea un nuevo array con todos los items excepto el que coincida con el id
      prevItems.filter(item => item.id !== productId)
    );
  };

  const decrementItemQuantity = (productId) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === productId);
      // Si la cantidad del producto es 1, al disminuir lo quitamos del carrito
      if (prevItems[itemIndex].quantity === 1) {
        return prevItems.filter(item => item.id !== productId);
      } else {
        // Si no, solo le restamos 1 a la cantidad
        return prevItems.map((item, index) =>
          index === itemIndex
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  // ... aquí irán las futuras funciones como removeFromCart, etc.

  return { cartItems, handleAddToCart, removeFromCart, decrementItemQuantity };
}