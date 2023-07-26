import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [loading, setIsLoading] = useState(false);
    const [AllEmployees, setAllEmployees] = useState([]);
    const [selectedColleagues, setSelectedColleagues] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

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
    
    const fetchRequestedColleagues = async () => {
        const res = await axios.get(`http://localhost:4000/api/questions/${}`);
        const data = res.data;
        setSelectedColleagues(data.feedbackRequests);
        s
    }

  if (loading) {
    <h2>Loading...</h2>;
  }
  return <div>EmployeeList</div>;
};

export default EmployeeList;
