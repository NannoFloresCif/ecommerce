import ProductForm from '../components/ProductForm';

function AddProductPage({ onAddProduct }) {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Agregar Nuevo Producto</h2>
      <ProductForm onAddProduct={onAddProduct} />
    </div>
  );
}

export default AddProductPage;