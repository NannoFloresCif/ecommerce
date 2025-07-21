import { useState } from 'react';
import '/src/styles/ProductForm.css'; // Reutilizaremos los estilos del otro formulario

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
    <form onSubmit={handleSubmit} className="product-form">
      {/* Campos que aparecen solo en modo registro */}
      {isRegisterMode && (
        <>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

          <label>Apellido:</label>
          <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
        </>
      )}

      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <label>Contraseña:</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} required />

      {/* Campo extra para confirmar contraseña en modo registro */}
      {isRegisterMode && (
        <>
          <label>Confirmar Contraseña:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

          <label>Tipo de Usuario:</label>
          <select name="tipoDeUsuario" value={formData.tipoDeUsuario} onChange={handleChange}>
            <option value="cliente">Cliente</option>
            <option value="administrador">Administrador</option>
          </select>
        </>
      )}

      <button type="submit">{isRegisterMode ? 'Registrarse' : 'Iniciar Sesión'}</button>
    </form>
  );
}

export default AuthForm;