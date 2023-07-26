import React, { useEffect, useState } from "react";

// import ReminderSentModal from "./ReminderSentModal";

// import Search from "./Search";

import "./styles/Employees.css";

interface Employee {
  id: number;

  firstName: string;

  lastName: string;

  reminders: number;

  reports: number;

  pdf: string;
}

interface ExpandedData {
  employeeId: number;

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
    // const isExpanded = expandedData.some(
    //   (data) => data.employeeId === employeeId
    // );

    if (isExpanded) {
      setExpandedData(
        expandedData.filter((data) => data.employeeId !== employeeId)
      );
    } else {
      fetch(`http://localhost:4000/api/questions/${employeeId}`)
        .then((response) => response.json())

        .then((data) => {
          setExpandedData([...expandedData, { employeeId, data }]);
        });
    }
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
    console.log(`Create Reports clicked for employee ${employeeId}`);

    // Handle create reports logic here
  };

  const handleReminder = (employeeId: number) => {
    console.log(`Create Reports clicked for employee ${employeeId}`);

    setShowReminderSentModal(true);
  };

  const handlePdf = (employeeId: number) => {
    console.log(`Create Reports clicked for employee ${employeeId}`);

    // Handle create reports logic here
  };

  return (
    <div>
      <Search onSearch={handleSearch} />

      <table>
        <thead>
          <tr>
            <th>Employee Name</th>

            <th>Reminders</th>

            <th>Reports</th>

            <th>PDF</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.map((employee) => (
            <React.Fragment key={employee.id}>
              <tr onClick={() => toggleRow(employee.id)}>
                <td>
                  {employee.firstName} {employee.lastName}
                </td>

                <td>
                  <button
                    className="btn"
                    onClick={() => handleReminder(employee.id)}
                  >
                    Send Reminder
                  </button>
                </td>
                {showReminderSentModal && (
                  <ReminderSentModal
                    onClose={() => setShowReminderSentModal(false)}
                  />
                )}

                <td>
                  <button
                    className="btn"
                    onClick={() => handleReports(employee.id)}
                  >
                    Send Report
                  </button>
                </td>

                <td>
                  <button
                    className="btn"
                    onClick={() => handlePdf(employee.id)}
                  >
                    Create PDF
                  </button>
                </td>
              </tr>

              {/* {expandedData.some((data) => data.employeeId === employee.id) && (
                <tr>
                  <td colSpan={4}>
                    <ul>
                      {Object.entries(
                        expandedData.find(
                          (data) => data.employeeId === employee.id
                        )?.data || {}
                      ).map(([key, value]) => (
                        <li key={key}>{`${key}: ${value}`}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )} */}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
