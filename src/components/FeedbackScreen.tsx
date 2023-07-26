import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Option, UserMongoDM } from "../modules/types";
//import { useAppSelector } from "../app/hooks";
import axios from "axios";
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from "../app/hooks";

import "../components/styles/FeedBackScreen.css"

function FeedBackScreen() {
    const currentUser = useAppSelector(state => state.user.user);
    const UID = currentUser.id;
    const [userDataMongoDB, setUserDataMongoDB] = useState<UserMongoDM>();

    const navigate = useNavigate();
    const [chosenEmployeeID, setChosenEmployeeID] = useState("");
    const [chosenEmployeeName, setChosenEmployeeName] = useState("");
    const { t } = useTranslation();
    
    useEffect(()=>{
        axios.get(`http://localhost:4000/api/questions/${UID}`).then(res=>
        {
            setUserDataMongoDB(res.data);
        }).catch((error)=> {
            console.log(`User ${currentUser.username} wasn't found in QUESTIONS collection.`)
        });
    }, []);

    //:: COLLEAGUE LIST AKA FEEDBACK REQUESTS
    const options: Option[] = []
    userDataMongoDB?.feedbackRequests.forEach(colleague => {
        options.push({ value: colleague.colleagueUid, label: colleague.colleagueName })
    })

    const handleSelect = (value: { value: string, label: string } | null) => {
        if (value === null)
            console.log("Error :: selected option was null");
        else {
            setChosenEmployeeID(value?.value);
            setChosenEmployeeName(value?.label);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        navigate("/dashboard/questionnaire", { state: {
            feedbackSubjectID : chosenEmployeeID,
            feedbackSubjectName : chosenEmployeeName,
            userDataMongoDB : userDataMongoDB,
            UID: UID
        }});
    }

    return (
        <div className="feedbacksrcContainer">
            <div className="headClass">
                <h1>{t("Provide feedback")}</h1>
                <p>{t("11 colleagues have requested for your feedback.")}</p>
            </div>
            <form className="feedbacksrcMain" onSubmit={(event) => handleSubmit(event)}>
                <Select required id="mySelect" onChange={(value) => { handleSelect(value) }} options={options} styles={{
                    control: (base) => ({
                        ...base,
                        backgroundColor: "#D9D9D9",
                        width: "25vw"
                    }),
                    menu: (base) => ({
                        ...base,
                        backgroundColor: "#8d00f11a",
                        minWidth: "100%",
                        display: "flex",
                        flexDirection: "column"
                    }),
                    dropdownIndicator: (base) => ({
                        ...base,
                        color: "#8E00F1",
                        ":hover": {
                            color: "#3B9993"
                        }
                    }),
                    indicatorSeparator: (base) => ({
                        ...base,
                        backgroundColor: "#8E00F1",
                        width: "3px",
                        borderRadius: "2px"
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected ? "#8E00F1" : "#FFFFFF",
                        alignSelf: "center",
                        width: "90%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: 10,
                        marginBlock: 10,
                        color: state.isSelected ? "#FFFFFF" : "#000000",
                        ":hover": {
                            backgroundColor: "#3B9993",
                            color: "#000000"
                        },
                    })
                }} />
                <section>
                    <h2>{t("Insructions")}</h2>
                    <ul>
                        <li>{"Lorem ipsum dolor sit amet, id mea veri nihil nominati, quaeque fastidii definiebas mei no."}</li>
                        <li>{"Eirmod recteque ei usu, an sanctus reprimique quo, cu fabulas similique scribentur pro."}</li>
                        <li>{"Ad per appareat assueverit, tritani sapientem ne quo, te eos zril nonumes posidonium."}</li>
                        <li>{"Pri ne consul fierent perpetua, et eius instructior vel, an eum euripidis comprehensam interpretaris. Mei facilisis corrumpit at."}</li>
                    </ul>
                    <input type="submit" className="questionnaireBttn" value={t("PROCEED TO FEEDBACK") as string} />
                </section>
            </form>
        </div>
    )
}

export default FeedBackScreen;