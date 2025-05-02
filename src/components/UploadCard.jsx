import React, { useState } from 'react';
import * as XLSX from 'xlsx';

export default function UploadCard({ onDataParsed }) {
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [dados, setDados] = useState([]); // Estado local para envio futuro

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setError('Nenhum arquivo selecionado.');
      return;
    }

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setError('Formato inválido. Por favor, envie um arquivo .xlsx ou .xls.');
      return;
    }

    setFileName(file.name);
    setError('');

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        if (jsonData.length === 0) {
          setError('A planilha está vazia.');
          return;
        }

        setDados(jsonData);           // Armazenando localmente
        onDataParsed(jsonData);       // Envia para o App
      } catch (err) {
        setError('Erro ao processar o arquivo. Verifique o conteúdo e tente novamente.');
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSendSpreadsheet = async () => {
    if (dados.length === 0) return;

    try {
      const response = await fetch('http://localhost:3000/relatorio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });

      const resultado = await response.json();
      console.log('✅ Planilha enviada com sucesso:', resultado.mensagem);
    } catch (erro) {
      console.error('❌ Erro ao enviar planilha:', erro);
    }
  };

  // ⬇️ JSX principal do componente (corrigido para estar fora da função acima)
  return (
    <section className="card">
      <h2>📄 Importar Arquivo Excel</h2>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="file-input"
      />

      {fileName && (
        <p style={{ marginTop: '10px' }}>
          📁 Arquivo selecionado: <strong>{fileName}</strong>
        </p>
      )}

      {error && (
        <p style={{ color: 'red', marginTop: '10px' }}>
          ⚠️ {error}
        </p>
      )}

      <br /><br />
      <button
        className="btn btn-primary"
        style={{ marginTop: '10px' }}
        onClick={handleSendSpreadsheet}
        disabled={dados.length === 0}
      >
        📤 Enviar Planilha
      </button>
    </section>
  );
}

