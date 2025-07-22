import '/src/styles/ProductCard.css';
import { Card, Button } from 'react-bootstrap';

function ProductCard({ id, brand, model, description, price, stock, imageUrl, onAddToCart }) {
 

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={imageUrl || "https://via.placeholder.com/250"}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{brand} - {model}</Card.Title>
        <Card.Text className="flex-grow-1">
          {description}
        </Card.Text>
        <Card.Subtitle className="mb-2 text-muted">
          Stock: {stock}
        </Card.Subtitle>
        <Card.Title as="h4">${Number(price).toLocaleString('es-CL')}</Card.Title>
        <Button 
          variant="primary" 
          onClick={() => onAddToCart({ id, brand, model, description, price, stock, imageUrl, onAddToCart })} 
          className="mt-auto"
          disabled={stock === 0}
        >
          {stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
