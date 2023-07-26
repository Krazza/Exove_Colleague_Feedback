import React, { useEffect, useState } from "react";
import ReminderSentModal from "./ReminderSentModal";
import Search from './Search';
import './styles/Employees.css';
// import ReportModal from "./ReportModal";
// import RadarChartComponent from './CreateChart';
import CreateChart from './CreateChart';
import { useNavigate } from "react-router";

// import Report from './Report';

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
  colleagueName: string;
}

interface RadarChartData {
  name: string;
  data: { section: string; value: number }[];
}
const Employees: React.FC = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  // const [expandedRow, setExpandedRow] = useState<number | null>(null);
  // const [expandedData, setExpandedData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showReminderSentModal, setShowReminderSentModal] = useState(false);
  const [showSendPDFModal, setShowSendPDFModal] = useState(false);
  // const [showSendReportsModal, setShowSendReportsModal] = useState(false);
  const [feedbackRequests, setFeedbackRequests] = useState<ExpandedData[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<null | string>(null);
  const [radarChartData, setRadarChartData] = useState<RadarChartData[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

  // const toggleRow = (employeeId: number) => {
  //   const isExpanded = expandedData.some((data) => data.employeeId === employeeId);
  //   if (isExpanded) {
  //     setExpandedData(expandedData.filter((data) => data.employeeId !== employeeId));
  //   } else {
  //     fetch(`http://localhost:4000/api/questions/${employeeId}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setExpandedData([...expandedData, { employeeId, data }]);
  //       });
  //   }
  // };

  const handleToggleRow = async (employeeId: string) => {
    setIsLoading(true);
    console.log("clicked")
    await fetch(`http://localhost:4000/api/users/${employeeId}`)
      .then((response) =>
        response.json())
      .then((data) => {
        setFeedbackRequests(data.feedbackRequests);
        console.log("data", data)
        setIsLoading(false);
        setSelectedId(employeeId);
        setShowList(!showList);
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

  const handleReports = () => {
   /*  console.log(`Create Reports clicked for employee ${employeeId}`);
    setSelectedEmployeeId(employeeId);

    const formattedData: RadarChartData = {
      name: employeeId,
      data: [
        { section: 'Section 1', value: 20 },
        { section: 'Section 2', value: 30 },
        // Add more sections and values as needed
      ],
    };

    setRadarChartData([formattedData]); */
    navigate('/dashboard/chart')
  };
  const handleReminder = (employeeId: string) => {
    console.log(`Create Reports clicked for employee ${employeeId}`);
    setShowReminderSentModal(true);
  };
  const handlePdf = (employeeId: string) => {
    console.log(`Create Reports clicked for employee ${employeeId}`);
    setShowSendPDFModal(true);
    // Handle create reports logic here
  };

  console.log("filterend employee", filteredEmployees);

  return (

    <div className="container">
      <Search onSearch={handleSearch} />
      <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Approve Requests</th>
            <th>Select PM</th>
            <th>Reminders</th>
            <th>Reports</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <React.Fragment key={employee.employeeId}>
              <tr onClick={() => handleToggleRow(employee.employeeId)}>
                <td>{employee.firstName.toUpperCase()} {employee.lastName.toUpperCase()}</td>
                <td><button className="employee_btn" onClick={() => {navigate("/dashboard/managerselect", {state: {
                  UID: employee.employeeId
                }})}}>Approve Requests</button></td>
                <td><button className="employee_btn" onClick={() => handlePdf(employee.employeeId)}>Select PM</button></td>
                <td><button className="employee_btn" onClick={ handleOpenModal}>Send Reminder</button></td>{isModalOpen && <ReminderSentModal onClose={handleCloseModal} />}
                <td><button className="employee_btn" onClick={() => handleReports()}>Create Report</button></td>

                <td><button className="employee_btn" onClick={() => handlePdf(employee.employeeId)}>Create PDF</button></td>
              </tr>
              {/* {expandedData.some((data) => data.employeeId === employee.employeeId) && (
                <tr>
                  <td colSpan={4}>
                    <ul>
                      {Object.entries(expandedData.find((data) => data.employeeId === employee.employeeId)?.data || {}).map(([key, value]) => (
                        <li key={key}>
                          {value.colleagueName}
                        </li> */}

              {selectedId === employee.employeeId && (
                <tr>
                  <td colSpan={3}>
                    <div className="feedback-request">
                      {showList && feedbackRequests &&
                        feedbackRequests.map((colleague) => {
                          return (
                            <div key={colleague.colleagueName} className="colleague-container">
                              <span>{colleague.colleagueName}</span>
                            </div>
                          );
                        })}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table >
      </div>
      {/* {selectedEmployeeId && <Report employeeId={selectedEmployeeId} />} */}
      {/* {selectedEmployeeId && <CreateChart data={[
        {
          name: selectedEmployeeId,
          data: [
            // Provide the necessary section and value data for the radar chart
            { section: 'Section 1', value: 20 },
            { section: 'Section 2', value: 30 },
            // Add more sections and values as needed
          ],
        },
      ]}
      />} */}
    </div >
  );
};

export default Employees;


