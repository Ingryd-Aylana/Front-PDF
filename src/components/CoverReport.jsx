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
      <div className="cover-top">
      <img
        src="https://i.postimg.cc/3wCW7h3v/img-capa-9.jpg"
        alt="Fundo do Relatório"
        className="background-image"
      />

        {/* LOGO no topo da imagem */}
       <img
          src="https://i.postimg.cc/dtb0y31C/logo2.png"
          alt="Logo"
          className="overlay-logo"
        />

        {/* Título sobre a imagem */}
        <div className="title-container">
          <h1>RELATÓRIO DE MILHAGEM</h1>
          <hr />
        </div>
      </div>

      {/* Parte inferior cinza */}
      <div className="cover-bottom">
        <div className="glass-card wide">
          <h3>Produtor</h3>
          <hr />
          <p><strong>Nome:</strong> {produtor}</p>
          <p><strong>Dados de Pagamento:</strong> {pagamento}</p>
          <p><strong>Contato:</strong> {contato}</p>
          <p><strong>E-mail:</strong> {email}</p>
        </div>

        <div className="glass-card wide">
          <h3>Resumo de Vendas</h3>
          <hr />
          <p><strong>Apólices:</strong> {totalApolices}</p>
          <p><strong>Total Vendido:</strong> R$ {Number(premio).toLocaleString('pt-BR')}</p>
          <p><strong>Total:</strong> R$ {Number(repasse).toLocaleString('pt-BR')}</p>
        </div>
        <div className='text'>
          <p className="report-date">Gerado em: {hoje}</p>
          <p>
            ESTRATÉGIA E EXCELÊNCIA NA EXECUÇÃO GERAM CRESCIMENTO E VALOR.
          </p>
        </div>
      </div>
    </section>
  );
}
