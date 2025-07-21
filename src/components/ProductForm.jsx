import { useState, useRef, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import '/src/styles/ProductForm.css';

function ProductForm({ onFormSubmit, initialData, uploading }) {
  const [formData, setFormData] = useState({
    brand: '', model: '', description: '', price: '', stock: '',
  });
  const [imageFile, setImageFile] = useState(null);

  const validator = useRef(new SimpleReactValidator({
    messages: {
      required: 'Este campo es obligatorio.',
      numeric: 'Este campo debe ser numérico.',
      min: 'El valor debe ser al menos :min.',
    },
    element: (message) => <div className="form-error">{message}</div>
  }));
  
  const [, forceUpdate] = useState();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      onFormSubmit(formData, imageFile);
    } else {
      validator.current.showMessages();
      forceUpdate({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <label>Marca:</label>
      <input type="text" name="brand" value={formData.brand} onChange={handleChange} />
      {validator.current.message('brand', formData.brand, 'required')}

      <label>Modelo:</label>
      <input type="text" name="model" value={formData.model} onChange={handleChange} />
      {validator.current.message('model', formData.model, 'required')}
      
      <label>Descripción:</label>
      <textarea name="description" value={formData.description} onChange={handleChange} />
      {validator.current.message('description', formData.description, 'required')}

      <label>Precio:</label>
      <input type="number" name="price" value={formData.price} onChange={handleChange} />
      {validator.current.message('price', formData.price, 'required|numeric|min:0,num')}

      <label>Stock:</label>
      <input type="number" name="stock" value={formData.stock} onChange={handleChange} />
      {validator.current.message('stock', formData.stock, 'required|numeric|min:0,num')}

      <label>Imagen del Producto:</label>
      <input type="file" onChange={handleImageChange} />

      {initialData && initialData.imageUrl && (
        <div style={{ marginTop: '10px' }}>
          <p>Imagen actual:</p>
          <img src={initialData.imageUrl} alt="Vista previa" style={{ width: '100px' }} />
        </div>
      )}

      <button type="submit" disabled={uploading}>
        {uploading ? 'Guardando...' : (initialData ? 'Actualizar Producto' : 'Agregar Producto')}
      </button>
    </form>
  );
}

export default ProductForm;