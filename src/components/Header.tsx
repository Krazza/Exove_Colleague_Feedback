import React from "react";
import "./styles/Header.css"
import Translator from "./Translator";
import { useTranslation } from 'react-i18next';

function Header()
{
    const { t } = useTranslation();
    /* const user = t("USER"); */
    return(
        <header className="mainHeader">
            <h1>{/* ${user} */ `${t("Dashboard")}`}</h1>
            <div className="nav">
            <p className="lang"><Translator/></p>
            <button className="headerButton" onClick={()=> window.location.reload()}>{t(`Log Out`)}</button>
            </div>
        </header>
    )
}

export default Header;