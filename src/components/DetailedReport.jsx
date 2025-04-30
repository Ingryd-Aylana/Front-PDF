import React from 'react';
import './DetailedReport.css';

export default function DetailedReport({ dados = [] }) {
  if (!dados.length) return null;

  const hoje = new Date().toLocaleDateString('pt-BR');
  const produtorNome = dados[0]?.Produtor || 'Produtor Desconhecido';

  return (
    <section className="detailed-report" id="pagina-detalhada">
      <header className="report-header">
        <img src="/assets/logo.png" alt="Logo" className="report-logo" />
        <div>
          <h3>{produtorNome}</h3>
          <p className="report-date">Gerado em: {hoje}</p>
        </div>
      </header>

      <table className="report-table">
        <thead>
          <tr>
            <th>Apólice</th>
            <th>Cliente</th>
            <th>Prêmio</th>
            <th>Parcela</th>
            <th>Data Pagamento</th>
            <th>Produto</th>
            <th>Início Vigência</th>
            <th>Seguradora</th>
            <th>Ramo</th>
            <th>Repasse</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((item, idx) => (
            <tr key={idx}>
              <td>{item.Apólice || '-'}</td>
              <td>{item.Cliente || '-'}</td>
              <td>R$ {Number(item.Prêmio || 0).toLocaleString('pt-BR')}</td>
              <td>{item.Parcela || '-'}</td>
              <td>{item['Data Pagamento'] || '—'}</td>
              <td>{item.Produto || '-'}</td>
              <td>{item['Início Vigência'] || '-'}</td>
              <td>{item.Seguradora || '-'}</td>
              <td>{item.Ramo || '-'}</td>
              <td>R$ {Number(item.Repasse || 0).toLocaleString('pt-BR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
