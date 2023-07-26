import React from "react";
import "./styles/ReminderSentModal.css";

interface ReminderSentModalProps {
  onClose: () => void;
}

const ReminderSentModal: React.FC<ReminderSentModalProps> = ({ onClose }) => (
  <div className="modal-container">
    <div className="modal">
      <div className="modal-content">
        <h2>Reminder Sent</h2>
        <p>Reminders message has been sent.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  </div>
);

export default ReminderSentModal;
