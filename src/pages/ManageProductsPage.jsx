import '/src/styles/ManageProductsPage.css';
import { useNavigate } from 'react-router-dom';

function ManageProductsPage({ products, onDeleteProduct }) {
    const navigate = useNavigate();
    
  return (
    <div className="manage-page">
      <h2>Gestionar Productos</h2>
      <div className="product-management-list">
        {products.map(product => (
          <div key={product.id} className="product-management-item">
            <span>{product.brand} - {product.model}</span>
            <div className="buttons">
              <button className="edit-btn" onClick={() => navigate(`/editar-producto/${product.id}`)}>Editar</button>
              <button className="delete-btn" onClick={() => onDeleteProduct(product.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageProductsPage;