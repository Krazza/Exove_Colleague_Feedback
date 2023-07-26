import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [loading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchAllEmployees = async () => {
      const res = await axios.get("http://localhost:4000/api/users");
      const data = res.data;
      setEmployees(data);
      setIsLoading(false);
    };

    fetchAllEmployees();
  }, []);

  if (loading) {
    <h2>Loading...</h2>;
  }
  return <div>EmployeeList</div>;
};

export default EmployeeList;
