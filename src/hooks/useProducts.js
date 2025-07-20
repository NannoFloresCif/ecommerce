import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase'; // Importamos nuestra conexión a la BD
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore'; // Funciones de Firestore


export function useProducts() {
  const [products, setProducts] = useState([]);

  // useEffect se ejecuta una vez cuando el componente se monta, 
  // perfecto para cargar los datos iniciales.
  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const productsSnapshot = await getDocs(productsCollection);
      const productList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productList);
    };
    fetchProducts();
  }, []); // El array vacío asegura que solo se ejecute una vez

  const handleAddProduct = async (newProduct) => {
    try {
      // addDoc agrega un nuevo documento a la colección "products"
      const docRef = await addDoc(collection(db, "products"), newProduct);
      // Actualizamos el estado local para que la UI se refresque al instante
      setProducts(prevProducts => [...prevProducts, { id: docRef.id, ...newProduct }]);
    } catch (error) {
      console.error("Error al agregar el producto: ", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        // Creamos una referencia directa al documento que queremos eliminar
        const productDocRef = doc(db, "products", productId);
        // Llamamos a la función para borrar el documento
        await deleteDoc(productDocRef);
        // Actualizamos el estado local para reflejar el cambio en la UI al instante
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
        alert("Producto eliminado con éxito.");
      } catch (error) {
        console.error("Error al eliminar el producto: ", error);
        alert("Hubo un error al eliminar el producto.");
      }
    }
  };

  const handleEditProduct = async (productId, updatedProduct) => {
    try {
        const productDocRef = doc(db, "products", productId);
        // Usamos updateDoc para actualizar el documento con los nuevos datos
        await updateDoc(productDocRef, updatedProduct);
      // Actualizamos el estado local para reflejar el cambio en la UI
        setProducts(prevProducts => 
            prevProducts.map(p => 
            p.id === productId ? { ...p, ...updatedProduct } : p
        )
      );
      alert("Producto actualizado con éxito.");
    } catch (error) {
      console.error("Error al actualizar el producto: ", error);
      alert("Hubo un error al actualizar el producto.");
    }

    }



    return { products, handleAddProduct, handleDeleteProduct, handleEditProduct };
  };

  
  