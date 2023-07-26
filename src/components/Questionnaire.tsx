import React, { useState } from "react";
import axios from "axios";
import { SectionAnswers, Section, QuestionnaireContextTYPE, AnsweredQuestionnaire, UserMongoDM } from "../modules/types";
import { useLocation } from "react-router-dom";
import { QuestionnaireContext } from "./QuestionnaireContextProvider";
import QuestionnaireSection from "./QuestionnaireSection";
import { useTranslation } from 'react-i18next';
import PopUp from "./PopUp";

import "./styles/Questionnaire.css"
function Questionnaire()
{
    //questionnaire state
    const [displayPopUp, setDisplayPopUp] = useState(false);
    const [answerData, setAnswerData] = useState<SectionAnswers[]>([]);
    const value : QuestionnaireContextTYPE = { setAnswer : setAnswerData, answers : answerData}
    const questionData = require("../questions.json");

    const location = useLocation();
    const userData_QUESTIONS : UserMongoDM = location.state.userDataMongoDB;
    const { t } = useTranslation();
    return(
    <QuestionnaireContext.Provider value={value}>
    {displayPopUp ? <PopUp targetPage="/dashboard/userselect" linkText="Go back" 
    confirmationMessage="Questionnaire answered successfully!" descriptionMessage="Your answers were recorded and stored, good job!"/> 
    : <div className="questionnaireContainter">
        <div className="titleAndFeedbackSubject">
            <h1>{t("Questions")}</h1>
            <div className="feedbackSubject">{location.state.feedbackSubjectName}</div>
        </div>
        <form className="questionList" onSubmit={(event)=>submitHandle(event)}>
            {questionData.sections.map((section : Section, index : string) => 
            <QuestionnaireSection key={section.name} id={index} name={section.name} questions={section.questions}/>)}
            <input type="submit" className="mySubmitButton" value={t("SUBMIT") as string}/>
        </form>
    </div>}
    </QuestionnaireContext.Provider>)

    function submitHandle(event : React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        UpdateRemote();
        setDisplayPopUp(true);
        //window.location.reload();
    }

    function DeleteRequest(colleagueUid : string)
    {
        const requestIndex = userData_QUESTIONS.feedbackRequests.findIndex((request) => request.colleagueUid === colleagueUid);
        if(requestIndex !== undefined){
            userData_QUESTIONS.feedbackRequests.splice(requestIndex, 1);
        } else{
            console.log("Couldn't delete request :: DeleteRequest()");
        }
    }

    async function UpdateRemote()
    {
        const answeredQuestionnaire : AnsweredQuestionnaire = {
            employeeUid : location.state.feedbackSubjectID,
            employeeName : location.state.feedbackSubjectName,
            questionnaire : answerData
        }

        userData_QUESTIONS.answeredQuestionnaires.push(answeredQuestionnaire);
        DeleteRequest(location.state.feedbackSubjectID);
        //put updated feedback requests too
        axios.put(`http://localhost:4000/api/questions/${location.state.UID}`, { 
            feedbackRequests: userData_QUESTIONS.feedbackRequests,
            answeredQuestionnaires: userData_QUESTIONS.answeredQuestionnaires });
    }
}

export default Questionnaire;