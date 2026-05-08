import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const menuProdutor = [
  { section: 'Início', items: [{ to: '/dashboard', icon: '🏠', label: 'Painel' }] },
  {
    section: 'Produção',
    items: [
      { to: '/producao/registrar', icon: '📋', label: 'Registrar Colheita' },
      { to: '/producao/anunciar', icon: '📦', label: 'Anunciar Mercadoria' },
    ],
  },
  {
    section: 'Logística',
    items: [{ to: '/logistica/rotas', icon: '🚢', label: 'Consultar Fretes' }],
  },
  {
    section: 'Histórico',
    items: [
      { to: '/historico', icon: '📜', label: 'Minhas Transações' },
      { to: '/indicadores', icon: '📊', label: 'Indicadores' },
    ],
  },
];

const menuComprador = [
  { section: 'Início', items: [{ to: '/dashboard', icon: '🏠', label: 'Painel' }] },
  {
    section: 'Mercado',
    items: [{ to: '/catalogo', icon: '🛒', label: 'Catálogo' }],
  },
  {
    section: 'Logística',
    items: [
      { to: '/logistica/nova-rota', icon: '🗺️', label: 'Cadastrar Rota' },
      { to: '/logistica/rotas', icon: '🚢', label: 'Rotas Disponíveis' },
    ],
  },
  {
    section: 'Histórico',
    items: [
      { to: '/historico', icon: '📜', label: 'Minhas Transações' },
      { to: '/indicadores', icon: '📊', label: 'Indicadores' },
    ],
  },
];

const menuAdmin = [
  { section: 'Início', items: [{ to: '/dashboard', icon: '🏠', label: 'Painel' }] },
  {
    section: 'Administração',
    items: [
      { to: '/admin', icon: '⚙️', label: 'Painel Admin' },
      { to: '/historico', icon: '📜', label: 'Transações' },
      { to: '/indicadores', icon: '📊', label: 'Indicadores' },
    ],
  },
];

const menus = { produtor: menuProdutor, comprador: menuComprador, admin: menuAdmin };

export default function Sidebar() {
  const { usuario } = useAuth();
  const menu = menus[usuario?.papel] ?? [];

  return (
    <aside className="sidebar">
      {menu.map((group) => (
        <div key={group.section}>
          <div className="sidebar-section">{group.section}</div>
          {group.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
            >
              <span className="icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>
      ))}
    </aside>
  );
}
