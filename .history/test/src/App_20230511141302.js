import axios from "axios";
import { useEffect, useState } from "react";

import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const res = await axios.get("http://localhost:4000/api/users");
      const data = res.data;
      setData(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  console.log(data)
  return (
    <div className="App">
      <h2>Employees List</h2>
      <ul>
        {data.map((user) => {
          return <li key={user.firstName}>{user.firstName} {user.lastName}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
