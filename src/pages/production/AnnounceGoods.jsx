import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { mockColheitas, portos, produtos } from '../../data/mockData';

export default function AnnounceGoods() {
  const { usuario } = useAuth();
  const { adicionarMercadoria } = useApp();
  const navigate = useNavigate();

  const colheitasProdutor = mockColheitas.filter((c) => c.produtorId === usuario?.id);
  const [form, setForm] = useState({
    produto: '', quantidade: '', pesoEstimado: '', unidade: 'kg',
    precoPorUnidade: '', portoRetirada: '', validadeAnuncio: '', colheitaId: '',
  });
  const [sucesso, setSucesso] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nova = {
      id: 'm' + Date.now(),
      produtorId: usuario.id,
      colheitaId: form.colheitaId || null,
      produto: form.produto,
      quantidade: Number(form.quantidade),
      pesoEstimado: Number(form.pesoEstimado),
      unidade: form.unidade,
      precoPorUnidade: Number(form.precoPorUnidade),
      portoRetirada: form.portoRetirada,
      validadeAnuncio: form.validadeAnuncio,
      status: 'disponivel',
    };
    adicionarMercadoria(nova);
    setSucesso(true);
    setTimeout(() => navigate('/catalogo'), 2000);
  }

  if (sucesso) {
    return (
      <div className="page-body">
        <div className="card text-center" style={{ maxWidth: 400, margin: '3rem auto' }}>
          <div style={{ fontSize: '3rem' }}>📦</div>
          <h2 className="text-verde mt-2">Mercadoria publicada!</h2>
          <p className="text-muted mt-1">Seu produto já está visível no catálogo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-body">
      <div className="page-header">
        <h1>📦 Anunciar Mercadoria</h1>
        <p>UC05 — Publique produtos disponíveis para venda no catálogo da plataforma</p>
      </div>

      <div className="card" style={{ maxWidth: 600 }}>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Produto *</label>
              <select name="produto" className="form-select" value={form.produto} onChange={handleChange} required>
                <option value="">Selecione...</option>
                {produtos.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Vincular colheita</label>
              <select name="colheitaId" className="form-select" value={form.colheitaId} onChange={handleChange}>
                <option value="">Sem vínculo</option>
                {colheitasProdutor.map((c) => (
                  <option key={c.id} value={c.id}>{c.produto} — {c.dataColheita}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Quantidade disponível *</label>
              <input name="quantidade" type="number" className="form-input" value={form.quantidade} onChange={handleChange} required min="1" />
            </div>
            <div className="form-group">
              <label className="form-label">Peso estimado (total) *</label>
              <input name="pesoEstimado" type="number" className="form-input" value={form.pesoEstimado} onChange={handleChange} required min="0.1" step="0.1" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Unidade *</label>
              <select name="unidade" className="form-select" value={form.unidade} onChange={handleChange}>
                <option value="kg">kg</option>
                <option value="caixa">caixa</option>
                <option value="saca">saca</option>
                <option value="unidade">unidade</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Preço por unidade/kg (R$) *</label>
              <input name="precoPorUnidade" type="number" className="form-input" value={form.precoPorUnidade} onChange={handleChange} required min="0.01" step="0.01" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Porto de retirada *</label>
              <select name="portoRetirada" className="form-select" value={form.portoRetirada} onChange={handleChange} required>
                <option value="">Selecione...</option>
                {portos.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Validade do anúncio *</label>
              <input name="validadeAnuncio" type="date" className="form-input" value={form.validadeAnuncio} onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-2">
            Publicar no Catálogo
          </button>
        </form>
      </div>
    </div>
  );
}
