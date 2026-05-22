import { useApp } from '../../context/AppContext';
import { mockUsers } from '../../data/mockData';

function BarChart({ dados, label, valorLabel }) {
  const max = Math.max(...dados.map((d) => d.valor), 1);
  return (
    <div className="bar-chart">
      {dados.map((d, i) => (
        <div key={i} className="bar-row">
          <span className="bar-label">{d.label}</span>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${(d.valor / max) * 100}%` }} />
          </div>
          <span className="bar-value">{valorLabel ? valorLabel(d.valor) : d.valor}</span>
        </div>
      ))}
    </div>
  );
}

export default function Indicators() {
  const { transacoes, mercadorias, colheitas, rotas } = useApp();

  // Volume por produto (colheitas)
  const volumePorProduto = colheitas.reduce((acc, c) => {
    acc[c.produto] = (acc[c.produto] ?? 0) + c.volume;
    return acc;
  }, {});
  const dadosVolume = Object.entries(volumePorProduto).map(([label, valor]) => ({ label, valor }));

  // Receita por mês (transações entregues)
  const receitaPorMes = transacoes
    .filter((t) => t.status === 'entregue')
    .reduce((acc, t) => {
      const mes = t.dataCriacao.slice(0, 7);
      acc[mes] = (acc[mes] ?? 0) + t.valorProduto;
      return acc;
    }, {});
  const dadosReceita = Object.entries(receitaPorMes).map(([label, valor]) => ({ label, valor }));

  // Rotas mais demandadas
  const rotasDemanda = rotas.map((r) => ({
    label: `${r.origem.replace('Porto ', '')} → ${r.destino.replace('Porto ', '')}`,
    valor: Math.floor(Math.random() * 20) + 5,
  }));

  // Ranking de produtores por volume
  const rankingProdutores = mockUsers
    .filter((u) => u.papel === 'produtor')
    .map((u) => ({
      label: u.nome.split(' ')[0] + ' ' + (u.nome.split(' ')[1] ?? ''),
      valor: colheitas.filter((c) => c.produtorId === u.id).reduce((a, c) => a + c.volume, 0),
    }))
    .sort((a, b) => b.valor - a.valor);

  // Preço médio por produto
  const precoPorProduto = {};
  mercadorias.forEach((m) => {
    if (!precoPorProduto[m.produto]) precoPorProduto[m.produto] = [];
    precoPorProduto[m.produto].push(m.precoPorUnidade);
  });
  const dadosPreco = Object.entries(precoPorProduto).map(([label, valores]) => ({
    label,
    valor: Number((valores.reduce((a, b) => a + b, 0) / valores.length).toFixed(2)),
  }));

  return (
    <div className="page-body">
      <div className="page-header">
        <h1>📊 Indicadores e Painel de Produção</h1>
        <p>UC16 — Dados estratégicos para tomada de decisão</p>
      </div>

      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{mercadorias.filter((m) => m.status === 'disponivel').length}</h3>
            <p>Mercadorias ativas</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{transacoes.filter((t) => t.status === 'entregue').length}</h3>
            <p>Transações concluídas</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚢</div>
          <div className="stat-info">
            <h3>{rotas.filter((r) => r.disponivel).length}</h3>
            <p>Rotas ativas</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>R$ {transacoes.filter((t) => t.status === 'entregue').reduce((a, t) => a + t.valorProduto, 0).toFixed(0)}</h3>
            <p>Volume financeiro</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">🌱 Volume por Produto (kg)</span>
          </div>
          {dadosVolume.length ? <BarChart dados={dadosVolume} valorLabel={(v) => `${v} kg`} /> : <p className="text-muted">Sem dados.</p>}
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">💰 Receita por Mês (R$)</span>
          </div>
          {dadosReceita.length ? <BarChart dados={dadosReceita} valorLabel={(v) => `R$${v.toFixed(0)}`} /> : <p className="text-muted">Sem dados.</p>}
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">🚢 Rotas Mais Demandadas</span>
          </div>
          <BarChart dados={rotasDemanda} valorLabel={(v) => `${v} viagens`} />
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">💲 Preço Médio por Produto (R$/unid.)</span>
          </div>
          {dadosPreco.length ? <BarChart dados={dadosPreco} valorLabel={(v) => `R$${v}`} /> : <p className="text-muted">Sem dados.</p>}
        </div>

        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <div className="card-header">
            <span className="card-title">🏆 Ranking de Produtores por Volume</span>
          </div>
          <BarChart dados={rankingProdutores} valorLabel={(v) => `${v} kg`} />
        </div>
      </div>
    </div>
  );
}
