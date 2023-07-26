import React, { useState } from "react";
import axios from "axios";

interface ReminderComponentProps {
    userId: string; // Adjust the type accordingly based on the actual data type of userId
}

function ReminderComponent({ userId }: ReminderComponentProps) {
    const [userName, setUserName] = useState("");

    const fetchUserName = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/questions/:id${userId}`);
            setUserName(response.data.name);
        } catch (error) {
            console.log(error);
        }
    };

    const sendReminder = async () => {
        try {
            await axios.post(`http://localhost:4000/api/reminders/send`, {
                userId: userId,
                userName: userName,
                message: "Don't forget about our meeting tomorrow!",
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <button onClick={fetchUserName}>Employee Name</button>
            {userName && (
                <div>
                    <p>{`User Name: ${userName}`}</p>
                    <button onClick={sendReminder}>Send Reminder</button>
                </div>
            )}
        </div>
    );
}

export default ReminderComponent;
