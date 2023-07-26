import React from 'react';
import { saveAs } from 'file-saver';
import { renderToBuffer } from '@react-pdf/renderer';
import CreatePdf from './CreatePdf';
import { PDFChartProps } from '../modules/chart'; 

const PDFChart: React.FC<PDFChartProps> = ({ data }) => {
    const handleDownloadPDF = async () => {
      try {
        const pdfString = await renderToBuffer(<CreatePdf data={data} />);
        const pdfBlob = new Blob([pdfString], { type: 'application/pdf' });
        saveAs(pdfBlob, 'chart.pdf');
      } catch (error) {
        console.log('Error generating PDF:', error);
      }
    };
  
    return (
      <div>
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <CreatePdf data={data} />
      </div>
    );
  };

export default PDFChart;
