import React from "react";
import { useNavigate } from "react-router-dom";
import { PopUpProps } from "../modules/types";
import "./styles/PopUp.css";

function PopUp(props: PopUpProps) {
    const navigate = useNavigate();
    return (
        <div className="popUp">
            <h2>{props.confirmationMessage ? props.confirmationMessage : "Well done!"}</h2>
            <h3>{props.descriptionMessage ? props.descriptionMessage : "Whatever you did, you did it successfully."}</h3>
            <button onClick={() => { navigate(props.targetPage) }}>{props.linkText ? props.linkText : "Go back"}</button>
        </div>
    )
}

export default PopUp;