import React from "react";
import './styles/Employees.css'
import { useState } from 'react';
type Employee = {
  id: number;
  name: string;
  colleagues: Array<string>;
};
type Props = {
  data: Array<Employee>;
};
function EmployeesList({ data }: Props) {
  const [expandedRows, setExpandedRows] = useState<Array<number>>(Array<number>(0));
  const toggleRowExpansion = (rowId: number) => {
    setExpandedRows((prevState: Array<number>) => {
      if (prevState.includes(rowId)) {
        return prevState.filter((id) => id !== rowId);
      } else {
        return [...prevState, rowId];
      }
    });
  };
  
  const handleSendReminder = (employeeId: number) => {
        console.log(`Send Reminder clicked for employee ${employeeId}`);
        // Handle sending reminder logic here
      };
    
      const handleCreateReports = (employeeId: number) => {
        console.log(`Create Reports clicked for employee ${employeeId}`);
        // Handle create reports logic here
      };
    
      const handleCreatePDF = (employeeId: number) => {
        console.log(`Create PDF clicked for employee ${employeeId}`);
        // Handle create PDF logic here
      };
  const Table = ({ data }: Props) => {
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
          {data.map((row: Employee) => (
            <React.Fragment key={row.id}>
              <tr onClick={() => toggleRowExpansion(row.id)}>
                <td>{row.name}</td>
                <td>{row.colleagues.length >0 }</td>
               <td className="btn_employee">
                  <button onClick={() => handleSendReminder(row.id)}>Send Reminder</button>
                  </td>
                <td className="btn_employee">
                  <button onClick={() => handleCreateReports(row.id)}>Create Charts</button>
                </td>
                <td className="btn_employee">
                  <button onClick={() => handleCreatePDF(row.id)}>Create PDF</button>
                  </td>
                 
              </tr>
              {expandedRows.includes(row.id) && (
                <tr>
                  <td colSpan={2}>
                    <ul>
                      {row.colleagues.map((colleague,index)=>
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