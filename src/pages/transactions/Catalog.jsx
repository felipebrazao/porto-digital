import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { mockUsers, mockTaxas } from '../../data/mockData';
import StatusBadge from '../../components/StatusBadge';
import PIXModal from '../../components/PIXModal';
import { FiShoppingCart, FiX } from 'react-icons/fi';

export default function Catalog() {
  const { usuario } = useAuth();
  const { mercadorias, adicionarTransacao, retirarMercadoria } = useApp();
  const navigate = useNavigate();

  const [busca, setBusca] = useState('');
  const [filtroPorto, setFiltroPorto] = useState('');
  const [modalItem, setModalItem] = useState(null); // mercadoria selecionada
  const [qtd, setQtd] = useState(1);
  const [autoRetirada, setAutoRetirada] = useState(true);
  const [pixAberto, setPixAberto] = useState(false);
  const [pedidoAtual, setPedidoAtual] = useState(null);

  const disponiveisParaComprar = mercadorias.filter(
    (m) => m.status === 'disponivel' && m.produtorId !== usuario?.id
  );

  const filtrados = disponiveisParaComprar.filter((m) => {
    if (busca && !m.produto.toLowerCase().includes(busca.toLowerCase())) return false;
    if (filtroPorto && m.portoRetirada !== filtroPorto) return false;
    return true;
  });

  const portosUnicos = [...new Set(disponiveisParaComprar.map((m) => m.portoRetirada))];

  function getProdutor(id) {
    return mockUsers.find((u) => u.id === id);
  }

  function calcular(m, quantidade) {
    const valorProduto = m.precoPorUnidade * quantidade;
    const taxa = valorProduto * (mockTaxas.taxaProduto / 100);
    return { valorProduto, taxa, total: valorProduto + taxa };
  }

  function handleAbrirModal(m) {
    setModalItem(m);
    setQtd(1);
    setAutoRetirada(true);
    setPixAberto(false);
  }

  function handleIrParaPix() {
    const { valorProduto, taxa, total } = calcular(modalItem, qtd);
    setPedidoAtual({ mercadoria: modalItem, qtd, valorProduto, taxa, total, autoRetirada });
    setPixAberto(true);
  }

  function handleConfirmarPagamento() {
    const prod = getProdutor(pedidoAtual.mercadoria.produtorId);
    const novaTransacao = {
      id: 't' + Date.now(),
      compradorId: usuario.id,
      produtorId: pedidoAtual.mercadoria.produtorId,
      freteiro: null,
      mercadoriaId: pedidoAtual.mercadoria.id,
      produto: pedidoAtual.mercadoria.produto,
      quantidade: pedidoAtual.qtd,
      valorProduto: pedidoAtual.valorProduto,
      taxaPlataforma: pedidoAtual.taxa,
      valorFrete: 0,
      taxaFrete: 0,
      totalPago: pedidoAtual.total,
      status: 'aguardando_retirada',
      autoRetirada: pedidoAtual.autoRetirada,
      dataCriacao: new Date().toISOString().split('T')[0],
      dataRetirada: null,
      dataEntrega: null,
      avaliacao: null,
    };
    adicionarTransacao(novaTransacao);
    retirarMercadoria(pedidoAtual.mercadoria.id, pedidoAtual.qtd);
    setModalItem(null);
    setPedidoAtual(null);
    setPixAberto(false);
    navigate('/historico');
  }

  return (
    <div className="page-body">
      <div className="page-header">
        <h1><FiShoppingCart /> Catálogo de Mercadorias</h1>
        <p>UC08 — Compre produtos diretamente de produtores da região</p>
      </div>

      {/* Busca/Filtros */}
      <div className="card mb-2">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Buscar produto</label>
            <input className="form-input" placeholder="Ex: Açaí, Farinha..." value={busca} onChange={(e) => setBusca(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Porto de retirada</label>
            <select className="form-select" value={filtroPorto} onChange={(e) => setFiltroPorto(e.target.value)}>
              <option value="">Todos os portos</option>
              {portosUnicos.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>
      </div>

      {filtrados.length === 0 ? (
        <div className="card text-center">
          <p className="text-muted" style={{ padding: '2rem' }}>Nenhuma mercadoria disponível.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {filtrados.map((m) => {
            const produtor = getProdutor(m.produtorId);
            return (
              <div key={m.id} className="card">
                <div className="card-header">
                  <span className="card-title">{m.produto}</span>
                  <StatusBadge status={m.status} />
                </div>
                <div style={{ fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div className="flex-between">
                    <span className="text-muted">Produtor</span>
                    <span className="font-bold">{produtor?.nome}</span>
                  </div>
                  <div className="flex-between">
                    <span className="text-muted">Comunidade</span>
                    <span>{produtor?.comunidade}</span>
                  </div>
                  <div className="flex-between">
                    <span className="text-muted">Disponível</span>
                    <span>{m.quantidade} {m.unidade}</span>
                  </div>
                  <div className="flex-between">
                    <span className="text-muted">Porto de retirada</span>
                    <span>{m.portoRetirada}</span>
                  </div>
                  <div className="flex-between">
                    <span className="text-muted">Válido até</span>
                    <span>{m.validadeAnuncio}</span>
                  </div>
                  <div className="flex-between">
                    <span className="text-muted">Preço/unid.</span>
                    <span className="font-bold" style={{ color: 'var(--verde-floresta)', fontSize: '1.1rem' }}>
                      R$ {m.precoPorUnidade.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
                <button className="btn btn-primary w-full mt-2" onClick={() => handleAbrirModal(m)}>
                  Comprar
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de compra */}
      {modalItem && !pixAberto && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <span className="modal-title"><FiShoppingCart /> Confirmar Compra</span>
              <button className="modal-close" onClick={() => setModalItem(null)}><FiX /></button>
            </div>

            <p style={{ marginBottom: '1rem' }}>
              <strong>{modalItem.produto}</strong> — R$ {modalItem.precoPorUnidade.toFixed(2).replace('.', ',')} / {modalItem.unidade}
            </p>

            <div className="form-group">
              <label className="form-label">Quantidade ({modalItem.unidade}) *</label>
              <input
                type="number"
                className="form-input"
                min={1}
                max={modalItem.quantidade}
                value={qtd}
                onChange={(e) => setQtd(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>
                <input type="checkbox" checked={autoRetirada} onChange={(e) => setAutoRetirada(e.target.checked)} />
                Vou retirar pessoalmente (sem frete terceiro)
              </label>
            </div>

            {(() => {
              const { valorProduto, taxa, total } = calcular(modalItem, qtd);
              return (
                <div style={{ background: 'var(--areia)', borderRadius: 'var(--radius-sm)', padding: '1rem', marginBottom: '1rem' }}>
                  <div className="flex-between"><span>Valor do produto</span><span>R$ {valorProduto.toFixed(2).replace('.', ',')}</span></div>
                  <div className="flex-between"><span className="text-muted" style={{ fontSize: '0.82rem' }}>Taxa da plataforma ({mockTaxas.taxaProduto}%)</span><span className="text-muted" style={{ fontSize: '0.82rem' }}>R$ {taxa.toFixed(2).replace('.', ',')}</span></div>
                  <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #ddd' }} />
                  <div className="flex-between font-bold"><span>Total</span><span style={{ color: 'var(--verde-floresta)', fontSize: '1.1rem' }}>R$ {total.toFixed(2).replace('.', ',')}</span></div>
                </div>
              );
            })()}

            <button className="btn btn-primary w-full" onClick={handleIrParaPix}>
              Ir para Pagamento PIX
            </button>
          </div>
        </div>
      )}

      {pixAberto && pedidoAtual && (
        <PIXModal
          valor={pedidoAtual.total}
          descricao={`${pedidoAtual.qtd} ${pedidoAtual.mercadoria.unidade} de ${pedidoAtual.mercadoria.produto}`}
          onConfirmar={handleConfirmarPagamento}
          onFechar={() => { setPixAberto(false); setModalItem(null); }}
        />
      )}
    </div>
  );
}
