import React, { useState, useEffect } from "react";

import EmployeesList from "./EmployeesList";

import "./styles/Employees.css";

// type EmployeeData = {

// id: number;

// firstName: string;

// lastName: string;

// employeeId: string;

// colleagues: Array<string>;

// };

function Employee() {
  const [employeeData, setEmployeeData] = useState < Array < EmployeeData >> [];

  const [loading, setLoading] = useState < boolean > true;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:4000/api/users`);

      const data = await response.json();

      setEmployeeData(data);

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Employees</h1>

      <EmployeesList />
    </div>
  );
}

export default Employee;
