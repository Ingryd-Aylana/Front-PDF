import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './ExportPDFButton.css';

export default function ExportPDFButton({ targetRef, nomeProdutor }) {
  const handleExport = async () => {
    const input = targetRef?.current;
    if (!input) {
      console.warn('Elemento de referência não encontrado.');
      return;
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pages = input.querySelectorAll('.page');

    for (let i = 0; i < pages.length; i++) {
      const canvas = await html2canvas(pages[i], {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        windowWidth: 1920,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    }

    const nomeSanitizado = nomeProdutor?.replace(/\s+/g, '_').toLowerCase() || 'comissoes';
    const dataHoje = new Date().toISOString().slice(0, 10); // formato yyyy-mm-dd
    const nomeArquivo = `relatorio-${nomeSanitizado}-${dataHoje}.pdf`;

    pdf.save(nomeArquivo);
  };

  return (
    <div className="export-wrapper">
      <button onClick={handleExport}>
        📄 Exportar Relatório em PDF
      </button>
    </div>
  );
}
