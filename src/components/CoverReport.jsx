import React from 'react';
import './CoverReport.css';

export default function CoverReport({ dadosCapa }) {
  const hoje = new Date().toLocaleDateString('pt-BR');
  const {
    produtor = 'Não informado',
    pagamento = 'Não informado',
    contato = 'Não informado',
    email = 'Não informado',
    totalApolices = 0,
    premio = 0,
    repasse = 0
  } = dadosCapa;

  return (
    <section className="cover">
      <img src="/assets/foto-produto.png" alt="Fundo do Relatório" className="background-image" />

      <div className="overlay-content">
        <img src="/assets/logo2.png" alt="Logo" className="overlay-logo" />
        <h1 className="overlay-title">Relatório de Comissões</h1>
      </div>

      <div className="cards-wrapper">
        <div className="glass-card">
          <h3>Produtor</h3>
          <p><strong>Nome:</strong> {produtor}</p>
          <p><strong>Dados de Pagamento:</strong> {pagamento}</p>
          <p><strong>Contato:</strong> {contato}</p>
          <p><strong>E-mail:</strong> {email}</p>
        </div>

        <div className="glass-card">
          <h3>Resumo de Vendas</h3>
          <p><strong>Total de Apólices:</strong> {totalApolices}</p>
          <p><strong>Valor Total Vendido:</strong> R$ {Number(premio).toLocaleString('pt-BR')}</p>
          <p><strong>Valor Total Repasse:</strong> R$ {Number(repasse).toLocaleString('pt-BR')}</p>
        </div>
      </div>

      <p className="report-date">Gerado em: {hoje}</p>
    </section>
  );
}
