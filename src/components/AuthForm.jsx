import { useState } from 'react';
import '/src/styles/ProductForm.css'; // Reutilizaremos los estilos del otro formulario
import { Form, Button } from 'react-bootstrap';

function AuthForm({ onFormSubmit, isRegisterMode }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    apellido: '',
    tipoDeUsuario: 'cliente', // Valor por defecto
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegisterMode && formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    onFormSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Campos que aparecen solo en modo registro */}
      {isRegisterMode && (
        <>
        <Form.Group className="mb-3">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Apellido:</Form.Label>
          <Form.Control type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
        </Form.Group>

        </>
      )}

      <Form.Group className="mb-3">
      <Form.Label>Email:</Form.Label>
      <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
      <Form.Label>Contraseña:</Form.Label>
      <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
      </Form.Group>


      {/* Campo extra para confirmar contraseña en modo registro */}
      {isRegisterMode && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Confirmar Contraseña:</Form.Label>
            <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label>Tipo de Usuario</Form.Label>
            <Form.Control as="select" name="tipoDeUsuario" value={formData.tipoDeUsuario} onChange={handleChange}>
              <option value="cliente">Cliente</option>
              <option value="administrador">Administrador</option>
            </Form.Control>
          </Form.Group>
        </>
      )}

      <Button type="submit">{isRegisterMode ? 'Registrarse' : 'Iniciar Sesión'}</Button>
    </Form>
  );
}

export default AuthForm;