import React, { useState, useEffect } from "react"
import axios from "axios";
import { useLocation } from "react-router";
import PopUp from "./PopUp";
import { FeedbackRequest, UserMongoDM } from "../modules/types";
import "./styles/RequestApproval.css"
import { UserRequest } from "../modules/user";
import { useTranslation } from 'react-i18next';
function RequestApproval() {
    const { t } = useTranslation();
    const location = useLocation();
    const [displayPopUp, setDisplayPopUp] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    // const [uncheckedUsers, setUncheckedUsers] = useState<string[]>([]);
    const [checkedCount, setCheckedCount] = useState<number>(0);
    const [userData_QUESTIONS, setUserDataMongoDB] = useState<UserMongoDM>();
    const [userData_USERS, setUserData_USERS] = useState<UserRequest>(location.state.chosenUser);
    const pendingRequests : FeedbackRequest[] = DuplicateCheck();

    //FETCH CHOSEN EMPLOYEE FEEDBACK REQUESTS
    useEffect(() => {
        axios.get(`http://localhost:4000/api/questions/${location.state.uid}`).then(res => {
            try {
                setUserDataMongoDB(res.data)
            } catch (error) {
                console.log(error);
            }
        });
    }, []);

    DuplicateCheck();
    return(
        <>
        {displayPopUp ? <PopUp targetPage="/dashboard/userselect" linkText="Go back" confirmationMessage="User will recieve feedback requests promptly."/>: <div className="requestApprovalContainer">
            <section>
                <h2>{t("Select the feedback requests to approve.")}</h2>
            </section>
            <form className="requestApprovalForm" onSubmit={(event)=>submitHandle(event)}>
                {pendingRequests.map((request : FeedbackRequest) => 
                (<div className="checkInput" key={request.colleagueUid}>
                    <label className="checkbox-label">{request.colleagueName}
                        <input
                        type="checkbox"
                        value={request.colleagueUid}
                        checked={selectedUsers.includes(request.colleagueUid)}
                        onChange={handleCheckboxChange}
                        />
                        <span className="checkbox-wrapper"></span>
                    </label>
                </div>))}
                <input type="submit" className="requestSubmit mySubmitButton" value="SEND FOR FEEDBACK"/>
            </form>
        </div>}</>
    )

    function DuplicateCheck() : FeedbackRequest[]
    {
        const approvedRequestIDs : string [] = [];
        userData_QUESTIONS?.feedbackRequests.forEach((request) => {
            approvedRequestIDs.push(request.colleagueUid);
        })
        const filteredRequests : FeedbackRequest[] = userData_USERS.feedbackRequests.filter((request) => {
            if(!approvedRequestIDs.includes(request.colleagueUid))
                return request;
        });
        return filteredRequests;
    }

    function submitHandle(event : React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();

        if(checkedCount <=0 )
        {
            window.alert("Please, approve at least one request.")
        } else{
            UpdateUserFeedBackRequests();
            setDisplayPopUp(true);
        }
    }

    function UpdateUserFeedBackRequests() {
        if (userData_QUESTIONS) {
            const tempUserData = userData_QUESTIONS;
            tempUserData.feedbackRequests = CreateRequests();
            setUserDataMongoDB(tempUserData);
            DeleteRequests(tempUserData.feedbackRequests);

            axios.put(`http://localhost:4000/api/questions/${location.state.uid}`, {
                feedbackRequests: userData_QUESTIONS.feedbackRequests
            }).then((res) => console.log(res));

            axios.put(`http://localhost:4000/api/users/${location.state.uid}`, {
                feedbackRequests: userData_USERS.feedbackRequests
            })
        }
        else {
            console.log("Error :: invalid/undefined user data");
        }
    }

    function DeleteRequests(feedbackRequests: FeedbackRequest[]) {
        feedbackRequests.forEach((request, index) => {
            const requestToRemoveIndex = userData_USERS.feedbackRequests.findIndex(entry => entry.colleagueUid === request.colleagueUid);
            if (requestToRemoveIndex !== undefined) {
                userData_USERS.feedbackRequests.splice(requestToRemoveIndex, 1);
            }
        })
    }

    function CreateRequests(): FeedbackRequest[] {
        const approvedRequests: FeedbackRequest[] = userData_QUESTIONS?.feedbackRequests ?? [];

        selectedUsers.forEach((userID) => {  
            const request = pendingRequests.find((request : FeedbackRequest) => userID === request.colleagueUid);
            if(request !== undefined)
            {
                const newRequest : FeedbackRequest = {
                    colleagueName : request.colleagueName,
                    colleagueUid : request.colleagueUid,
                    managerList : location.state.managerList
                }
                approvedRequests.push(newRequest);
            }
        })
        return approvedRequests;
    }

    function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        if (selectedUsers.includes(value)) {
            setSelectedUsers(selectedUsers.filter(user => user !== value));
            setCheckedCount(checkedCount - 1);
        } else {
            if (checkedCount < 5) {
                setSelectedUsers([...selectedUsers, value]);
                setCheckedCount(checkedCount + 1);
            }
        }
    }
}

export default RequestApproval;