import axios from "axios";
import { useEffect, useState } from "react";

import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [questionData, setQuestionData] = useState([])

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

  const fetchColleagueList = async () => {
    setIsLoading(true);
    const res = await axios.get("http://localhost:4000/api/questions");
    const questionData = res.data;
    setQuestionData(questionData);
    setIsLoading(false)
  }

  console.log(questionData)
  return (
    <div className="App">
      <h2>Employees List</h2>
      <ul>
        {data.map((user) => {
          return <li key={user.firstName} onClick={fetchColleagueList}>{user.firstName} {user.lastName}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
