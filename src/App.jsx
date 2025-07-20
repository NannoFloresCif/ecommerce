import ProductList from './components/ProductList';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import AddProductPage from './pages/AddProductPage';
import { useCart } from './hooks/useCart';
import { useProducts } from './hooks/useProducts';
import ManageProductsPage from './pages/ManageProductsPage';
import EditProductPage from './pages/EditProductPage';

//import './App.css'

function App() {
  // Usamos el hook useCart para manejar el estado del carrito
  // 1. useCart es un custom hook que encapsula la lógica del carrito.
  // 2. useCart devuelve un objeto con el estado del carrito y una función para agregar productos al carrito.
  //    - cartItems: es un array que contiene los productos en el carrito.
  //    - handleAddToCart: es una función que toma un producto y lo agrega al carrito.
  //    - removeFromCart: es una función que toma un producto y lo elimina del carrito.
  //    - decrementItemQuantity: es una función que disminuye la cantidad de un producto en el carrito.
 
  const {cartItems, handleAddToCart, removeFromCart, decrementItemQuantity} = useCart();
  const { products, handleAddProduct, handleDeleteProduct, handleEditProduct } = useProducts();

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);


  return (
    <>
      <NavBar cartCount={totalCartItems} /> {/* 3. La NavBar está fuera de Routes, por lo que se mostrará en todas las páginas */}
      {/* 4. Routes define qué componente mostrar basado en la URL */}
      <Routes>
        <Route path="/" element={<ProductList products={products} onAddToCart={handleAddToCart} />} />
        <Route path="/carrito" element={<CartPage cartItems={cartItems} onAddToCart={handleAddToCart} onRemoveFromCart={removeFromCart} onDecrementItem={decrementItemQuantity} />} />
        <Route path="/agregar-producto" element={<AddProductPage onAddProduct={handleAddProduct} />}/>
        <Route path="/editar-productos" element={<ManageProductsPage products={products} onDeleteProduct={handleDeleteProduct} />} />
        <Route path="/editar-producto/:productId" element={<EditProductPage products={products} onUpdateProduct={handleEditProduct} />} />
      </Routes>  
    </>
  )
}

export default App
