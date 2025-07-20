import { useState, useRef, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import '/src/styles/ProductForm.css';

function ProductForm({ initialData, onFormSubmit }) {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    description: '',
    price: '',
    stock: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]); // Se ejecuta cada vez que initialData cambia

  const validator = useRef(new SimpleReactValidator({
    messages: {
      required: 'Este campo es obligatorio.',
      numeric: 'Este campo debe ser numérico.',
      min: 'El valor debe ser al menos :min.',
    },
    element: (message) => <div className="form-error">{message}</div>
  }));

  const [, forceUpdate] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene que la página se recargue
     if (validator.current.allValid()) {
        onFormSubmit(formData);
    } else {
      // 6. Si no son válidos, mostramos los mensajes y forzamos el re-renderizado
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

      <button type="submit">{initialData ? 'Actualizar Producto' : 'Agregar Producto'}</button>
    </form>
  );
}

export default ProductForm;