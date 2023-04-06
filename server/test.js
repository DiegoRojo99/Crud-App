const express = require('express');
const { async } = require('q');
const app = express();
app.use(express.json());
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
let authToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImEiLCJpYXQiOjE2ODA3OTM1NjgsImV4cCI6MTY4MDc5NTM2OH0.d8jpcU5PeXiJapxstC5zucifeYq9c6SsVxVkgkR5Id4";
describe('Get employees test suite', () => {
    it('Error if no auth given', async() => {
        let url="http://localhost:8000/api/Employees";
        let fetchData = {
            method: 'GET',
            headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
            })
        }
        fetch(url, fetchData).then((response) => {
            expect(response.status).toBe(401)});
    });
    
    it('Return the exact thing is in the database', async() => {
        
    let url="http://localhost:8000/api/Employees";
    let fetchData = {
        method: 'GET',
        headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization' : authToken
        })
    }
    fetch(url, fetchData)
        .then((response) => response.json())
        .then((data) => expect(data).toEqual(employeesDatabase))

    });

    it('Check if there are employees and they have all attributes', async() => {
        let url="http://localhost:8000/api/Employees";
        let fetchData = {
            method: 'GET',
            headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization' : authToken
            })
        }
        fetch(url, fetchData)
            .then((response) => response.json())
            .then((data) => {
                expect(Array.isArray(data)).toBe(true);
                expect(data.length).toBeGreaterThan(0);
                
                data.forEach((employee) => {
                    expect(employee.id).toBeDefined();
                    expect(employee.first_name).toBeDefined();
                    expect(employee.last_name).toBeDefined();
                    expect(employee.dob).toBeDefined();
                    expect(employee.email).toBeDefined();
                    expect(employee.skill_level).toBeDefined();
                    expect(employee.active).toBeDefined();
                    expect(employee.age).toBeDefined();
                });
            })
    });
});

describe("Auth login", () => {
    
    it('Auth works with correct login', async() => {
    
        let authData={username:"a",password:"a"};
        var requestOptions = {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(authData)
        };
        
        fetch("http://localhost:8000/api/Authenticate", requestOptions)
            .then((response) => response.text())
            .then((data) => expect(data).toContain("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"));
    
        });
})