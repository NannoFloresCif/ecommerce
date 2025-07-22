
import ProductCard from './ProductCard.jsx';    // Importamos la tarjeta
import '/src/styles/ProductList.css'; // Importamos los estilos de la lista de productos
import { Container, Row, Col } from 'react-bootstrap';

function ProductList({ products, onAddToCart }) {
  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">Nuestros Productos</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map(product => (
          <Col key={product.id}>
            <ProductCard {...product} onAddToCart={onAddToCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;