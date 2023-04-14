const express = require("express");
const cors = require("cors");
const app = express();
var mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 1;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const NodeCache = require("node-cache");
const cache = new NodeCache();

let skillsNumber=0;
const redis = require('redis');
const redisClient = redis.createClient({
  host: 'redis',
  port: 6379
});

//This sets up the connection with the mySQL database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employeesDatabase",
});

app.use(cors());
app.use(express.json());

//This method generates the JWT token used later for authentication
function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}
//This method authenticates the token that is received, and makes sure is valid
//It is called in all API routes when a user is trying to interact with the employees table
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    } else {
      req.user = user;
      next();
    }
  });
}
//Gets the user data and sends to checkusername function
const register = async function (req, res) {
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  const newId = uuidv4();
  let user = {
    id: newId,
    username: req.body.username,
    password: encryptedPassword,
  };

  checkUsername(user.username, res, user);
};
//Checks if the username is used in the database, and if not it registers the user
function checkUsername(usernameToFind, res, user) {
  //Check if username is used already in the database
  connection.query(
    "SELECT * FROM users WHERE username=?;",
    usernameToFind,
    (err, results) => {
      if (err) throw err;
      if (results.length === 0) {
        connection.query(
          "INSERT INTO users SET?;",
          user,
          (err, results, fields) => {
            if (err) {
              throw err;
            } else {
              res.send(results);
            }
          }
        );
      } else {
        //Username is already in database
        res.sendStatus(409);
      }
    }
  );
}
//Checks that the given password matches the encrypted one in the database
const checkEncryptedPassword = async function (req, res) {
  let authJson = req.body;
  let u = authJson.username;
  let p = authJson.password;
  let passwords = [];
  let found = false;

  connection.query(
    "SELECT * FROM users WHERE username=?;",
    u,
    async function (err, results, fields) {
      if (err) {
        throw err;
      } else if (results.length === 0) {
        //No user found
        res.sendStatus(401);
      } else {
        results.map(function (user) {
          let passwordDB = `${user.password}`;
          passwords.push(passwordDB);
        });
        for (let index = 0; index < passwords.length; index++) {
          const password = passwords[index];
          const comparison = await bcrypt.compare(p, password);
          if (comparison) {
            const token = generateAccessToken({ username: u });
            res.send(token);
            found = true;
          } else {
            if (index + 1 === passwords.length && !found) {
              res.sendStatus(401);
            }
          }
        }
      }
    }
  );
};

//API call for the user login
app.post("/api/Authenticate", (req, res) => {
  checkEncryptedPassword(req, res);
});

//API call for the user register
app.put("/api/Authenticate", (req, res) => {
  register(req, res);
});

//API call for inserting a new employee
app.post("/api/Employees", authenticateToken, (req, res) => {
  var dataEmployee = req.body;
  dataEmployee.id = uuidv4();
  connection.query(
    "INSERT INTO employees SET?;",
    dataEmployee,
    (err, results, fields) => {
      if (err) {
        throw err;
      } else {
        res.insertId = dataEmployee.id;
        res.status(201).send(dataEmployee.id);
      }
    }
  );
});

let socketOpened=false;
async function loadSkills() {
  connection.query("SELECT * FROM skills;", (err, results) => {
    if (err) {
      throw err;
    } else {
      skillsNumber=results.length
    }
  });
    if(!socketOpened){
      await redisClient.connect();
      socketOpened=true;
    }
    let value = redisClient.lRange("skills",0,-1);
    value.then(function(res) {
      if (res.length !== skillsNumber) {
        console.log("Skills retrieved from database");
        connection.query("SELECT * FROM skills;", (err, results) => {
          if (err) {
            throw err;
          } else {
            for (let index = 0; index < results.length; index++) {
              const skill = results[index];
              redisClient.lPush("skills",JSON.stringify(skill));
            }
          }
        });
      }else{
        console.log("Not matching");
      }
    });
}
loadSkills();

app.get("/api/Skills/:id", (req, res) => {
  var id = req.params.id;
  
  let allSkills = redisClient.lRange("skills",0,-1);
  allSkills.then(function(skillsFounded){
    for (let index = 0; index < skillsNumber; index++) {
      const skill = skillsFounded[index];
      let skillJSON = JSON.parse(skill);
      if(skillJSON.id===id){
        res.send(skillJSON.name);
      }
    }
  })
});

//API call for getting the skills
app.get("/api/Skills", (req, res) => {
  let skillsToSend=[];
  let allSkills = redisClient.lRange("skills",0,-1);
  allSkills.then(function(skillsFounded){
    for (let index = 0; index < skillsNumber; index++) {
      const skill = skillsFounded[index];
      let skillJSON = JSON.parse(skill);
      skillsToSend.push(skillJSON);
    }
    res.send(skillsToSend);
  })
});

//API call for getting the employees
app.get("/api/Employees", authenticateToken, (req, res) => {
  connection.query("SELECT * FROM employees;", (err, results) => {
    if (err) {
      throw err;
    } else {
      res.send(results);
    }
  });
});

//API call for deleting an employee
app.delete("/api/Employees/:id", authenticateToken, function (req, res) {
  var id = req.params.id;
  connection.query("DELETE FROM employees WHERE id=?;", id, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.sendStatus(200);
    }
  });
});

//API call for updating an employee
app.put("/api/Employees/:id", authenticateToken, function (req, res) {
  var dataEmployee = req.body;
  var id = req.params.id;
  dataEmployee.id = id;
  var query2 =
    "first_name" +
    "='" +
    dataEmployee.first_name +
    "', " +
    "last_name" +
    "=" +
    " '" +
    dataEmployee.last_name +
    "', " +
    "dob" +
    "=" +
    " '" +
    dataEmployee.dob +
    "', ";
  var query3 =
    "email" +
    "=" +
    " '" +
    dataEmployee.email +
    "', " +
    "skill_level" +
    "='" +
    dataEmployee.skill_level +
    "', " +
    "active" +
    "=" +
    dataEmployee.active +
    ", " +
    "age" +
    "=" +
    dataEmployee.age;
  var query =
    "UPDATE employees SET " + query2 + query3 + " WHERE id='" + id + "';";
  connection.query(query, (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(dataEmployee);
    }
  });
});

//Server listening
app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});

exports.app = app;
