import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';


function EditProductPage({ products, onUpdateProduct, uploading }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const productToEdit = products.find(p => p.id === productId);

  const handleUpdateSubmit = (formData, imageFile) => {
    onUpdateProduct(productId, formData, imageFile);
    navigate('/editar-productos');
  };

  if (!productToEdit) {
    return <p>Producto no encontrado o cargando...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Editar Producto</h2>
      <ProductForm 
        initialData={productToEdit} 
        onFormSubmit={handleUpdateSubmit}
        uploading={uploading}
      />
    </div>
  );
}

export default EditProductPage;