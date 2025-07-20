import { Link } from 'react-router-dom'; // Usaremos Link en lugar de <a>
import '/src/styles/NavBar.css';

// Recibimos la cantidad de items en el carrito como una prop
function NavBar({ cartCount }) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Tienda Online</Link>
      <ul className="navbar-links">
        <li>
          <Link to="/">Tienda</Link>
        </li>
        <li>
            <Link to="/agregar-producto">Agregar Producto</Link>
        </li>
        <li>
  <         Link to="/editar-productos">Gestionar Productos</Link>
        </li>
        <li>
          <Link to="/carrito">Carrito ({cartCount})</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;