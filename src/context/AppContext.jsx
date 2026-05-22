import { useState } from 'react';
import { mockTransacoes, mockMercadorias, mockColheitas, mockRotas } from '../data/mockData';
import { createContext, useContext } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [transacoes, setTransacoes]   = useState([...mockTransacoes]);
  const [mercadorias, setMercadorias] = useState([...mockMercadorias]);
  const [colheitas, setColheitas]     = useState([...mockColheitas]);
  const [rotas, setRotas]             = useState([...mockRotas]);

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

  function adicionarColheita(colheita) {
    setColheitas((prev) => [...prev, colheita]);
  }

  function adicionarRota(rota) {
    setRotas((prev) => [...prev, rota]);
  }

  return (
    <AppContext.Provider
      value={{
        transacoes,
        mercadorias,
        colheitas,
        rotas,
        atualizarStatusTransacao,
        adicionarTransacao,
        retirarMercadoria,
        adicionarMercadoria,
        avaliarTransacao,
        adicionarColheita,
        adicionarRota,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
