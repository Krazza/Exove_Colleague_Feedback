import React, { useEffect, useState } from "react";
import axios from "axios";

interface Employees {
  firstName: string;
  lastName: string;
  employeeId: string;
}

const EmployeeList = () => {
  const [loading, setIsLoading] = useState(false);
  const [AllEmployees, setAllEmployees] = useState([]);
  const [selectedColleagues, setSelectedColleagues] = useState([]);
  const [selectedId, setSelectedId] = useState("");

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
            <th>Reminder</th>
            <th>Report</th>
            <th>Create PDF</th>
          </tr>
        </thead>
        <tbody>
          {AllEmployees &&
            AllEmployees.map((user) => {
              return (
                <tr>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
