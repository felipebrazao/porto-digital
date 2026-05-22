import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import RatingStars from '../../components/RatingStars';
import StatusBadge from '../../components/StatusBadge';
import {
  MdAssignment, MdInventory, MdCheckCircle, MdStar, MdBolt,
  MdNotifications, MdHistory, MdShoppingCart, MdDirectionsBoat,
  MdHourglassEmpty, MdMap, MdAdminPanelSettings, MdBarChart,
} from 'react-icons/md';

const iconStyle = { verticalAlign: 'middle', marginRight: '6px' };

export default function Dashboard() {
  const { usuario } = useAuth();
  const { transacoes, mercadorias, colheitas, rotas } = useApp();
  const navigate = useNavigate();

  const minhasTransacoes = transacoes.filter(
    (t) => t.compradorId === usuario?.id || t.produtorId === usuario?.id
  );

  const pendentes = minhasTransacoes.filter((t) =>
    ['aguardando_retirada', 'em_transito'].includes(t.status)
  );

  const notasRecebidas = usuario?.papel === 'produtor'
    ? minhasTransacoes
        .filter((t) => t.produtorId === usuario.id && t.avaliacao?.compradorAoProdutor)
        .map((t) => t.avaliacao.compradorAoProdutor.nota)
    : minhasTransacoes
        .filter((t) => t.compradorId === usuario.id && t.avaliacao?.produtorAoComprador)
        .map((t) => t.avaliacao.produtorAoComprador.nota);

  const reputacaoMedia = notasRecebidas.length > 0
    ? (notasRecebidas.reduce((a, b) => a + b, 0) / notasRecebidas.length).toFixed(1)
    : '—';
  const totalAvaliacoes = notasRecebidas.length;

  return (
    <div className="page-body">
      <div className="page-header">
        <h1>Olá, {usuario?.nome.split(' ')[0]}!</h1>
        <p>Bem-vindo ao Porto Digital Amazônico</p>
      </div>

      {/* Stats */}
      {usuario?.papel === 'produtor' && (
        <>
          <div className="stat-cards">
            <div className="stat-card">
              <div className="stat-icon"><MdAssignment /></div>
              <div className="stat-info">
                <h3>{colheitas.filter((c) => c.produtorId === usuario.id).length}</h3>
                <p>Colheitas registradas</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><MdInventory /></div>
              <div className="stat-info">
                <h3>{mercadorias.filter((m) => m.produtorId === usuario.id && m.status === 'disponivel').length}</h3>
                <p>Anúncios ativos</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><MdCheckCircle /></div>
              <div className="stat-info">
                <h3>{minhasTransacoes.filter((t) => t.status === 'entregue').length}</h3>
                <p>Vendas concluídas</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><MdStar /></div>
              <div className="stat-info">
                <h3>{reputacaoMedia}</h3>
                <p>Reputação ({totalAvaliacoes} avaliações)</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="card">
              <div className="card-header">
                <span className="card-title"><MdBolt style={iconStyle} />Ações Rápidas</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button className="btn btn-primary w-full" onClick={() => navigate('/producao/registrar')}>
                  <MdAssignment style={iconStyle} />Registrar Colheita
                </button>
                <button className="btn btn-outline w-full" onClick={() => navigate('/producao/anunciar')}>
                  <MdInventory style={iconStyle} />Anunciar Mercadoria
                </button>
                <button className="btn btn-outline w-full" onClick={() => navigate('/historico')}>
                  <MdHistory style={iconStyle} />Ver Histórico
                </button>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <span className="card-title"><MdNotifications style={iconStyle} />Transações Pendentes</span>
              </div>
              {pendentes.length === 0 ? (
                <p className="text-muted">Nenhuma transação pendente.</p>
              ) : (
                pendentes.slice(0, 3).map((t) => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f0f0f0' }}>
                    <span style={{ fontSize: '0.88rem' }}>{t.produto} ({t.quantidade})</span>
                    <StatusBadge status={t.status} />
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {usuario?.papel === 'comprador' && (
        <>
          <div className="stat-cards">
            <div className="stat-card">
              <div className="stat-icon"><MdShoppingCart /></div>
              <div className="stat-info">
                <h3>{minhasTransacoes.length}</h3>
                <p>Total de compras</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><MdDirectionsBoat /></div>
              <div className="stat-info">
                <h3>{rotas.filter((r) => r.freteiro.id === usuario.id).length}</h3>
                <p>Rotas cadastradas</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><MdHourglassEmpty /></div>
              <div className="stat-info">
                <h3>{pendentes.length}</h3>
                <p>Em andamento</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><MdStar /></div>
              <div className="stat-info">
                <h3>{reputacaoMedia}</h3>
                <p>Reputação ({totalAvaliacoes} avaliações)</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="card">
              <div className="card-header">
                <span className="card-title"><MdBolt style={iconStyle} />Ações Rápidas</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button className="btn btn-primary w-full" onClick={() => navigate('/catalogo')}>
                  <MdShoppingCart style={iconStyle} />Ver Catálogo
                </button>
                <button className="btn btn-outline w-full" onClick={() => navigate('/logistica/rotas')}>
                  <MdDirectionsBoat style={iconStyle} />Consultar Fretes
                </button>
                <button className="btn btn-outline w-full" onClick={() => navigate('/logistica/nova-rota')}>
                  <MdMap style={iconStyle} />Cadastrar Rota
                </button>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <span className="card-title"><MdNotifications style={iconStyle} />Transações Pendentes</span>
              </div>
              {pendentes.length === 0 ? (
                <p className="text-muted">Nenhuma transação pendente.</p>
              ) : (
                pendentes.slice(0, 3).map((t) => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f0f0f0' }}>
                    <span style={{ fontSize: '0.88rem' }}>{t.produto}</span>
                    <div className="flex gap-1">
                      <StatusBadge status={t.status} />
                      <button className="btn btn-sm btn-outline" onClick={() => navigate(`/transacoes/${t.id}/rastrear`)}>
                        Rastrear
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {usuario?.papel === 'admin' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="card">
            <div className="card-header">
              <span className="card-title"><MdBolt style={iconStyle} />Ações Rápidas</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button className="btn btn-primary w-full" onClick={() => navigate('/admin')}>
                <MdAdminPanelSettings style={iconStyle} />Painel Admin
              </button>
              <button className="btn btn-outline w-full" onClick={() => navigate('/indicadores')}>
                <MdBarChart style={iconStyle} />Indicadores
              </button>
              <button className="btn btn-outline w-full" onClick={() => navigate('/historico')}>
                <MdHistory style={iconStyle} />Transações
              </button>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <span className="card-title"><MdBarChart style={iconStyle} />Resumo da Plataforma</span>
            </div>
            <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div className="flex-between"><span className="text-muted">Total de transações</span><span className="font-bold">{transacoes.length}</span></div>
              <div className="flex-between"><span className="text-muted">Mercadorias ativas</span><span className="font-bold">{mercadorias.filter((m) => m.status === 'disponivel').length}</span></div>
              <div className="flex-between"><span className="text-muted">Rotas ativas</span><span className="font-bold">{rotas.filter((r) => r.disponivel).length}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
