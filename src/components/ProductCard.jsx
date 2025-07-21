import '/src/styles/ProductCard.css';
import { Card, Button } from 'react-bootstrap';

function ProductCard({id, brand, model, description, price, stock, onAddToCart }) {


  return (
    <div className="product-card">
      <img src="https://via.placeholder.com/250" alt={`Imagen de ${brand} ${model}`} className = "product-card-image" />
      
      <div className="product-card-body">
        <h3 className = "product-card-title">{brand} - {model}</h3>
        <p className = "product-card-description">{description}.</p>
        <h4 className = "product-card-price">${price.toLocaleString('es-CL')} </h4>
        <p className = "product-card-stock">Stock: {stock}</p>
        <button className = "product-card-button" onClick = {() => onAddToCart({id, brand, model, description, price, stock })}>Agregar al Carrito</button>
      </div>
      
    </div>
  );
}

export default ProductCard;
