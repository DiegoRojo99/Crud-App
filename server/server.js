const express = require('express');
const cors = require('cors');
const app = express();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employeesDatabase"
});

app.use(cors());
app.use(express.json());

app.post('/api/Authenticate', (req, res) => {

  let authJson=req.body;
  let u=authJson.username;
  let p=authJson.password;
  let auth = [u,p];
  
  connection.query("SELECT * FROM users WHERE username=? AND password=?;",auth, 
  (err, results, fields) => {
    if(err) throw err;
      res.send(results);
  });
});

app.post('/api/Employees', (req, res) => {
    var dataEmployee = req.body;
    connection.query("INSERT INTO employees SET?;",dataEmployee, 
    (err, results, fields) => {
      if(err) throw err;
      //SEND JWT
        res.send(results);
    });
  });

  app.get('/api/Skills', (req, res) => {
    connection.query("SELECT * FROM skills;", (err, results, fields) => {
      if(err) throw err;
      res.send(results);
    });
  });

  app.get('/api/Employees', (req, res) => {
    connection.query("SELECT * FROM employees;", (err, results, fields) => {
      if(err) throw err;
      res.send(results);
    });
  });
  app.delete('/api/Employees/:id', function (req, res) {

    var id = req.params.id;
    connection.query("DELETE FROM employees WHERE id=?;", id, (err, results, fields) => {
        if(err) throw err;
        res.send(results);
      });
});


app.put('/api/Employees/:id', function (req, res) {
  
  var dataEmployee = req.body;

  var id = req.params.id;
  var query2 = "first_name"+"='"+dataEmployee.first_name+"', "+"last_name"+"="+" '"+dataEmployee.last_name+"', "+"dob"+"="+" '"+dataEmployee.dob+"', ";
  var query3 = "email"+"="+" '"+dataEmployee.email+"', "+"skill_level"+"="+dataEmployee.skill_level+", "+"active"+"="+dataEmployee.active+", "+"age"+"="+dataEmployee.age;
  var query="UPDATE employees SET "+query2+query3+" WHERE id="+id+";";
  connection.query(query, (err, results, fields) => {
      if(err) throw err;
      res.send(results);
    });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });
