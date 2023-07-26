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
  });
  return (
    <div className="App">
      <h2>Employees List</h2>
    </div>
  );
}

export default App;
