import './App.css';
import {React} from "react";

let actualPage=1, totalPages=1;

function App() {
 
  checksLogin();

  return (
    <div className="App">
      <div className="App-header">
          <div id="app-name">
            <h2 id="home" onClick={listing}> 
            <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em"  >
              <path d="M261.56 101.28a8 8 0 00-11.06 0L66.4 277.15a8 8 0 00-2.47 5.79L63.9 448a32 32 0 0032 32H192a16 16 0 0016-16V328a8 8 0 018-8h80a8 8 0 018 8v136a16 16 0 0016 16h96.06a32 32 0 0032-32V282.94a8 8 0 00-2.47-5.79z" />
              <path d="M490.91 244.15l-74.8-71.56V64a16 16 0 00-16-16h-48a16 16 0 00-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0043 267.56L250.5 69.28a8 8 0 0111.06 0l207.52 198.28a16 16 0 0022.59-.44c6.14-6.36 5.63-16.86-.76-22.97z" />
            </svg>
           </h2>
           <h2 id="h2-name">
            CRUD APP
           </h2>
          </div>
          <div id="user-header">
            <div id="user-buttons">
              <button className="user-button" onClick={showLogin} id="user-login-button">
              <svg fill="currentColor" viewBox="0 0 16 16" height="2em" width="2em">
                <path d="M11 6a3 3 0 11-6 0 3 3 0 016 0z" />
                <path fillRule="evenodd"  d="M0 8a8 8 0 1116 0A8 8 0 010 8zm8-7a7 7 0 00-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 008 1z"/>
              </svg>
              </button>
              <button className="user-button" onClick={logOut} id="user-logout-button">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" height="2em" width="2em">
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M13 12v.01M3 21h18M5 21V5a2 2 0 012-2h7.5M17 13.5V21M14 7h7m-3-3l3 3-3 3" />
              </svg>
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
                  <svg fill="currentColor" viewBox="0 0 16 16" height="2em" width="2em" >
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 100-6 3 3 0 000 6z" />
                    <path fillRule="evenodd" d="M13.5 5a.5.5 0 01.5.5V7h1.5a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0V8h-1.5a.5.5 0 010-1H13V5.5a.5.5 0 01.5-.5z"/>
                  </svg>
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
  if(window.confirm("Do you want to log out?")){
    var date = new Date();
    date.setTime(date.getTime());
    document.cookie="token=''; expires="+date.toGMTString();
    window.location.reload();
  }else{

  }
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
    skillsDataset=[];
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

function GetSkillsEdit(skill_level){
  
  var x = document.getElementById("skill-edit-select");
  x.innerHTML="";

  fetch("http://localhost:8000/api/Skills")
    .then((response) => response.json())
    .then((data) => {

    let skills = data;
    skillsDataset=[];
    skills.map(function(skill) {
      
      let skillId=parseInt(`${skill.skill_id}`, 10)
    
      if(!skillsDataset.hasOwnProperty(skillId)){
        skillsDataset[skillId]=`${skill.name}`;
        var option = document.createElement("option");
        option.text = `${skill.name}`;
        option.value = `${skill.skill_id}`;
        if(skill_level===skillId){
          option.selected="selected";
        }
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

  
  GetSkillsEdit(employeeData.skill_level);
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
