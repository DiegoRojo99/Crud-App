import './App.css';
import {React} from "react";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Listing Page
        </p>
      </header>
      <body className="App-body">
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
      <form onSubmit={checkForm}>
        <h3>New Employee</h3>
        <label for="first_name">First Name:</label>
        <input type="text" id="first_name"/><br/>
        <label for="last_name">Last Name:</label>
        <input type="text" id="last_name" /><br/>
        <label for="dob">Last Name:</label>
        <input type="date" id="dob" /><br/>
        <label for="email">Email:</label>
        <input type="email" id="email" /><br/>
        <label for="active">Active:</label>
        <input type="checkbox" id="active" /><br/>
        <label for="age">Age:</label>
        <input type="number" id="age"/><br/>
        <button type='submit' id="new-employee-button">Create new employee</button>
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
        let updateTD = document.createElement('td');
        let deleteTD = document.createElement('td');

        employeeID.innerHTML = `${employee.id}`;
        firstName.innerHTML = `${employee.first_name}`;
        lastName.innerHTML = `${employee.last_name}`;
        var d = new Date(`${employee.dob}`);
        dob.innerHTML = d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();
        email.innerHTML = `${employee.email}`;
        skillLevel.innerHTML = `${employee.skill_level}`;
        if(`${employee.active}`.toString()==='0'){
          active.innerHTML = 'NO';
        }else{
          active.innerHTML = 'YES';
        }
        age.innerHTML = `${employee.age}`;

        age.innerHTML = `${employee.age}`;

        tr.appendChild(employeeID);
        tr.appendChild(firstName);
        tr.appendChild(lastName);
        tr.appendChild(dob);
        tr.appendChild(email);
        tr.appendChild(skillLevel);
        tr.appendChild(active);
        tr.appendChild(age);

        let updateButton = document.createElement('button');
        updateButton.id="updateButton";
        updateButton.innerHTML="UPDATE";
        let deleteButton = document.createElement('button');
        deleteButton.id="deleteButton";
        deleteButton.innerHTML="DELETE";
        deleteButton.value= `${employee.id}`;
        deleteButton.addEventListener('click',deleteEmployee, false);
        updateTD.appendChild(updateButton);
        deleteTD.appendChild(deleteButton);
        tr.appendChild(updateTD);
        tr.appendChild(deleteTD);

        employeesTable.appendChild(tr);
        
        return 0;
      })
  });


}

const checkForm = (event) => {

  const newEmployeeData={
    first_name:"",
    last_name:"",
    dob:"2022-01-01",
    email:"",
    skill_level:0,
    active:false,
    age:0,
  }
  
  newEmployeeData.first_name = event.target[0].value;
  newEmployeeData.last_name = event.target[1].value;
  newEmployeeData.dob = event.target[2].value;
  newEmployeeData.email = event.target[3].value;
  if(event.target[4].value === true){
    newEmployeeData.active = 1;
  }else{
    newEmployeeData.active = 0;
  }
  newEmployeeData.age = event.target[5].value;


  let url = "http://localhost:8000/api/Employees"
  let fetchData = {
    method: 'POST',
    body: JSON.stringify(newEmployeeData),
    headers: new Headers({
      'Content-Type': 'application/json; charset=UTF-8'
    })
  }
  
  fetch(url, fetchData)
    .then(function() {
    });

}

function deleteEmployee(){
  let id=this.value;
  fetch('http://localhost:8000/api/Employees/'+id, { method: 'DELETE' }).then();
  window.location.reload();
}

export default App;
