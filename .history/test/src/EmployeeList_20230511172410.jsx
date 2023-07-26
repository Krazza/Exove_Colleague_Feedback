import React, { useEffect, useState } from "react";

import './styles/Employees.css';

import axios from 'axios';

import SendReminder from './SendReminder';




// type Employee = {

// id: number;

// firstName: string;

// lastName: string;

// colleagues: Array<string>;

// };

// type Props = {

// data: Array<Employee>;

// };

function EmployeesList() {

const [expandedRows, setExpandedRows] = useState(0);

const [isLoading, setIsLoading] = useState(false);

const [data, setData] = useState([]);

const [questionData, setQuestionData] = useState([]);

const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);




const [showSendReminder, setShowSendReminder] = useState(false);





useEffect(() => {

setIsLoading(true);

const fetchData = async () => {

const res = await axios.get("http://localhost:4000/api/users");

const data = res.data;

setData(data);

setIsLoading(false);

};

fetchData();

}, []);




const fetchColleagueList = async (employeeId) => {

setIsLoading(true);

const res = await axios.get(`http://localhost:4000/api/questions/${employeeId}`);

const questionData = res.data;

setQuestionData(questionData.feedbackRequests);

setSelectedEmployeeId(employeeId);

setIsLoading(false);

}




const handleSendReminder = (employeeId) => {

console.log(`Send Reminder clicked for employee ${employeeId}`);

toggleSendReminder();

// Handle sending reminder logic here

};

const toggleSendReminder = () => {

setShowSendReminder(!showSendReminder);

};




const handleCreateReports = (employeeId) => {

console.log(`Create Reports clicked for employee ${employeeId}`);

// Handle create reports logic here

};




const handleCreatePDF = (employeeId) => {

console.log(`Create PDF clicked for employee ${employeeId}`);

// Handle create PDF logic here

};

const Table = ({ data }) => {




const toggleRowExpansion = async (rowId) => {

await fetchColleagueList(rowId);

setExpandedRows((prevState) => {

if (prevState.includes(rowId)) {

return prevState.filter((id) => id !== rowId);

} else {

return [...prevState, rowId];

}

});

};




console.log(data);

return (

<table>

<thead>

<tr>

<th>Name</th>

<th>Colleagues</th>

<th>Reminders</th>

<th>Reports</th>

<th>PDF</th>

</tr>

</thead>

<tbody>

{data.map((row) => (

<React.Fragment key={row.id}>

<tr onClick={() => toggleRowExpansion(row.id)}>

<td>{row.firstName} {row.lastName}</td>

<td>{row.colleagues && row.colleagues.length}</td>

<td className="btn">

<button onClick={() => handleSendReminder(row.id)}>Send Reminder</button>

{showSendReminder && <SendReminder handleSendReminder={toggleSendReminder} />}

</td>

<td className="btn">

<button onClick={() => handleCreateReports(row.id)}>Create Reports</button>

</td>

<td className="btn">

<button onClick={() => handleCreatePDF(row.id)}>Create PDF</button>

</td>

</tr>

{row.colleagues && row.colleagues.length > 0 && expandedRows.includes(row.id) && (

<tr>

<td colSpan={2}>

<ul>

{row.colleagues.map((colleague, index) =>

<li key={index}>{colleague}</li>)}

</ul>

</td>

</tr>

)}

</React.Fragment>

))}

</tbody>

</table>

);

};




    return <Table data={data} />;
}

export default EmployeesList;





