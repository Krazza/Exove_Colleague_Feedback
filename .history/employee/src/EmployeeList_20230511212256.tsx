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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {AllEmployees &&
            AllEmployees.map((user: any) => {
              return (
                <tr>
                  <td onClick={() => fetchRequestedColleagues(user.employeeId)}>
                    {user.firstName} {user.lastName}
                  </td>
                  {selectedId === user.employeeId &&
                    selectedColleagues.map((colleague) => {
                      return (
                        <tr>
                          <td key={colleague.colleagueName}>
                            {colleague.colleagueName}
                          </td>
                          <tr>
                            td<button>Send Reminder</button>
                              </td>
                              </tr>
                          <td>
                            <button>Create Report</button>
                          </td>
                          <td>
                            <button>Create PDF</button>
                          </td>
                        </tr>
                      );
                    })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
