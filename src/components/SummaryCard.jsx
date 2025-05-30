import React from 'react';

export default function SummaryCard({ dadosGrupo }) {

  const {
    administradora = 'Não informado',
    valorPremio = 0,
    valorComissao = 0,
  } = dadosGrupo || {};

  return (
    <section className="card">
      <div className="subcard">
        <h1>Dados do Grupo</h1>
        <hr />
        <p><strong>Produtor:</strong> {administradora}</p>
        <p><strong>Valor do Prêmio:</strong> R$ {Number(valorPremio).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        <p><strong>Valor da Comissão:</strong> R$ {Number(valorComissao).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
      </div>
    </section>
  );
}
