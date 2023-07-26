import React from "react";
import './styles/ReminderSentModal.css';

interface ReportModalProps {
    onClose: () => void;
}
const ReportModal: React.FC<ReportModalProps> = ({ onClose }) => (

    <div className="modal">
        <div className="modal-content">
            <h2>Reports Sent</h2>
            <p>Creating reports.</p>
            <button onClick={onClose}>Close</button>
        </div>
    </div>
);

export default ReportModal;