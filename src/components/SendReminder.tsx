import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';

type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    colleagues: Array<string>;
};

function SendReminder() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [reminderMessage, setReminderMessage] = useState<string>('');
    const [isReminderSent, setIsReminderSent] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('/api/employees');
            setEmployees(response.data);
        }
        fetchData();
    }, []);

    async function handleSendReminder() {
        if (selectedEmployee) {
            const response = await axios.get(`/api/feedback/${selectedEmployee.id}`);
            const feedbackRequests = response.data.feedbackRequests;
            const unsentColleagues = feedbackRequests
                .filter((request: any) => !request.sent)
                .map((request: any) => request.colleague);

            if (unsentColleagues.length === 0) {
                alert('All colleagues have already sent feedback.');
            } else {
                const colleagueData = await axios.get(`/api/questiondata/colleagues`);
                const colleagueNames: string[] = unsentColleagues.map((unsentColleague: string) => {
                    const colleague = colleagueData.data.find((colleague: any) => colleague.id === unsentColleague);
                    return colleague.name;
                });
                const message = `Please provide feedback for ${selectedEmployee.firstName} ${selectedEmployee.lastName}. The following colleagues have not yet responded: ${colleagueNames.join(', ')}`;
                setReminderMessage(message);
                // Send reminder message here using email or messaging service API
                setIsReminderSent(true); // Set the state variable to true
            }
        }
    }

    return (
        <div>
            <div>
                {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</option>
                ))}

            </div>
            <button disabled={!selectedEmployee} onClick={handleSendReminder}>Send Reminder</button>
            {isReminderSent && (
                <div>
                    <h2>Reminder Sent</h2>
                    <p>The reminder has been sent successfully!</p>
                </div>
            )}
        </div>
    );

}

export default SendReminder;
