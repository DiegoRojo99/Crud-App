import './App.css';
import React, { useState, useEffect } from "react";

var employeesData;

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
      <table id="employeesTable">
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
          {GetEmployees()}
        </table>
      </body>
    </div>
  );
}

function GetEmployees(){
  
  
  
  fetch("http://localhost:8000/employees")
    .then((response) => response.json())
    .then((data) => {

      let employees = data;
      let employeesTable = document.getElementById("employeesTable");
      employeesTable.innerHTML="<table id='employeesTable'><tr><th>Employee ID</th><th>First Name</th><th>Last Name</th><th>Date of Birth</th><th>Email</th><th>Skill Level</th><th>Active</th><th>Age</th></tr></table>";

      employees.map(function(employee) {
        let tr = document.createElement('tr');
        let employeeID = document.createElement('td');
        let firstName = document.createElement('td');
        let lastName = document.createElement('td');
        let dob = document.createElement('td');
        let email = document.createElement('td');
        let skillLevel = document.createElement('td');
        let active = document.createElement('td');
        let age = document.createElement('td');

        employeeID.innerHTML = `${employee.id}`;
        firstName.innerHTML = `${employee.first_name}`;
        lastName.innerHTML = `${employee.last_name}`;
        dob.innerHTML = `${employee.dob}`;
        email.innerHTML = `${employee.email}`;
        skillLevel.innerHTML = `${employee.skill_level}`;
        active.innerHTML = `${employee.active}`;
        age.innerHTML = `${employee.age}`;

        tr.appendChild(employeeID);
        tr.appendChild(firstName);
        tr.appendChild(lastName);
        tr.appendChild(dob);
        tr.appendChild(email);
        tr.appendChild(skillLevel);
        tr.appendChild(active);
        tr.appendChild(age);

        employeesTable.appendChild(tr);
      })
  });


}

export default App;
