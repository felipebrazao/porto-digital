import { useState } from 'react';
import { mockRotas, portos } from '../../data/mockData';
import RatingStars from '../../components/RatingStars';
import StatusBadge from '../../components/StatusBadge';

export default function SearchFreight() {
  const [filtros, setFiltros] = useState({ origem: '', destino: '', capacidade: '' });
  const [rotas, setRotas] = useState(mockRotas);

  function handleFiltro(e) {
    const { name, value } = e.target;
    setFiltros((f) => ({ ...f, [name]: value }));
  }

  const rotasFiltradas = rotas.filter((r) => {
    if (filtros.origem && r.origem !== filtros.origem) return false;
    if (filtros.destino && r.destino !== filtros.destino) return false;
    if (filtros.capacidade && r.capacidadeLivre < Number(filtros.capacidade)) return false;
    return true;
  });

  function toggleDisponibilidade(id) {
    setRotas((prev) =>
      prev.map((r) => (r.id === id ? { ...r, disponivel: !r.disponivel } : r))
    );
  }

  return (
    <div className="page-body">
      <div className="page-header">
        <h1>🚢 Rotas e Fretes Disponíveis</h1>
        <p>UC07 — Consulte freteiros e rotas, filtre por origem, destino e capacidade</p>
      </div>

      {/* Filtros */}
      <div className="card mb-2">
        <div className="card-header">
          <span className="card-title">🔍 Filtrar Rotas</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Origem</label>
            <select name="origem" className="form-select" value={filtros.origem} onChange={handleFiltro}>
              <option value="">Todos</option>
              {portos.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Destino</label>
            <select name="destino" className="form-select" value={filtros.destino} onChange={handleFiltro}>
              <option value="">Todos</option>
              {portos.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Capacidade mínima (kg)</label>
            <input name="capacidade" type="number" className="form-input" value={filtros.capacidade} onChange={handleFiltro} placeholder="Ex: 1000" />
          </div>
        </div>
      </div>

      {/* Resultados */}
      {rotasFiltradas.length === 0 ? (
        <div className="card text-center">
          <p className="text-muted" style={{ padding: '2rem' }}>Nenhuma rota encontrada para os filtros selecionados.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {rotasFiltradas.map((rota) => (
            <div key={rota.id} className="card" style={{ opacity: rota.disponivel ? 1 : 0.6 }}>
              <div className="card-header">
                <span className="card-title">
                  {rota.origem} → {rota.destino}
                </span>
                <StatusBadge status={rota.disponivel ? 'disponivel' : 'esgotado'} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem' }}>
                <div className="flex-between">
                  <span className="text-muted">Freteiro</span>
                  <span className="font-bold">{rota.freteiro.nome}</span>
                </div>
                <div className="flex-between">
                  <span className="text-muted">Embarcação</span>
                  <span>{rota.freteiro.embarcacao?.nome}</span>
                </div>
                <div className="flex-between">
                  <span className="text-muted">Tempo estimado</span>
                  <span>{rota.tempoEstimado}</span>
                </div>
                <div className="flex-between">
                  <span className="text-muted">Frequência</span>
                  <span>{rota.frequencia}</span>
                </div>
                <div className="flex-between">
                  <span className="text-muted">Saídas</span>
                  <span>{rota.diasHorarios}</span>
                </div>
                {rota.paradas.length > 0 && (
                  <div className="flex-between">
                    <span className="text-muted">Paradas</span>
                    <span>{rota.paradas.join(', ')}</span>
                  </div>
                )}
                <div className="flex-between">
                  <span className="text-muted">Cap. livre</span>
                  <span className="font-bold text-verde">{rota.capacidadeLivre.toLocaleString()} kg</span>
                </div>
                <div className="flex-between">
                  <span className="text-muted">Preço do frete</span>
                  <span className="font-bold" style={{ color: 'var(--azul-rio)' }}>
                    R$ {rota.precoFrete.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex-between">
                  <span className="text-muted">Reputação</span>
                  <RatingStars nota={Math.round(rota.freteiro.reputacao)} />
                </div>
              </div>

              <div className="mt-2 flex gap-1">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => toggleDisponibilidade(rota.id)}
                >
                  {rota.disponivel ? '⏸ Indisponível' : '▶ Disponível'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
