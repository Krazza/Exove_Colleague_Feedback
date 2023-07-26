import React, { useEffect, useState } from "react";

interface Employee {
  employeeId: string;

  firstName: string;

  lastName: string;

  reminders: number;

  reports: number;

  pdf: string;
}

interface ExpandedData {
  employeeId: string;
  data: any[];
}

const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const [expandedData, setExpandedData] = useState<any[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [showReminderSentModal, setShowReminderSentModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/api/users")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEmployees(data);
      });
  }, []);

  const toggleRow = (employeeId: string) => {
    fetch(`http://localhost:4000/api/questions/${employeeId}`)
      .then((response) => response.json())
      .then((data) => {
        setExpandedData([...expandedData, data.feedbackRequests]);
      });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredEmployees = employees.filter((employee) =>
    `${employee.firstName} ${employee.lastName}`

      .toLowerCase()

      .includes(searchQuery.toLowerCase())
  );

  const handleReports = (employeeId: number) => {
    console.log(`Create Reports clicked for employee ${employeeId}`); // Handle create reports logic here
  };

  const handleReminder = (employeeId: number) => {
    console.log(`Create Reports clicked for employee ${employeeId}`);

    setShowReminderSentModal(true);
  };

  const handlePdf = (employeeId: number) => {
    console.log(`Create Reports clicked for employee ${employeeId}`); // Handle create reports logic here
  };

  console.log(expandedData);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Colleagues</th>
            <th>Reminders</th>
            <th>Reports</th>
            <th>PDF</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.map((employee) => (
            <React.Fragment key={employee.employeeId}>
              <tr onClick={() => toggleRow(employee.employeeId)}>
                <td>
                  {employee.firstName} {employee.lastName}
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              {/* {expandedData.some((data) => data.employeeId === employee) && (
                <tr>
                  <td colSpan={4}>
                    <ul>
                      {Object.entries(
                        expandedData.find(
                          (data) => data.employeeId === employee
                        )?.data || {}
                      ).map(([key, value]) => (
                        <li key={key}>{`${key}: ${value}`}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )} */}
              {expandedData &&
                expandedData.map((colleague) => {
                  return (
                    <tr>
                      <td>{colleague.colleagueName}</td>
                    </tr>
                  );
                })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
