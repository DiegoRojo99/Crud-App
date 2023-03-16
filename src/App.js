import './App.css';
import React, { useState, useEffect } from "react";

function LoginApp() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          CRUD operations
        </p>
      </header>
    </div>
  );
}

//FillEmployee
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Listing Page
        </p>
      </header>
      <body class="App-body">
      <table>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Skill Level</th>
            <th>Active</th>
            <th>Age</th>
          </tr>
          {FillEmployee()}
        </table>
        {HiFromServer()}
      </body>
    </div>
  );
}

function HiFromServer(){
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

function FillEmployee() {
  return(
    <tr>
      <td>100</td>
      <td>First Name</td>
      <td>Last Name</td>
      <td>Date of Birtd</td>
      <td>Email</td>
      <td>Skill Level</td>
      <td>Active</td>
      <td>Age</td>
    </tr>
  )
}

export default App;
