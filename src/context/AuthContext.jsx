import { createContext, useContext, useState } from 'react';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    try {
      const salvo = localStorage.getItem('porto_usuario');
      return salvo ? JSON.parse(salvo) : null;
    } catch {
      return null;
    }
  });

  function login(cpf, papel) {
    const encontrado = mockUsers.find(
      (u) => u.cpf === cpf && u.papel === papel
    );
    if (encontrado) {
      setUsuario(encontrado);
      localStorage.setItem('porto_usuario', JSON.stringify(encontrado));
      return true;
    }
    return false;
  }

  function logout() {
    setUsuario(null);
    localStorage.removeItem('porto_usuario');
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
