import { useState, useEffect } from 'react';
import { db, storage } from '../firebase/firebase'; // Importamos nuestra conexión a la BD
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore'; // Funciones de Firestore
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


export function useProducts() {
  const [products, setProducts] = useState([]);
  const [uploading, setUploading] = useState(false);

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
  }, []);

  const handleAddProduct = async (newProduct, imageFile) => {
    if (!imageFile) {
      console.error("ERROR: No se proporcionó archivo de imagen.");
      alert("Por favor, selecciona una imagen para el producto.");
      return;
    }
    setUploading(true);
    try {
      // 1. Crear una referencia en Storage para la nueva imagen
      const storageRef = ref(storage, `products/${Date.now()}-${imageFile.name}`);
       console.log("✅ 3. Referencia de Storage creada:", storageRef.fullPath);
      
      // 2. Subir el archivo de imagen
      console.log("⏳ 4. A punto de llamar a uploadBytes. Esto puede tardar...")
      await uploadBytes(storageRef, imageFile);
      console.log("✅ 5. ¡uploadBytes completado! La imagen está en Storage.");

      
      // 3. Obtener la URL pública de la imagen recién subida
      console.log("⏳ 6. Obteniendo URL de descarga...");
      const imageUrl = await getDownloadURL(storageRef);
      console.log("✅ 7. URL obtenida:", imageUrl);
      
      // 4. Guardar el producto en Firestore, AHORA con la propiedad imageUrl
      const productToSave = { ...newProduct, imageUrl };
      console.log("⏳ 8. Guardando en Firestore el producto:", productToSave);
      const docRef = await addDoc(collection(db, "products"), productToSave);
      console.log("✅ 9. ¡Guardado en Firestore con éxito! ID:", docRef.id);
      
      // 5. Actualizar el estado local para que la UI se refresque
      setProducts(prevProducts => [...prevProducts, { id: docRef.id, ...productToSave }]);
    } catch (error) {
      console.error("ERROR ATRAPADO DURANTE LA SUBIDA ", error);
      alert(`Ocurrió un error: ${error.message}`);
    } finally {
      console.log("🏁 10. Bloque finally ejecutado. Finalizando carga.");
      setUploading(false); // Termina la carga, sea exitosa o no
    }
  };

  const handleUpdateProduct = async (productId, updatedData, imageFile) => {
    setUploading(true);
    let imageUrl = updatedData.imageUrl; // Por defecto, mantiene la imagen que ya tenía
    try {
      // Si el usuario seleccionó una imagen nueva, la subimos y actualizamos la URL
      if (imageFile) {
        const storageRef = ref(storage, `products/${Date.now()}-${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }
      
      const productToUpdate = { ...updatedData, imageUrl };
      const productDocRef = doc(db, "products", productId);
      await updateDoc(productDocRef, productToUpdate);
      
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === productId ? { id: p.id, ...productToUpdate } : p
        )
      );
    } catch (error) {
      console.error("Error al actualizar el producto: ", error);
    } finally {
      setUploading(false);
    }
  };
  
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        const productDocRef = doc(db, "products", productId);
        await deleteDoc(productDocRef);
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
        alert("Producto eliminado con éxito.");
      } catch (error) {
        console.error("Error al eliminar el producto: ", error);
        alert("Hubo un error al eliminar el producto.");
      }
    }
  };

  return { products, handleAddProduct, handleDeleteProduct, handleUpdateProduct, uploading };
}

  
  