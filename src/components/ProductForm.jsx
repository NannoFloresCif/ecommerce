import { useState, useRef, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import '/src/styles/ProductForm.css';
import { Form, Button } from 'react-bootstrap';

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
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
      <Form.Label>Marca:</Form.Label>
      <Form.Control type="text" name="brand" value={formData.brand} onChange={handleChange} />
      {validator.current.message('brand', formData.brand, 'required')}
      </Form.Group>

      <Form.Group className="mb-3">
      <Form.Label>Modelo:</Form.Label>
      <Form.Control type="text" name="model" value={formData.model} onChange={handleChange} />
      {validator.current.message('model', formData.model, 'required')}
      </Form.Group>

      <Form.Group className="mb-3">
      <Form.Label>Descripción:</Form.Label>
      <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} />
      {validator.current.message('description', formData.description, 'required')}
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Precio:</Form.Label>
        <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} />
        {validator.current.message('price', formData.price, 'required|numeric|min:0,num')}
      </Form.Group>
      
      <Form.Group className="mb-3"> 

      <Form.Label>Stock:</Form.Label>
      <Form.Control type="number" name="stock" value={formData.stock} onChange={handleChange} />
      {validator.current.message('stock', formData.stock, 'required|numeric|min:0,num')}
      </Form.Group>

      <Form.Group className="mb-3"> 

      <Form.Label>Imagen del Producto:</Form.Label>
      <Form.Control type="file" onChange={handleImageChange} />
      </Form.Group>

      {initialData && initialData.imageUrl && (
        <div style={{ marginTop: '10px' }}>
          <p>Imagen actual:</p>
          <img src={initialData.imageUrl} alt="Vista previa" style={{ width: '100px' }} />
        </div>
      )}

      <Button variant="success" type="submit" disabled={uploading}>
        {uploading ? 'Guardando...' : (initialData ? 'Actualizar Producto' : 'Agregar Producto')}
      </Button>
    </Form>
  );
}

export default ProductForm;