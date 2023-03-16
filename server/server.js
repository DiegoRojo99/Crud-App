const express = require('express');
const cors = require('cors');
const app = express();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employeesDatabase"
});

function getEmployees(){
    var data;
    con.connect(function(err) {
        if (err) throw err;
          con.query("SELECT * FROM employees", function (err, result, fields) {
            if (err) {
                throw err;
            } else{
                //TODO Handle data
            }
            
            
          });
      });
      return data;
}

app.use(cors());
app.use(express.json());

app.get('/message', (req, res) => {
    res.json({ message: "Hello server!" });
});


app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });

var users = {};

app.get("/employees", (req, res) => {
 try {
    getEmployees();
    res.status(200).json({
        getEmployees
    }); 
 } catch (error) {
    res.status(500).json({
    message: "Failed to retrieve all users",
 });
}
});

app.post("/create", (req, res) => {
    // Check if request body is empty
    if (!Object.keys(req.body).length) {
        return res.status(400).json({
            message: "Request body cannot be empty",
        });
    }
    // Use object destructuring to get name and age
    const { name, age } = req.body;
    if (!name || !age) {
        res.status(400).json({
            message: "Ensure you sent both name and age",
        });
    }
    const newUser = {
       id: users.length + 1,
       name,
       age,
    };
    try {
       users.push(newUser);
       res.status(201).json({
         message: "Successfully created a new user",
       });
    } catch (error) {
       res.status(500).json({
         message: "Failed to create user",
       });
    }
    });