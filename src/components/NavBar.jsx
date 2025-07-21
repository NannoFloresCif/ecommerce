import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import '/src/styles/NavBar.css';


// Recibimos la cantidad de items en el carrito como una prop
function NavBar({ cartCount }) {
    const { user, logOut } = useAuth(); // 2. Obtiene el usuario y la función de logout
    const navigate = useNavigate();

    const handleLogout = async () => {
    try {
      await logOut();
      navigate('/auth');
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">MiTienda</Link>
      <ul className="navbar-links">
        <li><Link to="/">Tienda</Link></li>
        <li><Link to="/carrito">Carrito ({cartCount})</Link></li>

        {user && user.tipoDeUsuario === 'administrador' && (
          <>
            <li><Link to="/agregar-producto">Agregar Producto</Link></li>
            <li><Link to="/editar-productos">Gestionar Productos</Link></li>
          </>
        )}
      </ul>
      
      <div className="navbar-auth">
        {user ? (
          <>
            <span>Hola, {user.nombre}</span>
            <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
          </>
        ) : (
          <Link to="/auth">Login / Registro</Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;