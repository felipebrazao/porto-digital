import { MdWaves, MdWarningAmber, MdLightbulbOutline, MdBarChart, MdSettings, MdEco, MdMap } from 'react-icons/md';
import { GiFarmer, GiSpeedBoat } from 'react-icons/gi';
import { FiShoppingCart } from 'react-icons/fi';

export default function Home() {
  return (
    <div style={{ flex: 1, backgroundColor: 'var(--areia)' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(160deg, #0d3b6e 0%, var(--verde-floresta) 100%)',
        color: 'var(--branco)',
        padding: '5rem 2rem 4rem',
        textAlign: 'center',
      }}>
        <img src="/logo.png" alt="Porto Digital Amazônico" style={{ height: '140px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }} />
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.2 }}>
          Porto Digital Amazônico
        </h1>
        <p style={{ fontSize: '1.5rem', maxWidth: '720px', margin: '0 auto', opacity: 0.92, lineHeight: 1.8 }}>
          Conectando rios, pessoas e oportunidades através da tecnologia.
        </p>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '3rem 2rem' }}>

        <Section
          icon={<MdWaves />}
          titulo="Vila de Moju e o Rio Camimbo"
          texto="A Vila de Moju está localizada em uma das regiões mais biodiversas do planeta. Para as comunidades ribeirinhas, o rio funciona como estrada, mercado e fonte de sustento. Atualmente, o comércio fluvial movimenta alimentos, artesanato e insumos diariamente — porém toda a dinâmica ocorre de maneira informal, sem registros digitais, rastreabilidade ou acesso estruturado à tecnologia."
        />

        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ fontSize: '2rem', flexShrink: 0, color: 'var(--vermelho-alerta)' }}><MdWarningAmber /></div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--verde-floresta)', paddingTop: '0.3rem' }}>O Problema</h2>
          </div>
          <p style={{ lineHeight: 1.75, color: 'var(--cinza-texto)', marginBottom: '1rem', paddingLeft: '3.25rem' }}>
            A região movimenta aproximadamente <strong>R$ 2 a 3 milhões por mês</strong> em comércio fluvial, mas:
          </p>
          <ul style={{ paddingLeft: '3.25rem', lineHeight: 2, color: 'var(--cinza-texto)' }}>
            <li>Cerca de 95% das transações são informais</li>
            <li>Não existe rastreabilidade das cargas</li>
            <li>As negociações dependem de comunicação oral e grupos informais</li>
            <li>Não há integração entre produtores, compradores e freteiros</li>
          </ul>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.25rem', paddingLeft: '3.25rem' }}>
            {['Fretes desperdiçados', 'Preços opacos', 'Oferta e demanda desconectadas', 'Vulnerabilidade econômica'].map(item => (
              <span key={item} style={{
                background: '#fdecea', color: 'var(--vermelho-alerta)',
                padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600
              }}>{item}</span>
            ))}
          </div>
        </div>

        <Section
          icon={<MdLightbulbOutline />}
          titulo="A Solução"
          texto="O Porto Digital Amazônico propõe a instalação de totens digitais em portos estratégicos, permitindo acesso à plataforma sem necessidade de smartphone ou internet residencial. Uma plataforma offline-first, de baixo custo, desenvolvida especificamente para o contexto ribeirinho — com rastreabilidade digital e integração real entre todos os atores do comércio fluvial."
        />

        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '2rem', flexShrink: 0, color: 'var(--azul-rio)' }}><MdBarChart /></div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--verde-floresta)', paddingTop: '0.3rem' }}>Por que não as soluções existentes?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', paddingLeft: '3.25rem' }}>
            {[
              { nome: 'WhatsApp', pro: 'Fácil acesso', contra: 'Sem rastreabilidade' },
              { nome: 'Marketplaces', pro: 'Amplo alcance', contra: 'Requer internet e letramento digital' },
              { nome: 'Gov. Digital', pro: 'Oficial', contra: 'Alta burocracia e custo' },
              { nome: 'Porto Digital', pro: 'Offline-first, baixo custo', contra: '—', destaque: true },
            ].map(c => (
              <div key={c.nome} style={{
                background: c.destaque ? 'var(--verde-suave)' : 'var(--branco)',
                border: c.destaque ? '2px solid var(--verde-floresta)' : '1px solid #e0e0e0',
                borderRadius: 'var(--radius)',
                padding: '1rem',
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: c.destaque ? 'var(--verde-floresta)' : 'var(--cinza-texto)', marginBottom: '0.5rem' }}>{c.nome}</div>
                <div style={{ fontSize: '0.82rem', color: '#2e7d52', marginBottom: '0.3rem' }}>✓ {c.pro}</div>
                {c.contra !== '—' && <div style={{ fontSize: '0.82rem', color: '#c0392b' }}>✗ {c.contra}</div>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ fontSize: '2rem', flexShrink: 0, color: 'var(--verde-floresta)' }}><MdSettings /></div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--verde-floresta)', paddingTop: '0.3rem' }}>Funcionalidades da Plataforma</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', paddingLeft: '3.25rem' }}>
            {['Cadastro de produtos', 'Cadastro de freteiros', 'Registro de rotas fluviais', 'Rastreamento de cargas', 'Histórico de transações', 'Consulta de fretes e preços'].map(f => (
              <span key={f} style={{
                background: 'var(--azul-suave)', color: 'var(--azul-rio)',
                padding: '5px 14px', borderRadius: '20px', fontSize: '0.87rem', fontWeight: 600
              }}>{f}</span>
            ))}
          </div>
        </div>

        <Section
          icon={<MdEco />}
          titulo="Impacto Esperado"
          texto="Redução da informalidade, digitalização do comércio ribeirinho, logística mais eficiente e preços mais justos. O projeto está alinhado com os ODS 8 (Trabalho decente), ODS 9 (Inovação), ODS 10 (Redução das desigualdades) e ODS 12 (Consumo responsável)."
        />

        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '2rem', flexShrink: 0, color: 'var(--verde-floresta)' }}><MdMap /></div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--verde-floresta)', paddingTop: '0.3rem' }}>Próximos Passos</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', paddingLeft: '3.25rem' }}>
            {[
              { fase: 'Fase 1', periodo: 'Meses 1–3', titulo: 'Validação', itens: ['Instalação de 2 totens piloto', 'Testes com a comunidade', 'Coleta de feedback'] },
              { fase: 'Fase 2', periodo: 'Meses 4–9', titulo: 'Expansão', itens: ['5 a 10 novos portos', 'Treinamento de usuários', 'Parcerias com cooperativas'] },
              { fase: 'Fase 3', periodo: '10+ meses', titulo: 'Escala', itens: ['Outras regiões amazônicas', 'Integração com políticas públicas', 'Novas funcionalidades'] },
            ].map(f => (
              <div key={f.fase} style={{ background: 'var(--branco)', borderRadius: 'var(--radius)', padding: '1.25rem', boxShadow: 'var(--sombra)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--azul-rio)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{f.fase} · {f.periodo}</div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--cinza-texto)', marginBottom: '0.75rem' }}>{f.titulo}</div>
                <ul style={{ paddingLeft: '1.1rem', lineHeight: 1.9, color: '#555', fontSize: '0.88rem' }}>
                  {f.itens.map(i => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div style={{ textAlign: 'center', padding: '0 2rem 1.5rem', color: 'var(--verde-floresta)', fontWeight: 700, fontSize: '1.1rem' }}>
        Como você quer entrar?
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', padding: '0 2rem 4rem' }}>
        <EntradaBox icon={<GiFarmer />} titulo="Sou Produtor" descricao="Cadastre colheitas, anuncie mercadorias e receba pagamentos de forma segura." cor="var(--verde-floresta)" />
        <EntradaBox icon={<GiSpeedBoat />} titulo="Sou Fretista" descricao="Registre suas rotas fluviais e ofereça transporte para cargas de todo o Amazonas." cor="var(--azul-rio)" />
        <EntradaBox icon={<FiShoppingCart />} titulo="Sou Comprador" descricao="Acesse o catálogo de produtos direto da floresta e compre com rastreabilidade." cor="var(--terra)" />
      </div>

      {/* Rodapé de créditos */}
      <div style={{ textAlign: 'center', padding: '2rem 2rem 3rem', borderTop: '1px solid #e5e0d8' }}>
        <p style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '0.6rem' }}>Líder do projeto · Augusto Pereira Rodrigues</p>
        <p style={{ fontSize: '0.78rem', color: '#bbb', maxWidth: '680px', margin: '0 auto', lineHeight: 1.9 }}>
          Andrey de Matos Gonçalves · Everton Gustavo de Oliveira da Silva · Felipe Vieira Brazão e Silva ·
          Gabriel Leite Serruya de Saboya · Igor Cecim Vilhena · João Vitor Rath ·
          Pedro Paulo de Magalhães Bezerra Filho · Yuri Monteiro Alencar Aguiar
        </p>
      </div>

    </div>
  );
}

function Section({ icon, titulo, texto }) {
  return (
    <div style={{ marginBottom: '2.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
      <div style={{ fontSize: '2rem', flexShrink: 0, marginTop: '0.15rem', color: 'var(--verde-floresta)', display: 'flex', alignItems: 'center' }}>{icon}</div>
      <div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--verde-floresta)', marginBottom: '0.5rem' }}>{titulo}</h2>
        <p style={{ lineHeight: 1.75, color: 'var(--cinza-texto)', fontSize: '1rem' }}>{texto}</p>
      </div>
    </div>
  );
}

function EntradaBox({ icon, titulo, descricao, cor }) {
  return (
    <div
      style={{ background: 'var(--branco)', borderRadius: 'var(--radius)', boxShadow: 'var(--sombra)', padding: '2rem 1.75rem', width: '260px', textAlign: 'center', borderTop: `4px solid ${cor}`, cursor: 'default', transition: 'transform 0.15s, box-shadow 0.15s' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--sombra)'; }}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{icon}</div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: cor, marginBottom: '0.6rem' }}>{titulo}</h3>
      <p style={{ fontSize: '0.92rem', color: '#555', lineHeight: 1.65 }}>{descricao}</p>
    </div>
  );
}
