import React from "react";
import { Link } from "react-router-dom";
import PopUp from "./PopUp";

function Unauthorized()
{
    return(
        <div className="unauthContainer">
            <PopUp targetPage="/dashboard/userselect" confirmationMessage="Unauthorized" descriptionMessage="Access denied" linkText="GO BACK"/>
        </div>
    )
}

export default Unauthorized;