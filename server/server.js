const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});



app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });

const users = [{
    id: 1,
    name: "Jane Doe",
    age: "22",
    },
    {
    id: 2,
    name: "John Doe",
    age: "31",
}];

app.get("/employees", (req, res) => {
 try {
    res.status(200).json({
    users
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