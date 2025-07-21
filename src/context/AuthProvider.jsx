import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';
import { AuthContext } from './AuthContext.js';


// 2. Creamos el componente Proveedor
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

  // 3. useEffect para escuchar cambios en la autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Si hay un usuario en Firebase Auth, buscamos su perfil en Firestore
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          // Combinamos los datos de Auth y Firestore en nuestro estado 'user'
          setUser({ uid: firebaseUser.uid, email: firebaseUser.email, ...userDocSnap.data() });
        }
      } else {
        setUser(null);
      }
      setLoading(false); // Dejamos de cargar una vez que sabemos si hay usuario o no
    });

    // Limpiamos el listener al desmontar el componente
    return () => unsubscribe();
  }, []);

  // 4. Funciones para registrarse e iniciar sesión
  const signUp = async (email, password, nombre, apellido, tipoDeUsuario) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = userCredential.user;
    // Creamos el documento del perfil en Firestore
    await setDoc(doc(db, "users", newUser.uid), {
      nombre,
      apellido,
      email,
      tipoDeUsuario,
    });
  };

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  // 5. El valor que proveerá el Context
  const value = { user, loading, signUp, logIn, logOut };

  return (
    <AuthContext.Provider value={value}>
      {/* Mostramos los componentes hijos solo cuando no estamos cargando */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

