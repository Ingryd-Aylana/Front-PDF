import React from 'react';

export default function SummaryCard({ dadosGrupo }) {
  const { administradora, valorPremio, valorComissao } = dadosGrupo;
  
// Inicio da chamada a API
  const teste = async (request, response) => {

  };


  // const handlePreview = () => {

  // };

  return (
    <section className="card">
      <div className="subcard">
        <h1>Dados do Grupo</h1>
        <hr />
        <p><strong>Administradora:</strong> {administradora}</p>
        <p><strong>Valor do Prêmio:</strong> R$ {valorPremio.toLocaleString('pt-BR')}</p>
        <p><strong>Valor da Comissão:</strong> R$ {valorComissao.toLocaleString('pt-BR')}</p>
      </div>
      {/* <button onClick={handlePreview}>Visualizar Relatório</button> */}
      {/* <br /><br /> */}
      <button onClick={teste}>Ação</button>
    </section>
  );
}
