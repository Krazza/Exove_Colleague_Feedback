import React, { useContext } from "react";
import { QuestionnaireContext } from "./QuestionnaireContextProvider";
import { Question, SectionAnswers } from "../modules/types";

function QuestionEntry(props : Question)
{
    //storing (WRITE/OVERRIDE) answer data
    const answerStorage = useContext(QuestionnaireContext);
    const { sectionID: currentSectionID, section, questionID: id, question, isFreeForm } = props;

    return(
        <div className="radioQuestionContainer" id={`${section}::${id}`}>
            <div className="radioQuestion">
                <p>{question}</p>
            </div>
            {!isFreeForm ? <div className="radioInput">
                <p>{"Strongly disagree"}</p>
                <div>
                    <input type="radio" value="-2" 
                    name={`${section}::${id}`} onChange={(event)=>HandleChange(event, currentSectionID, section, id, question, isFreeForm)} required/>
                    <input type="radio" value="-1" 
                    name={`${section}::${id}`} onChange={(event)=>HandleChange(event, currentSectionID, section, id, question, isFreeForm)}/>
                    <input type="radio" value="0"
                    name={`${section}::${id}`} onChange={(event)=>HandleChange(event, currentSectionID, section, id, question, isFreeForm)}/>
                    <input type="radio" value="1"
                    name={`${section}::${id}`} onChange={(event)=>HandleChange(event, currentSectionID, section, id, question, isFreeForm)}/>
                    <input type="radio" value="2"
                    name={`${section}::${id}`} onChange={(event)=>HandleChange(event, currentSectionID, section, id, question, isFreeForm)}/>
                </div>
                <p>{"Strongly agree"}</p>
            </div> : 
                <textarea className="textInput" onChange={(event)=>HandleChange(event, currentSectionID, section, id, question, isFreeForm)} required/>}
        </div>
    )

    function HandleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, sectionID : string, section : string, questionID : string, question : string, isFreeForm : boolean)
    {
        SetAnswer(sectionID, section, questionID, question, isFreeForm, event.target.value);
    }

    function SetAnswer(sectionID : string, section : string, questionID : string, question : string, isFreeForm : boolean, answer : string)
    {
        const storageTEMP = answerStorage.answers;
        //check if answer exists
        //write that shit down

        const currentAnswerSection = storageTEMP.find((section) => section.sectionID === currentSectionID)
        if(currentAnswerSection === undefined)
        {
            //section not found
            const newAnswerSection : SectionAnswers = {
                sectionID : sectionID,
                name : section,
                answers : []
            }

            const newAnswer : Question = {
                sectionID : sectionID,
                section : section,
                questionID : questionID,
                question : question,
                isFreeForm : isFreeForm,
                answer : answer
            }

            newAnswerSection.answers.push(newAnswer);
            storageTEMP.push(newAnswerSection);
            answerStorage.setAnswer(storageTEMP);
            //push the new answer into answers and into storage (context)
        } else{
            const currentQuestion = currentAnswerSection.answers.find((question) => question.questionID === questionID)
            if(currentQuestion === undefined)
            {
                //question wasn't found in the section
                const newAnswer : Question = {
                    sectionID : sectionID,
                    section : section,
                    questionID : questionID,
                    question : question,
                    isFreeForm : isFreeForm,
                    answer : answer
                }
                currentAnswerSection.answers.push(newAnswer);
                answerStorage.setAnswer(storageTEMP);
            } else{
                currentQuestion.answer = answer;
                answerStorage.setAnswer(storageTEMP);
            }
        }
        console.log(answerStorage.answers);
    }
}

export default QuestionEntry;