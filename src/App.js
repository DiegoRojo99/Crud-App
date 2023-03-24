import './App.css';
import {React} from "react";

let actualPage=1, totalPages=1;

function App() {
 
  checksLogin();

  return (
    <div className="App">
      <div className="App-header">
          <div id="app-name">
            <h2 onClick={listing}>CRUD APP</h2>
          </div>
          <div id="user-header">
            <div id="user-name">
              <p id="username-p"></p>
            </div>
            <div id="user-buttons">
              <button className="user-button" onClick={showLogin} id="user-login-button">
                Log In
              </button>
              <button className="user-button" onClick={logOut} id="user-logout-button">
                Log Out
              </button>
            </div>
          </div>
      </div>
      <div className="App-body">
        <div id="table-div">
          <table id="employeesTable">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Birth</th>
                <th>Email</th>
                <th>Skill Level</th>
                <th>Active</th>
                <th>Age</th>
                <th colSpan="2">
                  <button onClick={showNewEmployee} id="table-new-employee">
                    New Employee
                  </button>
                </th>
              </tr>
            </thead>
            <tbody id="tableBody">  
            </tbody>
          </table>
          <div id="paginator">
            <div className='paginator-arrow' id="left-paginator-div" onClick={previousPage}>
              <p id="left-paginator-p">&lt;</p>
            </div>
            <div id="paginator-middle">
              
            </div>
            <div className='paginator-arrow' id="left-paginator-div" onClick={nextPage}>
              <p id="left-paginator-p">&gt;</p>
            </div>
          </div>
        </div>
        <form id="employeesForm" onSubmit={createEmployee}>
          <h3>New Employee</h3>
          <label htmlFor="first_name">First Name:</label>
          <input type="text" id="first_name"/><br/>
          <label htmlFor="last_name">Last Name:</label>
          <input type="text" id="last_name" /><br/>
          <label htmlFor="dob">Last Name:</label>
          <input type="date" id="dob" /><br/>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" /><br/>
          <label htmlFor="active">Active:</label>
          <input type="checkbox" id="active" /><br/>
          <label htmlFor="age">Age:</label>
          <input type="number" id="age"/><br/>
          <label htmlFor="skill">Skill:</label>
          <select id="skill-select" name="skill">
          </select><br/>
          <button type='submit' id="new-employee-button">Create new employee</button>
        </form>
        <div id="employeesUpdateDiv">          
          <form id="updateEmployeesForm" onSubmit={updateEmployee}>
            <h3>Update Employee</h3>
            <label htmlFor="first_name">First Name:</label>
            <input type="text" name="first-name-edit" id="first_name-edit"/><br/>
            <label htmlFor="last_name">Last Name:</label>
            <input type="text"name="last-name-edit" id="last_name-edit" /><br/>
            <label htmlFor="dob">Last Name:</label>
            <input type="date" name="dob-edit" id="dob-edit" /><br/>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email-edit" id="email-edit" /><br/>
            <label htmlFor="active">Active:</label>
            <input type="checkbox" name="active-edit" id="active-edit" /><br/>
            <label htmlFor="age">Age:</label>
            <input type="number" name="age-edit" id="age-edit"/><br/>
            <label htmlFor="skill">Skill:</label>
            <select id="skill-edit-select" name="skill">
            </select><br/>
            <input type="hidden" name="id-edit" id="id"/><br/>
            <button type='submit' id="update-employee-button">Update employee</button>
          </form>
        </div>
        <div id="loginDiv">
          <h2>LOGIN PAGE</h2>
          <form onSubmit={makeLogin} id="login-form">
              <label htmlFor="login-username">Username:</label>
              <input id="register-username" name="login-username" type="text"></input><br/>
              <label htmlFor="login-password">Password:</label>
              <input id="register-password" name="login-password" type='password'></input><br/>
              <button className='two-buttons' type='submit'>Login</button>
              <button onClick={register} className='two-buttons'>Register</button>
            </form>
        </div>
      </div>
    </div>
  );
}

function previousPage(){
  if(actualPage>1){
    actualPage--;
    GetEmployees();
  }
}
function nextPage(){
  if(actualPage<totalPages){
    actualPage++;
    GetEmployees();
  }else{
  }
}


function listing(){
  let employeesTable = document.getElementById("table-div");
  let employeesForm = document.getElementById("employeesForm");
  let employeesUpdate = document.getElementById("employeesUpdateDiv");
  let loginDiv = document.getElementById("loginDiv");
  
  employeesTable.style.display="block";
  employeesForm.style.display="none";
  employeesUpdate.style.display="none";
  loginDiv.style.display="none";
}

function logOut(){
  var date = new Date();
  date.setTime(date.getTime());
  document.cookie="token=''; expires="+date.toGMTString();
  window.location.reload();
}


function checksLogin(){
  let cookieActive = document.cookie&& document.cookie.split('=')[1];
  
  if(cookieActive!==""){
    GetEmployees();
  }else{
  }
}

function register(){
  let authData={username:"",password:""};
  authData.username=document.getElementById("register-username").value;
  authData.password=document.getElementById("register-password").value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(authData);

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:8000/api/Authenticate", requestOptions)
    .catch(error => console.log('error', error));    
  }

const makeLogin = (event) => {
  let authData={username:"",password:""};
  authData.username=event.target[0].value;
  authData.password=event.target[1].value;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify(authData);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("http://localhost:8000/api/Authenticate", requestOptions)
    .then(response => response.text())
    .then(result => {
      document.cookie = `token=${result}`;
    })
    .catch(error => console.log('error', error));
  
}

// This function get all the employees and shows them in the page
function GetEmployees(){

  let token =  document.cookie &&  document.cookie.split('=')[1];
  
  let url="http://localhost:8000/api/Employees";
  let fetchData = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json; charset=UTF-8',
      'authorization' : token
    })
  }
  fetch(url, fetchData)
    .then((response) => response.json())
    .then((data) => {

      
      let employees = data;
      let employeesTable = document.getElementById("tableBody");
      employeesTable.innerHTML="";

      let numberEmployee=0;
      let numberEmployeesInPage=0;
      employees.map(function(employee) {
        
        if(numberEmployee+1>((actualPage-1)*5)&&numberEmployee<(actualPage*5)&&numberEmployeesInPage<5){
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
          numberEmployeesInPage++;
          
        }
        numberEmployee++;
          return 0;
      })
      if(numberEmployee%5===0){
        totalPages=Math.floor(numberEmployee/5);
      }else{
        totalPages=Math.floor(numberEmployee/5)+1;
      }
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
      'Content-Type': 'application/json; charset=UTF-8',
      'authorization': (document.cookie &&  document.cookie.split('=')[1])
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
      'Content-Type': 'application/json; charset=UTF-8',
      'authorization': (document.cookie &&  document.cookie.split('=')[1])
    })
  }
  
  fetch(url, fetchData)
    .then(function() {
    })

}

function deleteEmployee(){
  let id=this.value;
  let fetchData = {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json; charset=UTF-8',
      'authorization' : document.cookie &&  document.cookie.split('=')[1]
    })
  }
  fetch('http://localhost:8000/api/Employees/'+id, fetchData).then();
  window.location.reload();
}

function showEditing(evt){
  
 let employeeData=(evt.currentTarget.employee);

  let employeesTable = document.getElementById("table-div");
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
  
  let employeesTable = document.getElementById("table-div");
  let employeesForm = document.getElementById("employeesForm");
  let employeesUpdate = document.getElementById("employeesUpdateDiv");
  let loginDiv = document.getElementById("loginDiv");
  
  employeesTable.style.display="none";
  employeesForm.style.display="block";
  employeesUpdate.style.display="none";
  loginDiv.style.display="none";
  
  GetSkills();
}

function showLogin(){
  
  let employeesTable = document.getElementById("table-div");
  let employeesForm = document.getElementById("employeesForm");
  let employeesUpdate = document.getElementById("employeesUpdateDiv");
  let loginDiv = document.getElementById("loginDiv");
  
  employeesTable.style.display="none";
  employeesForm.style.display="none";
  employeesUpdate.style.display="none";
  loginDiv.style.display="block";
}

export default App;
