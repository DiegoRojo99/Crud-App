import './App.css';
import {React} from "react";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p id="header-p">
          Listing Page
        </p>
        <button id="new-employee-header" onClick={showNewEmployee}>
          New Employee
        </button>
        <button id="login-header" onClick={showLogin}>
          Login
        </button>
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
        <form id="employeesForm" onSubmit={createEmployee}>
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
          <label for="skill">Skill:</label>
          <select id="skill-select" name="skill">
          </select><br/>
          <button type='submit' id="new-employee-button">Create new employee</button>
        </form>
        <div id="employeesUpdateDiv">          
          <form id="updateEmployeesForm" onSubmit={updateEmployee}>
            <h3>Update Employee</h3>
            <label for="first_name">First Name:</label>
            <input type="text" name="first-name-edit" id="first_name"/><br/>
            <label for="last_name">Last Name:</label>
            <input type="text"name="last-name-edit" id="last_name" /><br/>
            <label for="dob">Last Name:</label>
            <input type="date" name="dob-edit" id="dob" /><br/>
            <label for="email">Email:</label>
            <input type="email" name="email-edit" id="email" /><br/>
            <label for="active">Active:</label>
            <input type="checkbox" name="active-edit" id="active" /><br/>
            <label for="age">Age:</label>
            <input type="number" name="age-edit" id="age"/><br/>
            <label for="skill">Skill:</label>
            <select id="skill-edit-select" name="skill">
            </select><br/>
            <input type="hidden" name="id-edit" id="id"/><br/>
            <button type='submit' id="update-employee-button">Update employee</button>
          </form>
        </div>
        <div id="loginDiv">
          <h2>LOGIN PAGE</h2>
          <form id="login-form">
              <label>Username:</label>
              <input type="text"></input><br/>
              <label>Password:</label>
              <input type='password'></input><br/>
              <button type='submit'>Login</button>
            </form>
        </div>
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

        
        //HERE GETS SKILL ID AND SHOWS NAME

        fetch("http://localhost:8000/api/Skills")
        .then((response) => response.json())
        .then((data) => {
    
        let skills = data;
        skills.map(function(skill) {
          
          let skillId=`${skill.skill_id}`;
          if(skillId===`${employee.skill_level}`){
            skillLevel.innerHTML = `${skill.name}`;
          }
          return 0;
        })
      });


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
        updateButton.employee = employee;
        updateButton.value= `${employee.id}`;
        updateButton.addEventListener('click',showEditing, false);
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

let skillsDataset={};

function GetSkills(){
  
  var x = document.getElementById("skill-select");
  x.innerHTML="";

  fetch("http://localhost:8000/api/Skills")
    .then((response) => response.json())
    .then((data) => {

    let skills = data;
    skills.map(function(skill) {
      
      let skillId=`${skill.skill_id}`;
    
      if(!skillsDataset.hasOwnProperty(skillId)){
        skillsDataset[skillId]=`${skill.name}`;
        var option = document.createElement("option");
        option.text = `${skill.name}`;
        option.value = `${skill.skill_id}`;
        x.add(option);
      }
      
      return 0;
    })
    
      
  });


}

function GetSkillsEdit(){
  
  var x = document.getElementById("skill-edit-select");
  x.innerHTML="";

  fetch("http://localhost:8000/api/Skills")
    .then((response) => response.json())
    .then((data) => {

    let skills = data;
    skills.map(function(skill) {
      
      let skillId=`${skill.skill_id}`;
    
      if(!skillsDataset.hasOwnProperty(skillId)){
        skillsDataset[skillId]=`${skill.name}`;
        var option = document.createElement("option");
        option.text = `${skill.name}`;
        option.value = `${skill.skill_id}`;
        x.add(option); 
      }
      
      return 0;
    })
    
      
  });


}

const createEmployee = (event) => {

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
  if(event.target[4].checked === true){
    newEmployeeData.active = 1;
  }else{
    newEmployeeData.active = 0;
  }
  newEmployeeData.age = event.target[5].value;
  newEmployeeData.skill_level = event.target[6].value;


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

const updateEmployee = (event) => {

  const newEmployeeData={
    first_name:"",
    last_name:"",
    dob:"2022-01-01",
    email:"",
    skill_level:0,
    active:false,
    age:0,
    id:0,
  }
  
  newEmployeeData.first_name = event.target[0].value;
  newEmployeeData.last_name = event.target[1].value;
  newEmployeeData.dob = event.target[2].value;
  newEmployeeData.email = event.target[3].value;
  if(event.target[4].checked === true){
    newEmployeeData.active = true;
  }else{
    newEmployeeData.active = false;
  }
  newEmployeeData.age = event.target[5].value;
  newEmployeeData.skill_level = event.target[6].value;
  let id = event.target[7].value;

  let url = "http://localhost:8000/api/Employees/"+id;
  let fetchData = {
    method: 'PUT',
    body: JSON.stringify(newEmployeeData),
    headers: new Headers({
      'Content-Type': 'application/json; charset=UTF-8'
    })
  }
  
  fetch(url, fetchData)
    .then(function() {
    })

}

function deleteEmployee(){
  let id=this.value;
  fetch('http://localhost:8000/api/Employees/'+id, { method: 'DELETE' }).then();
  window.location.reload();
}

function showEditing(evt){
  
 let employeeData=(evt.currentTarget.employee);

  let employeesTable = document.getElementById("employeesTable");
  let employeesForm = document.getElementById("employeesForm");
  let employeesUpdate = document.getElementById("employeesUpdateDiv");

  employeesTable.style.display="none";
  employeesForm.style.display="none";
  employeesUpdate.style.display="block";
  
  document.getElementsByName('first-name-edit')[0].value=employeeData.first_name;
  document.getElementsByName('last-name-edit')[0].value=employeeData.last_name;
  document.getElementsByName('email-edit')[0].value=employeeData.email;
  document.getElementsByName('age-edit')[0].value=employeeData.age;
  document.getElementsByName('id-edit')[0].value=employeeData.id;
  
  var d = new Date(employeeData.dob);
  let year=d.getFullYear();
  let month=d.getMonth()+1;
  if(month<10){
    month='0'+month;
  }
  let day=d.getDate();
  if(day<10){
    day='0'+day;
  }
  let dobEdited =year+'-'+month+'-'+day;
  document.getElementsByName('dob-edit')[0].value=dobEdited;

  if(employeeData.active===1){
    document.getElementsByName('active-edit')[0].checked=true;
  }

  document.getElementsByName('first-name-edit')[0].default=employeeData.first_name;
  document.getElementsByName('last-name-edit')[0].default=employeeData.last_name;
  document.getElementsByName('dob-edit')[0].default=employeeData.dob;
  document.getElementsByName('email-edit')[0].default=employeeData.email;
  document.getElementsByName('age-edit')[0].default=employeeData.age;

  
  GetSkillsEdit();
}

function showNewEmployee(){
  
  let employeesTable = document.getElementById("employeesTable");
  let employeesForm = document.getElementById("employeesForm");
  let employeesUpdate = document.getElementById("employeesUpdateDiv");
  let newButton = document.getElementById("new-employee-header");
  let header = document.getElementById("header-p");
  
  employeesTable.style.display="none";
  employeesForm.style.display="block";
  employeesUpdate.style.display="none";
  newButton.style.display="none";
  header.style.display="none";
  
  GetSkills();
}

function showLogin(){
  
  let employeesTable = document.getElementById("employeesTable");
  let employeesForm = document.getElementById("employeesForm");
  let employeesUpdate = document.getElementById("employeesUpdateDiv");
  let newButton = document.getElementById("new-employee-header");
  let loginHeader = document.getElementById("login-header");
  let header = document.getElementById("header-p");
  let loginDiv = document.getElementById("loginDiv");
  
  employeesTable.style.display="none";
  employeesForm.style.display="none";
  employeesUpdate.style.display="none";
  newButton.style.display="none";
  loginHeader.style.display="none";
  header.style.display="none";
  loginDiv.style.display="block";
}

export default App;
