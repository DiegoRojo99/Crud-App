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

app.post('/api/Employees', (req, res) => {
    var employeeData=["Arthur","Kaluma","2003-04-21","arthurkaluma@gmail.com",2,true,19];
    
    connection.query("INSERT INTO employees (first_name,last_name,dob,email,skill_level,active,age) VALUE(?,?,?,?,?,?,?);",employeeData, 
    (err, results, fields) => {
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

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });

