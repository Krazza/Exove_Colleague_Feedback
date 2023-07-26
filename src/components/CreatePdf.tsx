import React from 'react';
import { PDFViewer, Document, Page, View, Text } from '@react-pdf/renderer';
import CreateChart from './CreateChart';
import { PDFChartProps } from '../modules/chart';


const CreatePDF: React.FC<PDFChartProps> = ({ data }) => {
  return (
    <PDFViewer width="100%" height="500px">
      <Document>
        <Page size="A4">
          <View>
            <Text>My Radar Chart</Text>
            <CreateChart data={data} />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default CreatePDF;

