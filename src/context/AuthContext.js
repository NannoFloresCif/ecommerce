import { createContext, useContext } from 'react';

// 1. Exportamos el Context desde aquí
export const AuthContext = createContext();

// 2. Exportamos el hook para consumir el contexto desde aquí
export const useAuth = () => {
    return useContext(AuthContext);
}