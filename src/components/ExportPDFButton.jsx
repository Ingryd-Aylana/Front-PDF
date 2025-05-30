import React, { useState } from 'react';

import './ExportPDFButton.css';

export default function ExportPDFButton({ targetRef, nomeProdutor }) {
  const [gerando, setGerando] = useState(false);

  const gerarHTMLRelatorio = () => {
    const relatorioNode = targetRef?.current;
    if (!relatorioNode) return '';

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Relatório de Comissões</title>
        </head>
        <body>
          ${relatorioNode.innerHTML}
        </body>
      </html>
    `;
  };

  const handleExport = async () => {
    setGerando(true);
    const input = targetRef?.current;
    if (!input) {
      console.warn('Elemento de referência não encontrado.');
      setGerando(false);
      return;
    }

    // 🔄 Envio do HTML para o backend
    const htmlRelatorio = gerarHTMLRelatorio();
    try {
      const response = await fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomeProdutor: nomeProdutor || 'produtor_desconhecido',
          html: htmlRelatorio,
        }),
      });

    } catch (error) {
      console.error('❌ Erro ao enviar HTML:', error);
    }

  
    setGerando(false);
  };

  return (
    <div className="export-wrapper">
      <button onClick={handleExport} disabled={gerando}>
        {gerando ? '⏳ Gerando Relatório...' : '📄 Exportar Relatório em PDF'}
      </button>
    </div>
  );
}

  // 🧾 Geração do PDF local
  // const pdf = new jsPDF('p', 'mm', 'a4');
  // const pages = input.querySelectorAll('.page');

  // for (let i = 0; i < pages.length; i++) {
  //   const canvas = await html2canvas(pages[i], {
  //     scale: 3,
  //     useCORS: true,
  //     backgroundColor: '#ffffff',
  //     windowWidth: 1920,
  //   });

  //   const imgData = canvas.toDataURL('image/png');
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  //   if (i > 0) pdf.addPage();
  //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  // }

  // const nomeSanitizado = nomeProdutor?.replace(/\s+/g, '_').toLowerCase() || 'comissoes';
  // const dataHoje = new Date().toISOString().slice(0, 10);
  // const nomeArquivo = `relatorio-${nomeSanitizado}-${dataHoje}.pdf`;

  // pdf.save(nomeArquivo);