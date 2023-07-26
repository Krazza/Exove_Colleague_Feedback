import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Header from "./Header";
import { useTranslation } from 'react-i18next';
import "./styles/Dashboard.css"
import { UserRoles } from "../modules/Roles";

function Dashboard()
{   
    const userData = useAppSelector(state => state.user);
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div>
            <Header />
            <div className="dashboardContainer">
                <div className="sideMenu">
                    <div className="userSignature">{";)"}</div>
                    <h2>{t("Welcome,")} <br/><span className="userName">{userData.user.username}</span></h2>
                    {(userData.user.role === UserRoles.admin || userData.user.role === UserRoles.manager) ?
                    <nav>
                        <button className="navButton" onClick={() => { navigate("/dashboard/employees") }}>{t("Admin console")}</button>
                        <button className="navButton" onClick={()=>{navigate("/dashboard/userselect")}}>{t("Employees")}</button>
                        <button className="navButton" onClick={()=>{navigate("/dashboard/requests")}}>{t("Questions")}</button>
                        <button className="navButton" onClick={()=>{navigate("/dashboard/responses")}}>{t("Responses")}</button>
                        <button className="navButton" onClick={()=>{navigate("/dashboard/chart")}}>{"Chart"}</button>
                    </nav>
                    :
                    <nav>
                        <button className="navButton" onClick={()=>{navigate("/dashboard/userselect")}}>{t("Employees")}</button>
                        <button className="navButton" onClick={()=>{navigate("/dashboard/requests")}}>{t("Questions")}</button>
                    </nav>}
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard;