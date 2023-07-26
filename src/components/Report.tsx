import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart, registerables } from "chart.js";
import { useParams } from "react-router-dom"


interface Question {
    employeeId: string;
    text: string;
    answer: number;
    uid: string;
}
interface ReportProps {
    employeeId: string;
}

const Report: React.FC<ReportProps> = ({ employeeId }) => {
    const [questionnaireData, setQuestionnaireData] = useState<any[]>([]);

    useEffect(() => {
        fetchQuestionnaireData();
    }, []);

    const fetchQuestionnaireData = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/questions/${employeeId}`);
            const data = await response.json();
            setQuestionnaireData(data.questionnaire);
        } catch (error) {
            console.error('Error fetching questionnaire data:', error);
        }
    };

    useEffect(() => {
        Chart.register(...registerables); // Register all the Chart.js components

        const ctx = document.getElementById("myChart") as HTMLCanvasElement;

        if (questionnaireData && questionnaireData.length > 0) {
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: questionnaireData.map((q) => q.text),
                    datasets: [
                        {
                            label: "Answers",
                            data: questionnaireData.map((q) => q.answer),
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }
    }, [questionnaireData]);

    return <canvas id="myChart" />;
};

export default Report;