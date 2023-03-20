import './App.css';
import React from "react";

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
      <form>
        <h3>New Employee</h3>
        <label for="first_name">First Name:</label>
        <input type="text" id="first_name" /><br/>
        <label for="last_name">Last Name:</label>
        <input type="text" id="last_name" /><br/>
        <label for="email">Email:</label>
        <input type="email" id="email" /><br/>
        <label for="active">Active:</label>
        <input type="checkbox" id="active" /><br/>
        <label for="age">Age:</label>
        <input type="number" id="age" value="18" /><br/>
        <button id="new-employee-button">Create new employee</button>
       </form>
      </body>
    </div>
  );
}

// This function get all the employees and shows them in the page
function GetEmployees(){
  
  fetch("http://localhost:8000/api/Employees")
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
        
        return 0;
      })
  });


}

export default App;
