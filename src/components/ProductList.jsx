
import ProductCard from './ProductCard.jsx';    // Importamos la tarjeta
import '/src/styles/ProductList.css'; // Importamos los estilos de la lista de productos

function ProductList({ products, onAddToCart }) {
  return (
    <div className="product-list">
      {products.map(product => (
        //pasamos las propiedades del objeto 'product' como props
        <ProductCard key={product.id} {...product} onAddToCart={onAddToCart} /> //  {...product} es un "spread operator" de JavaScript. Es un atajo muy útil que toma todas las propiedades del objeto product (id, brand, model, etc.) y las pasa como props individuales al componente ProductCard. Es equivalente a escribir: <ProductCard key={product.id} id={product.id} brand={product.brand} model={product.model} ... />.
      
      ))}
    </div>

  );
}

export default ProductList;