import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import '/src/styles/NavBar.css';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

// Recibimos la cantidad de items en el carrito como una prop
function NavBar({ cartCount }) {
    const { user, logOut } = useAuth(); // 2. Obtiene el usuario y la función de logout
    const navigate = useNavigate();

    const handleLogout = async () => {
    await logOut();
    navigate('/auth');
    };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">MiTienda</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Tienda</Nav.Link>
            <Nav.Link as={Link} to="/carrito"><i className="bi bi-cart4 me-1" >({cartCount})</i></Nav.Link>
            {user && user.tipoDeUsuario === 'administrador' && (
              <>
                <Nav.Link as={Link} to="/agregar-producto">Agregar Producto</Nav.Link>
                <Nav.Link as={Link} to="/editar-productos">Gestionar Productos</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {user ? (
              <>
                <Navbar.Text className="me-2">Hola, {user.nombre}</Navbar.Text>
                <Button variant="outline-danger" size="sm" onClick={handleLogout}>Cerrar Sesión</Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/auth">Login / Registro</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;