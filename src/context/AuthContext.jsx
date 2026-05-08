import { createContext, useContext, useState } from 'react';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  function login(cpf, papel) {
    const encontrado = mockUsers.find(
      (u) => u.cpf === cpf && u.papel === papel
    );
    if (encontrado) {
      setUsuario(encontrado);
      return true;
    }
    return false;
  }

  function logout() {
    setUsuario(null);
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
