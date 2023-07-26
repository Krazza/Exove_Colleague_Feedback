import React from "react";
import QuestionEntry from "./QuestionEntry";
import { Section } from "../modules/types";

function QuestionnaireSection(props : Section)
{
    const { id: sectionID, name: sectionName, questions } = props;

    return(
    <div className="questionnaireSection">
        <h2>{sectionName}</h2>
        {questions.map((question, index) => 
        <QuestionEntry key={index.toString()} section={sectionName} sectionID={sectionID}
        questionID={index.toString()} question={question.question} isFreeForm={question.isFreeForm}/>)}
    </div>)
}

export default QuestionnaireSection;