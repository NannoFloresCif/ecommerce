import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';

function AuthPage() {
  const [isRegisterMode, setIsRegisterMode] = useState(true); // Por defecto en modo registro
  const { signUp, logIn } = useAuth();
  const navigate = useNavigate();

  const handleAuthSubmit = async (formData) => {
    try {
      if (isRegisterMode) {
        await signUp(formData.email, formData.password, formData.nombre, formData.apellido, formData.tipoDeUsuario);
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        setIsRegisterMode(false); // Cambiamos a modo login
      } else {
        await logIn(formData.email, formData.password);
        navigate('/'); // Redirigimos al inicio después del login
      }
    } catch (error) {
      console.error("Error de autenticación:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(prevMode => !prevMode);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>{isRegisterMode ? 'Registro de Usuario' : 'Inicio de Sesión'}</h2>
      <AuthForm 
        onFormSubmit={handleAuthSubmit}
        isRegisterMode={isRegisterMode}
      />
      <button onClick={toggleMode} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', marginTop: '10px' }}>
        {isRegisterMode ? '¿Ya tienes una cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate'}
      </button>
    </div>
  );
}

export default AuthPage;