import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import '/src/styles/NavBar.css';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';


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
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">Tienda-Online</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Tienda</Nav.Link>
            <Nav.Link as={Link} to="/carrito">
              <i className="bi bi-cart4 me-1"></i> 
              Carrito ({cartCount})
            </Nav.Link>
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
                <Navbar.Text className="me-3">Hola, {user.nombre}</Navbar.Text>
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