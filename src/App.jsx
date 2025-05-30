import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import UploadCard from './components/UploadCard';
import SummaryCard from './components/SummaryCard';
import CoverReport from './components/CoverReport';
import DetailedReport from './components/DetailedReport';
import ExportPDFButton from './components/ExportPDFButton';

export default function App() {
  const [dadosPlanilha, setDadosPlanilha] = useState([]);
  const [mostrarRelatorio, setMostrarRelatorio] = useState(false);
  const [dadosGrupo, setDadosGrupo] = useState({
    administradora: 'Não informado',
    valorPremio: 0,
    valorComissao: 0,
    produtor: 'Não informado',
    pagamento: 'Não informado',
    contato: 'Não informado',
    email: 'Não informado',
    totalApolices: 0,
    premio: 0,
    repasse: 0
  });

  const relatorioRef = useRef();

  const handleDataParsed = (jsonData) => {
    setDadosPlanilha(jsonData);
    setMostrarRelatorio(false); // O relatório só será exibido após envio

    if (jsonData.length > 0) {
      const primeiro = jsonData[0];
      const valorPremioTotal = jsonData.reduce((acc, cur) => acc + Number(cur['Pr. Líq. Parc.'] || 0), 0);
      const valorRepasseTotal = jsonData.reduce((acc, cur) => acc + Number(cur['Vl. Repasse'] || 0), 0);

      setDadosGrupo({
        administradora: primeiro['Produtor'] || 'Não informado',
        valorPremio: valorPremioTotal,
        valorComissao: valorRepasseTotal,
        produtor: primeiro['Produtor'] || 'Não informado',
        pagamento: primeiro['Dados de Pagamento'] || 'Não informado',
        contato: primeiro['Contato'] || 'Não informado',
        email: primeiro['Email'] || 'Não informado',
        totalApolices: jsonData.length,
        premio: valorPremioTotal,
        repasse: valorRepasseTotal,
      });
    } else {
      setDadosGrupo({
        administradora: 'Não informado',
        valorPremio: 0,
        valorComissao: 0,
        produtor: 'Não informado',
        pagamento: 'Não informado',
        contato: 'Não informado',
        email: 'Não informado',
        totalApolices: 0,
        premio: 0,
        repasse: 0,
      });
    }
  };

  // Função para gerar HTML completo do relatório
  const gerarHTMLRelatorio = (dadosCapa, dadosDetalhes) => {
    const htmlCapa = `
      <div class="page" style="padding: 40px; font-family: Arial;">
        <h1>Relatório de Comissões</h1>
        <p><strong>Produtor:</strong> ${dadosCapa.produtor}</p>
        <p><strong>Pagamento:</strong> ${dadosCapa.pagamento}</p>
        <p><strong>Contato:</strong> ${dadosCapa.contato}</p>
        <p><strong>Email:</strong> ${dadosCapa.email}</p>
        <p><strong>Total de Apólices:</strong> ${dadosCapa.totalApolices}</p>
        <p><strong>Prêmio Total:</strong> R$ ${dadosCapa.premio.toFixed(2)}</p>
        <p><strong>Repasse Total:</strong> R$ ${dadosCapa.repasse.toFixed(2)}</p>
      </div>
    `;

    const htmlTabela = `
      <div class="page" style="padding: 40px; font-family: Arial;">
        <h2>Detalhamento</h2>
        <table border="1" cellspacing="0" cellpadding="5" stylee="width: 100%; border-collapse: collaps;">
          <thead>
            <tr>
              ${Object.keys(dadosDetalhes[0]).map(coluna => `<th>${coluna}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${dadosDetalhes.map(linha => `
              <tr>
                ${Object.values(linha).map(valor => `<td>${valor}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Relatório</title>
      </head>
      <body>
        ${htmlCapa}
        ${htmlTabela}
      </body>
      </html>
    `;
  };

  return (
    <>
      <Navbar />
      <main className="container">
        <UploadCard onDataParsed={handleDataParsed} mostrarRelatorio={() => setMostrarRelatorio(true)} />
        <SummaryCard dadosGrupo={dadosGrupo} />

        {dadosPlanilha.length > 0 && mostrarRelatorio && (
          <>
            <div ref={relatorioRef} className="relatorio-preview">
              <div className="page">
                <CoverReport dadosCapa={dadosGrupo} />
              </div>
              <div className="page">
                <DetailedReport dados={dadosPlanilha} />
              </div>
            </div>
            <ExportPDFButton targetRef={relatorioRef} nomeProdutor={dadosGrupo.produtor} />
          </>
        )}
      </main>
    </>
  );
}
