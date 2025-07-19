import { useState } from 'react';
import '/src/styles/ProductForm.css';

function ProductForm({ onAddProduct }) {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    description: '',
    price: '',
    stock: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene que la página se recargue
    onAddProduct(formData);
    alert('¡Producto agregado!');
    // Opcional: limpiar el formulario después de enviar
    setFormData({ brand: '', model: '', description: '', price: '', stock: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <label>Marca:</label>
      <input type="text" name="brand" value={formData.brand} onChange={handleChange} />

      <label>Modelo:</label>
      <input type="text" name="model" value={formData.model} onChange={handleChange} />

      <label>Descripción:</label>
      <textarea name="description" value={formData.description} onChange={handleChange} />

      <label>Precio:</label>
      <input type="number" name="price" value={formData.price} onChange={handleChange} />

      <label>Stock:</label>
      <input type="number" name="stock" value={formData.stock} onChange={handleChange} />

      <button type="submit">Agregar Producto</button>
    </form>
  );
}

export default ProductForm;