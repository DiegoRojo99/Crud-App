const server = require('./server');
const request = require('supertest');
require('dotenv').config();
let employeesDatabase=[
    {
        "id": "39e7b407-4c7d-4e2b-8f4b-2e40f8b5c37a",
        "first_name": "Mitch",
        "last_name": "Ballock",
        "dob": "1997-11-08T00:00:00.000Z",
        "email": "mitch24@gmail.com",
        "skill_level": "d3bff245-ce42-11ed-9e71-025041000001",
        "active": 1,
        "age": 25
    },
    {
        "id": "61aedc6b-bca4-4729-9c4c-21337728dc90",
        "first_name": "Marcus",
        "last_name": "Foster",
        "dob": "1995-08-12T23:00:00.000Z",
        "email": "marcusfoster@gmail.com",
        "skill_level": "d3bff159-ce42-11ed-9e71-025041000001",
        "active": 0,
        "age": 27
    },
    {
        "id": "76225827-c5c0-4bcd-9e21-18bfcbb8c0b5",
        "first_name": "Arthur",
        "last_name": "Kaluma",
        "dob": "2000-04-20T23:00:00.000Z",
        "email": "arthurKaluma@gmail.com",
        "skill_level": "d3bff245-ce42-11ed-9e71-025041000001",
        "active": 1,
        "age": 22
    },
    {
        "id": "7f652423-af35-4c26-bb5d-27b7c95cf3f2",
        "first_name": "Ryan",
        "last_name": "Kalkbrenner",
        "dob": "2001-12-13T00:00:00.000Z",
        "email": "ryankalk11@gmail.com",
        "skill_level": "d3bfedba-ce42-11ed-9e71-025041000001",
        "active": 1,
        "age": 21
    },
    {
        "id": "9bd71fc7-aa8a-4f40-8332-f6d63ed1e18e",
        "first_name": "Trey",
        "last_name": "Alexander",
        "dob": "2002-05-24T23:00:00.000Z",
        "email": "treyalexander23@gmail.com",
        "skill_level": "d3bff159-ce42-11ed-9e71-025041000001",
        "active": 1,
        "age": 20
    },
    {
        "id": "ae714672-b72a-4488-9504-c5f07a3e7960",
        "first_name": "Kyle",
        "last_name": "Korver",
        "dob": "1980-04-19T23:00:00.000Z",
        "email": "kylekorver@gmail.com",
        "skill_level": "d3bff159-ce42-11ed-9e71-025041000001",
        "active": 0,
        "age": 42
    },
    {
        "id": "e40a59f3-a052-4be6-9717-21c1707e8a0c",
        "first_name": "Ryan",
        "last_name": "Nembhard",
        "dob": "2000-02-22T00:00:00.000Z",
        "email": "nembhard2@gmail.com",
        "skill_level": "d3bfedba-ce42-11ed-9e71-025041000001",
        "active": 1,
        "age": 23
    },
    {
        "id": "e462cd74-7670-49ff-baa0-1bf3a47a180c",
        "first_name": "Doug",
        "last_name": "McDermott",
        "dob": "1986-04-26T23:00:00.000Z",
        "email": "mcdermott@gmail.com",
        "skill_level": "d3bff159-ce42-11ed-9e71-025041000001",
        "active": 0,
        "age": 36
    }
];

describe('Employees test suite', () => {
    it('tests get /employees endpoint with no auth', async() => {
        const response = await request(server.app).get("/api/Employees");
        expect(response.statusCode).toBe(401);
    });
    
    it('tests get /employees endpoint with auth', async() => {
        
    let url="http://localhost:8000/api/Employees";
    let fetchData = {
        method: 'GET',
        headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImEiLCJpYXQiOjE2ODA3ODkxMzcsImV4cCI6MTY4MDc5MDkzN30.TbgGKjIujUbT46S5z6gkUwZNe45QEgqJ6_yO0rSM6KI"
        })
    }
    fetch(url, fetchData)
        .then((response) => response.json())
        .then((data) => expect(data).toEqual(employeesDatabase))

    });

    // Insert other tests below this line

    // Insert other tests above this line
});