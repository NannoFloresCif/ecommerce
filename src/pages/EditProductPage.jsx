import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

function EditProductPage({ products, onUpdateProduct }) {
  // useParams nos da los parámetros de la URL, en este caso :productId
  const { productId } = useParams();
  const navigate = useNavigate();

  // Buscamos el producto específico que se va a editar
  const productToEdit = products.find(p => p.id === productId);

  const handleUpdate = (updatedData) => {
    onUpdateProduct(productId, updatedData);
    // Después de actualizar, volvemos a la página de gestión
    navigate('/editar-productos');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Editar Producto</h2>
      {productToEdit ? (
        <ProductForm 
          initialData={productToEdit} 
          onFormSubmit={handleUpdate} 
        />
      ) : (
        <p>Cargando producto...</p>
      )}
    </div>
  );
}

export default EditProductPage;