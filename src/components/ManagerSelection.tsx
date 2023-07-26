import React, { useEffect, useState } from "react";
import axios from "axios";
import ManagerEntry from "./ManagerEntry";
import { UserRequest } from "../modules/user";
import { FeedbackManager } from "../modules/types";
import { useNavigate, useLocation } from "react-router";

function ManagerSelection() {
    //WILL BE COMING FROM THE ADMIN DASHBOARD


    //PASSING THE UID FOR FETCHING AND THE SELECTED MANAGERS LIST
    const navigate = useNavigate();

    //DATA FOR CHOSEN EMPLOYEE
    const [userData_USERS, setUserData_USERS] = useState<UserRequest>();
    const [managerList, SetManagerList] = useState<FeedbackManager[]>([{ supervisorFirstName: "Jeremy", supervisorId: "10008" }]);
    const location = useLocation();
    const UID = location.state.UID;
    //RESULT
    const selectedManagers: FeedbackManager[] = [];

    //STYLE CORRECTION
    const [restyle, SetRestyle] = useState<Boolean>(false);

    useEffect(() => {
        axios.get(`http://localhost:4000/api/users/${UID}`).then((res) => {

            setUserData_USERS(res.data);
            SetManagerList(res.data.reportsTo);
            if (managerList !== undefined) {
                if (managerList.length >= 5)
                    SetRestyle(true);
            }
        })
    }, []);

    return (
        <div className="managerListContainer">
            <section>
                <h2>{"Select the project manager for the employee."}</h2>
            </section>
            <div className="managerList">
                {restyle ? <div className="managersNoHeight">
                    {managerList.map(entry => <ManagerEntry key={entry.supervisorId} displayName={entry.supervisorFirstName} uid={entry.supervisorId}
                        managerSelection={() => SelectManager(entry.supervisorFirstName, entry.supervisorId)} managerDeSelection={() => DeSelectManager(entry.supervisorId)} />)}
                </div> : <div className="managers">
                    {managerList.map(entry => <ManagerEntry key={entry.supervisorId} displayName={entry.supervisorFirstName} uid={entry.supervisorId}
                        managerSelection={() => SelectManager(entry.supervisorFirstName, entry.supervisorId)} managerDeSelection={() => DeSelectManager(entry.supervisorId)} />)}
                </div>}
            </div>
            <button className="requestButton" onClick={() => {

                if (selectedManagers.length <= 0) {
                    window.alert("Choose at least one manager, please.")
                } else {
                    navigate("/dashboard/requestapproval", {
                        state: {
                            managerList: managerList,
                            uid: UID,
                            chosenUser: userData_USERS
                        }
                    })
                }
            }}>{"NEXT"}</button>
        </div>
    )

    function SelectManager(name: string, uid: string) {
        const selectedManager: FeedbackManager = {
            supervisorFirstName: name,
            supervisorId: uid
        }
        selectedManagers.push(selectedManager);
    }

    function DeSelectManager(uid: string) {
        const managerIndex = selectedManagers.findIndex(manager => manager.supervisorId === uid);
        if (managerIndex < 0)
            return;
        else
            selectedManagers.splice(managerIndex, 1);
    }
}

export default ManagerSelection;
//schema fix
//pull front-auth