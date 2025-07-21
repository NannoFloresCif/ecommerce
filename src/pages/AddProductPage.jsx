import ProductForm from '../components/ProductForm';

function AddProductPage({ onAddProduct, uploading  }) {
  const handleAddSubmit = (formData, imageFile) => {
    onAddProduct(formData, imageFile);
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Agregar Nuevo Producto</h2>
      <ProductForm onFormSubmit={handleAddSubmit} uploading={uploading} />
    </div>
  );
}

export default AddProductPage;