import React, { useState } from "react";
import { ManagerEntryProps } from "../modules/types";
import "./styles/ManagerSelection.css";
import { Icon } from '@iconify/react';

function ManagerEntry(props: ManagerEntryProps) {
    const [managerSelected, SetManagerSelected] = useState(false);

    return (
        <div className="managerEntryContainer">
            <div className="nameContainer"><span className="managerName">{props.displayName}</span></div>
            <div className="buttonHolder">{
                !managerSelected ?
                    <button className="confirm" onClick={onMangerSelected}><Icon icon="material-symbols:check" color="white" width="48" height="48" /></button>
                    :
                    <button className="replace" onClick={onManagerDeselected}><Icon icon="material-symbols:check-indeterminate-small" color="white" width="48" height="48" /></button>}
            </div>
        </div>
    )

    function onMangerSelected() {
        props.managerSelection();
        SetManagerSelected(true);
    }

    function onManagerDeselected() {
        props.managerDeSelection()
        SetManagerSelected(false)
    }
}

export default ManagerEntry;