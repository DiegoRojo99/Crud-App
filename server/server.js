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
    var dataEmployee = req.body;
    
    connection.query("INSERT INTO employees SET?;",dataEmployee, 
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
  app.delete('/api/Employees/:id', function (req, res) {

    var id = req.params.id;
    console.log(id);
    connection.query("DELETE FROM employees WHERE id=?;", id, (err, results, fields) => {
        if(err) throw err;
        res.send(results);
      });
});


app.put('/api/Employees/:id', function (req, res) {

  var id = req.params.id;
  var query2 = "first_name"+"="+" 'fn', "+"last_name"+"="+" 'ln', "+"dob"+"="+" '2022-01-01', ";
  var query3 = "email"+"="+" 'fnln@gmail.com', "+"skill_level"+"="+"20, "+"active"+"="+"1, "+"age"+"="+"1";
  var query="UPDATE employees SET "+query2+query3+" WHERE id="+id+";";
  connection.query(query, (err, results, fields) => {
      if(err) throw err;
      res.send(results);
    });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });
