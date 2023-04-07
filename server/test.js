//Imports needed
const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();

//Variables needed for tests
let authToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImEiLCJpYXQiOjE2ODA4Njc4NjYsImV4cCI6MTY4MDg2OTY2Nn0.8tmdG85ZdQzG84b3I4Jz70qvp766OuHoQbEPPOpYTeg";
let employeeID="39e7b407-4c7d-4e2b-8f4b-2e40f8b5c37a";
let deleteEmployeeID="021b7a36-ecbf-46e3-9ee2-76737372660d";
const newEmployeeData={
  first_name:"Test",
  last_name:"Test",
  dob:"2022-01-01",
  email:"Test@Test.com",
  skill_level:"d3bfedba-ce42-11ed-9e71-025041000001",
  active:1,
  age:100
}

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
            .then((data) => {
                expect(data).toContain("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
            });
    });
    it('Error with incorrect user', async() => {
        let authData={username:"aaaaaaaaaaa",password:"a"};
        var requestOptions = {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(authData)
        };
        fetch("http://localhost:8000/api/Authenticate", requestOptions)
            .then((response) => {
                expect(response.status).toBe(401);
            });
    });
    it('Error with incorrect password', async() => {
        let authData={username:"a",password:"aasasasasasas"};
        var requestOptions = {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(authData)
        };
        fetch("http://localhost:8000/api/Authenticate", requestOptions)
            .then((response) => {
                expect(response.status).toBe(401);
            });
    });
})

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

    it('Error if JWT token is expired', async() => {
        let url="http://localhost:8000/api/Employees";
        let fetchData = {
            method: 'GET',
            headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImEiLCJpYXQiOjE2ODA3OTM1NjgsImV4cCI6MTY4MDc5NTM2OH0.d8jpcU5PeXiJapxstC5zucifeYq9c6SsVxVkgkR5Id4"
            })
        }
        fetch(url, fetchData).then((response) => {
            expect(response.status).toBe(401);
        });
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

describe('Update employee test suite', () => {
    it('Error if no auth given', async() => {
        let url="http://localhost:8000/api/Employees/"+employeeID;
        let fetchData = {
            method: 'PUT',
            body: JSON.stringify(newEmployeeData),
            headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
            })
        }
        fetch(url, fetchData).then((response) => {
            expect(response.status).toBe(401)});
    });

    it('Error if JWT token is expired', async() => {
        let url="http://localhost:8000/api/Employees/"+employeeID;
        let fetchData = {
            method: 'PUT',
            body: JSON.stringify(newEmployeeData),
            headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImEiLCJpYXQiOjE2ODA3OTM1NjgsImV4cCI6MTY4MDc5NTM2OH0.d8jpcU5PeXiJapxstC5zucifeYq9c6SsVxVkgkR5Id4"
            })
        }
        fetch(url, fetchData).then((response) => {
            expect(response.status).toBe(401);
        });
    });

    it('Check if the updated employee has all attributes and equals the data introduced', async() => {
        
        let url="http://localhost:8000/api/Employees/"+employeeID;
        let fetchData = {
            method: 'PUT',
            body: JSON.stringify(newEmployeeData),
            headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization' : authToken
            })
        }
        newEmployeeData.id=employeeID;
        fetch(url, fetchData)
            .then((response) => response.json())
            .then((employee) => {               
                expect(employee.id).toBeDefined();
                expect(employee.first_name).toBeDefined();
                expect(employee.last_name).toBeDefined();
                expect(employee.dob).toBeDefined();
                expect(employee.email).toBeDefined();
                expect(employee.skill_level).toBeDefined();
                expect(employee.active).toBeDefined();
                expect(employee.age).toBeDefined();
                expect(employee).toEqual(newEmployeeData);
            })
    });
});

describe('Delete employee test suite', () => {
    it('Error if no auth given', async() => {
        let url="http://localhost:8000/api/Employees/"+deleteEmployeeID;
        let fetchData = {
            method: 'DELETE',
            body: JSON.stringify(newEmployeeData),
            headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
            })
        }
        fetch(url, fetchData).then((response) => {
            expect(response.status).toBe(401)});
    });

    it('Error if JWT token is expired', async() => {
        let url="http://localhost:8000/api/Employees/"+deleteEmployeeID;
        let fetchData = {
            method: 'DELETE',
            body: JSON.stringify(newEmployeeData),
            headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImEiLCJpYXQiOjE2ODA3OTM1NjgsImV4cCI6MTY4MDc5NTM2OH0.d8jpcU5PeXiJapxstC5zucifeYq9c6SsVxVkgkR5Id4"
            })
        }
        fetch(url, fetchData).then((response) => {
            expect(response.status).toBe(401);
        });
    });

    it('Delete employee sends ok status code', async() => {
        let url="http://localhost:8000/api/Employees/"+deleteEmployeeID;
        let fetchData = {
            method: 'DELETE',
            headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization' : authToken
            })
        }
        fetch(url, fetchData)
            .then((response) => {
                expect(response.status).toBe(200);
            });
    });
});

describe('Create employee test suite', () => {
    it('Error if no auth given', async() => {
        let url="http://localhost:8000/api/Employees";
        let fetchData = {
            method: 'POST',
            body: JSON.stringify(newEmployeeData),
            headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
            })
        }
        fetch(url, fetchData).then((response) => {
            expect(response.status).toBe(401)});
    });

    it('Error if JWT token is expired', async() => {
        let url="http://localhost:8000/api/Employees";
        let fetchData = {
            method: 'POST',
            body: JSON.stringify(newEmployeeData),
            headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImEiLCJpYXQiOjE2ODA3OTM1NjgsImV4cCI6MTY4MDc5NTM2OH0.d8jpcU5PeXiJapxstC5zucifeYq9c6SsVxVkgkR5Id4"
            })
        }
        fetch(url, fetchData).then((response) => {
            expect(response.status).toBe(401);
        });
    });

    it('Check if the employee is created and send the id back', async() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", authToken);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "first_name": "New",
        "last_name": "Test",
        "dob": "2022-01-01",
        "email": "Test@Test.com",
        "skill_level": "d3bfedba-ce42-11ed-9e71-025041000001",
        "active": 1,
        "age": 100
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8000/api/Employees", requestOptions)
        .then(response => response.text())
        .then(result => {
            expect(result.length).toBe(36);
            expect(result).toContain("-");
        });
        
    });
});
