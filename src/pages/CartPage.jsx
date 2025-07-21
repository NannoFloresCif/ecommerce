import '/src/styles/CartPage.css';

function CartPage({ cartItems, onAddToCart, onDecrementItem, onRemoveFromCart }) { 
    // Calculamos el total usando el método .reduce()
    const total = cartItems.reduce((sum, item) => sum + item.price*item.quantity , 0);
    
    if (cartItems.length === 0) {
        return (
            <div className="cart-empty">
                <h2>Tu carrito de compras está vacío</h2>
                <p>¡Agrega productos desde la tienda para verlos aquí!</p>
            </div>
        );
    }

  return (
    <div className="cart-page">
      <h2>Tu Carrito</h2>
      <div className="cart-items">
        { cartItems.map(item => (
            <div key={item.id} className = "cart-item">
                <span className="item-name">{item.brand} {item.model}</span>
                <div className="item-controls">
                    <button onClick={() => onDecrementItem(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onAddToCart(item)}>+</button>
                </div>
                <span className="item-price">Subtotal: ${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                <button onClick={() => onRemoveFromCart(item.id)} className="remove-button">Quitar</button>
            </div>
            
        ))}
        </div>
        <div className="cart-total">
            <h3>Total: ${total.toLocaleString('es-CL')}</h3>
        </div>
        </div>
  );
}

export default CartPage;