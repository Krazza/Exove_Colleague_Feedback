export interface Answer {
    answer: string;
  }
  
export interface Questionnaire {
    name: string;
    questionnaire: {
      answers: Answer[];
    }[];
  }
  export type RadarChartData = {
    name: string;
    data: {
      section: string;
      value: number;
    }[];
  };
  export interface PDFChartProps {
    data: RadarChartData[];
  }