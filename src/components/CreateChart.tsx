import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis,PolarRadiusAxis, Radar, ResponsiveContainer , Legend} from 'recharts';
import { RadarChartData } from '../modules/chart';

const CreateChart: React.FC<{ data: RadarChartData[] }> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart outerRadius={150} data={data}>
        <PolarGrid />
        <PolarGrid gridType='circle'/>
        <PolarAngleAxis dataKey="data" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar name="Colleague" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Radar name="Manager" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default CreateChart;
