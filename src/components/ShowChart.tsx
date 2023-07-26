import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CreateChart from './CreateChart';
import { useAppSelector } from '../app/hooks';
import { Answer, Questionnaire } from "../modules/chart";
import { RadarChartData } from '../modules/chart';
import DownloadPDF from './DownloadPDF';

import './styles/ShowChart.css';

const ShowChart = () => {
    const [answerData, setAnswerData] = useState<any>([]);
    const [showChart, setShowChart] = useState(false);
    const currentUser = useAppSelector(state => state.user.user);
    const UID = currentUser.id;
    const data = [
        { section: 'Quality focus', A: 120, B: 110, },
        { section: 'People skills', A: 98, B: 130,},
        { section: 'Self guidance', A: 86, B: 130,},
        { section: 'Leadership', A: 99, B: 100,},
        { section: 'Readiness for change', A: 85, B: 90, },
        { section: 'Creativity', A: 65, B: 85,},
      ];
    useEffect(() => {
        axios.get(`http://localhost:4000/api/questions/${UID}`)
          .then(res => {
            const quesData = res.data;
            setAnswerData(quesData);
            console.log('data',quesData);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
      const handleCreateChart = () => {
        setShowChart(true);
      };
    const answeredQuestionnaires = answerData?.answeredQuestionnaires;
    console.log('answeredQuestionnaires', answeredQuestionnaires);
    if (answeredQuestionnaires && answeredQuestionnaires.length > 0) {
        const radarChartData = answeredQuestionnaires?.map((questionnaire: Questionnaire) => {
            console.log('questionnaire-fetched', questionnaire);
            const sectionName = questionnaire.name;
            const questionnaires = answeredQuestionnaires.map((answeredQuestionnaire: Questionnaire) => answeredQuestionnaire.questionnaire);
                console.log('questionnaires', questionnaires);
                const answers = questionnaire.questionnaire.map((answers: any) => answers.answers);
                console.log('answers', answers);
            const answer = questionnaire.questionnaire.flatMap((answersGroup: { answers: Answer[] }) =>
                answersGroup.answers.map((answer: Answer) => parseInt(answer.answer))
            );
            console.log('answer', answer);
            
        
            return { section: sectionName, answers: answer };
        }); 
        const sectionAnswers: number[][] = radarChartData.map((data:any) => (data.answers || []) as number[]);

        console.log('Section Answers:', sectionAnswers);
        const allSectionAnswers: RadarChartData[] = [];

        sectionAnswers.forEach((sectionAnswer, index) => {
        const sectionName = `Section ${index + 1}`;
        const sectionData = sectionAnswer.map((value: number) => ({ section: sectionName, value }));

        allSectionAnswers.push({
            name: sectionName,
            data: sectionData,
        });
        });
        console.log('All Section Answers:', allSectionAnswers);
    }
    return (
        
        <div className='chart'>
            <button className='chartBtn' onClick={handleCreateChart}>Create chart</button>
            {showChart && (
                <>
                <CreateChart data={data as []} />
                {/* <DownloadPDF data={data as []} /> */}
                </>
            )}
            {/* {showChart && <CreateChart data={allSectionAnswers as []} />} */}
        </div>
    );
};

export default ShowChart;

/* import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CreateChart from './CreateChart';
import { useAppSelector } from '../app/hooks';
import { Answer, Questionnaire } from "../modules/chart";

const ShowChart = () => {
    const [answerData, setAnswerData] = useState<any>([]);
    const [showChart, setShowChart] = useState(false);
    const currentUser = useAppSelector(state => state.user.user);
    const UID = currentUser.id;

    useEffect(() => {
        axios.get(`http://localhost:4000/api/questions/${UID}`)
          .then(res => {
            const quesData = res.data;
            setAnswerData(quesData);
            console.log('data',quesData);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
      const handleCreateChart = () => {
        setShowChart(true);
      };
    const answeredQuestionnaires = answerData.answeredQuestionnaires;
    console.log('answeredQuestionnaires', answeredQuestionnaires);
    

    const radarChartData = answeredQuestionnaires?.map((questionnaire: Questionnaire) => {
        console.log('questionnaire-fetched', questionnaire);
        
            const sectionName = questionnaire.name;
            const questionnaires = answeredQuestionnaires.map((answeredQuestionnaire: Questionnaire) => answeredQuestionnaire.questionnaire);
            console.log('questionnaires', questionnaires);
            const answers = questionnaire.questionnaire.map((answers: any) => answers.answers);
            console.log('answers', answers);
            const answer = questionnaire.questionnaire.flatMap((answersGroup: { answers: Answer[] }) =>
                answersGroup.answers.map((answer: Answer) => parseInt(answer.answer))
            );
            console.log('answer', answer);
          
            const averageAnswer = answer.reduce((sum: number, answer:number) => sum + answer, 0) / answer.length;

        return { section: sectionName, value: averageAnswer };
    });
    return (
        <div>
      <button onClick={handleCreateChart}>Create chart</button>
      {showChart && radarChartData && <CreateChart data={radarChartData} />}
    </div>
    );
};

export default ShowChart; */