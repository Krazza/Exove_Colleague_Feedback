import React, { useEffect, useState } from "react";
import axios from "axios";

interface Employees {
  firstName: string;
  lastName: string;
  employeeId: string;
}

interface Feedback {
  colleagueName: string;
  colleagueUid: string;
}

const EmployeeList = () => {
  const [loading, setIsLoading] = useState(false);
  const [AllEmployees, setAllEmployees] = useState<Employees[]>([]);
  const [selectedColleagues, setSelectedColleagues] = useState<Feedback[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [showColleagues, setShowColleagues] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchAllEmployees = async () => {
      const res = await axios.get("http://localhost:4000/api/users");
      const data = res.data;
      setAllEmployees(data);
      setIsLoading(false);
    };

    fetchAllEmployees();
  }, []);

  const fetchRequestedColleagues = async (employeeId: string) => {
    setIsLoading(true);
    const res = await axios.get(
      `http://localhost:4000/api/questions/${employeeId}`
    );
    const data = res.data;
    setSelectedColleagues(data.feedbackRequests);
    setSelectedId(employeeId);
    setIsLoading(false);
    setShowColleagues(!showColleagues);
  };

  if (loading) {
    <h2>Loading...</h2>;
  }
  return (
    <div>
      <h2>Employees List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Colleagues</th>
            <th>Send Reminder</th>
            <th>Create Report</th>
            <th>Create PDF</th>
          </tr>
        </thead>
        <tbody>
          {AllEmployees.map((user: any) => (
            <React.Fragment key={user.employeeId}>
              <tr>
                <td onClick={() => fetchRequestedColleagues(user.employeeId)}>
                  {user.firstName} {user.lastName}
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              {showColleagues && selectedId === user.employeeId && (
                <React.Fragment>
                  {selectedColleagues.map(
                    (colleague: Feedback, index: number) => (
                      <tr key={`${colleague.colleagueUid}-${index}`}>
                        <td></td>
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
                      </tr>
                    )
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
