import { useState } from 'react';
import { portos } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import RatingStars from '../../components/RatingStars';
import {
  MdDirectionsBoat, MdSearch, MdSend, MdCheckCircle,
} from 'react-icons/md';

export default function SearchFreight() {
  const { rotas } = useApp();
  const [filtros, setFiltros] = useState({ origem: '', destino: '', capacidade: '' });
  const [solicitado, setSolicitado] = useState(null);

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

  function handleAceitarFrete(id) {
    setSolicitado(id);
    setTimeout(() => setSolicitado(null), 3000);
  }

  return (
    <div className="page-body">
      <div className="page-header">
        <h1><MdDirectionsBoat style={{ verticalAlign: 'middle', marginRight: 8 }} />Rotas e Fretes Disponíveis</h1>
        <p>UC07 — Consulte freteiros e rotas, filtre por origem, destino e capacidade</p>
      </div>

      {/* Filtros */}
      <div className="card mb-2">
        <div className="card-header">
          <span className="card-title"><MdSearch style={{ verticalAlign: 'middle', marginRight: 6 }} />Filtrar Rotas</span>
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
            <div key={rota.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="card-header">
                <span className="card-title">
                  {rota.origem} → {rota.destino}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', flex: 1 }}>
                <div className="flex-between">
                  <span className="text-muted">Freteiro</span>
                  <span className="font-bold">{rota.freteiro?.nome ?? '—'}</span>
                </div>
                <div className="flex-between">
                  <span className="text-muted">Tempo estimado</span>
                  <span>{rota.tempoEstimado || '—'}</span>
                </div>
                <div className="flex-between">
                  <span className="text-muted">Frequência</span>
                  <span>{rota.frequencia}</span>
                </div>
                <div className="flex-between">
                  <span className="text-muted">Saídas</span>
                  <span>{rota.diasHorarios || '—'}</span>
                </div>
                {rota.paradas?.length > 0 && (
                  <div className="flex-between">
                    <span className="text-muted">Paradas</span>
                    <span>{rota.paradas.join(', ')}</span>
                  </div>
                )}
                <div className="flex-between">
                  <span className="text-muted">Cap. livre</span>
                  <span className="font-bold text-verde">{rota.capacidadeLivre?.toLocaleString()} kg</span>
                </div>
                <div className="flex-between">
                  <span className="text-muted">Preço do frete</span>
                  <span className="font-bold" style={{ color: 'var(--azul-rio)' }}>
                    R$ {Number(rota.precoFrete).toFixed(2).replace('.', ',')}
                  </span>
                </div>
                {rota.freteiro?.reputacao && (
                  <div className="flex-between">
                    <span className="text-muted">Reputação</span>
                    <RatingStars nota={Math.round(rota.freteiro.reputacao)} />
                  </div>
                )}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
                {solicitado === rota.id ? (
                  <button className="btn btn-sm btn-primary w-full" disabled style={{ background: 'var(--verde-floresta)' }}>
                    <MdCheckCircle style={{ verticalAlign: 'middle', marginRight: 6 }} />Solicitação enviada!
                  </button>
                ) : (
                  <button className="btn btn-sm btn-primary w-full" onClick={() => handleAceitarFrete(rota.id)}>
                    <MdSend style={{ verticalAlign: 'middle', marginRight: 6 }} />Aceitar Frete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
