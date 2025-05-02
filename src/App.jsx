import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import UploadCard from './components/UploadCard';
import SummaryCard from './components/SummaryCard';
import CoverReport from './components/CoverReport';
import DetailedReport from './components/DetailedReport';
import ExportPDFButton from './components/ExportPDFButton';

export default function App() {
  const [dadosPlanilha, setDadosPlanilha] = useState([]);
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

    if (jsonData.length > 0) {
      const primeiro = jsonData[0];

      setDadosGrupo({
        // Para SummaryCard
        administradora: primeiro['Administradora'] || 'Não informado',
        valorPremio: jsonData.reduce((acc, cur) => acc + Number(cur['Prêmio'] || 0), 0),
        valorComissao: jsonData.reduce((acc, cur) => acc + Number(cur['Repasse'] || 0), 0),

        // Para CoverReport
        produtor: primeiro['Nome do Produtor'] || 'Não informado',
        pagamento: primeiro['Dados de Pagamento'] || 'Não informado',
        contato: primeiro['Contato'] || 'Não informado',
        email: primeiro['Email'] || 'Não informado',
        totalApolices: jsonData.length,
        premio: jsonData.reduce((acc, cur) => acc + Number(cur['Prêmio'] || 0), 0),
        repasse: jsonData.reduce((acc, cur) => acc + Number(cur['Repasse'] || 0), 0),
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

  return (
    <>
      <Navbar />
      <main className="container">
        <UploadCard onDataParsed={handleDataParsed} />
        <SummaryCard dadosGrupo={dadosGrupo} />

        {dadosPlanilha.length > 0 && (
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
