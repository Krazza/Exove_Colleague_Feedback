import React, { useEffect, useState } from "react";

// import ReminderSentModal from "./ReminderSentModal";

// import Search from "./Search";

// import "./styles/Employees.css";

interface Employee {
  employeeId: string;

  firstName: string;

  lastName: string;

  reminders: number;

  reports: number;

  pdf: string;
}

interface ExpandedData {
  employeeId: number;
  colleagueName: string;
}

const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [feedbackRequests, setFeedbackRequests] = useState<ExpandedData[]>([]);
  const [selectedId, setSelectedId] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const [expandedData, setExpandedData] = useState<any[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [showReminderSentModal, setShowReminderSentModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchUserData = async () => {
      await fetch("http://localhost:4000/api/users")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setEmployees(data);
          setIsLoading(false);
        });
    };
    fetchUserData();
  }, []);

  //   const toggleRow = (employeeId: string) => {
  //     const isExpanded = expandedData.some(
  //       (data) => data.employeeId === employeeId
  //     );

  //     if (isExpanded) {
  //       setExpandedData(
  //         expandedData.filter((data) => data.employeeId !== employeeId)
  //       );
  //     } else {
  //       fetch(`http://localhost:4000/api/questions/${employeeId}`)
  //         .then((response) => response.json())

  //         .then((data) => {
  //           setExpandedData([...expandedData, { employeeId, data }]);
  //         });
  //     }
  //   };

  const handleToggleRow = async (employeeId: string) => {
    setIsLoading(true);
    await fetch(`http://localhost:4000/api/questions/${employeeId}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackRequests(data.feedbackRequests);
        setIsLoading(false);
        setSelectedId(employeeId);
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

  const handleReports = (employeeId: string) => {
    console.log(`Create Reports clicked for employee ${employeeId}`);

    // Handle create reports logic here
  };

  const handleReminder = (employeeId: string) => {
    console.log(`Create Reports clicked for employee ${employeeId}`);

    setShowReminderSentModal(true);
  };

  const handlePdf = (employeeId: string) => {
    console.log(`Create Reports clicked for employee ${employeeId}`);

    // Handle create reports logic here
  };

  console.log(feedbackRequests);

  return (
    <div>
      {/* <Search onSearch={handleSearch} /> */}

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
            <React.Fragment key={employee.employeeId}>
              <tr onClick={() => handleToggleRow(employee.employeeId)}>
                <td>
                  {employee.firstName} {employee.lastName}
                </td>

                <td>
                  <button
                    className="btn"
                    onClick={() => handleReminder(employee.employeeId)}
                  >
                    Send Reminder
                  </button>
                </td>
                {/* {showReminderSentModal && (
                  <ReminderSentModal
                    onClose={() => setShowReminderSentModal(false)}
                  />
                )} */}

                <td>
                  <button
                    className="btn"
                    onClick={() => handleReports(employee.employeeId)}
                  >
                    Send Report
                  </button>
                </td>

                <td>
                  <button
                    className="btn"
                    onClick={() => handlePdf(employee.employeeId)}
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

              {selectedId === employee.employeeId && (
                <tr>
                  {feedbackRequests &&
                    feedbackRequests.map((colleague) => {
                      return (
                        <>
                          <td>{colleague.colleagueName}</td>
                          <td>
                            <button>Send Reminder</button>
                          </td>
                          <td>
                            <button>Create Report</button>
                          </td>
                          <td>
                            <button>Create PDF</button>
                          </td>
                        </>
                      );
                    })}
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
