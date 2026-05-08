import { useState } from 'react';
import { mockTransacoes, mockMercadorias, mockUsers } from '../data/mockData';

// Contexto de estado global da aplicação (transações, mercadorias, etc.)
// Simula backend com useState

let _transacoes = [...mockTransacoes];
let _mercadorias = [...mockMercadorias];

import { createContext, useContext } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [transacoes, setTransacoes] = useState(_transacoes);
  const [mercadorias, setMercadorias] = useState(_mercadorias);

  function atualizarStatusTransacao(id, novoStatus) {
    setTransacoes((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: novoStatus } : t))
    );
  }

  function adicionarTransacao(transacao) {
    setTransacoes((prev) => [...prev, transacao]);
  }

  function retirarMercadoria(id, quantidade) {
    setMercadorias((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, quantidade: m.quantidade - quantidade, status: m.quantidade - quantidade <= 0 ? 'esgotado' : m.status }
          : m
      )
    );
  }

  function adicionarMercadoria(mercadoria) {
    setMercadorias((prev) => [...prev, mercadoria]);
  }

  function avaliarTransacao(id, avaliacao) {
    setTransacoes((prev) =>
      prev.map((t) => (t.id === id ? { ...t, avaliacao, status: 'entregue' } : t))
    );
  }

  return (
    <AppContext.Provider
      value={{
        transacoes,
        mercadorias,
        atualizarStatusTransacao,
        adicionarTransacao,
        retirarMercadoria,
        adicionarMercadoria,
        avaliarTransacao,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
