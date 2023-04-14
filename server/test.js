//Imports needed
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
app.use(express.json());
require("dotenv").config();

//Variables needed for tests
let authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImEiLCJpYXQiOjE2ODE0NzA5NDUsImV4cCI6MTY4MTQ3Mjc0NX0.sAZ86NtBp8nmDRC27PTpXC6ESLDZYUbRmR_sY_5exSo";
let employeeID = "1fb61b04-0878-458e-8c33-403d6996593e";
let deleteEmployeeID = "61aedc6b-bca4-4729-9c4c-21337728dc90";
const newEmployeeData = {
  first_name: "Test",
  last_name: "Test",
  dob: "2022-01-01",
  email: "Test@Test.com",
  skill_level: "d3bfedba-ce42-11ed-9e71-025041000001",
  active: 1,
  age: 100,
};

describe("Auth login", () => {
  it("Auth works with correct login", async () => {
    let authData = { username: "a", password: "a" };
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authData),
    };
    fetch("http://localhost:8000/api/Authenticate", requestOptions)
      .then((response) => response.text())
      .then((data) => {
        expect(data).toContain("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
      });
  });
  it("Error with incorrect user", async () => {
    let authData = { username: "aaaaaaaaaaa", password: "a" };
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authData),
    };
    fetch("http://localhost:8000/api/Authenticate", requestOptions).then(
      (response) => {
        expect(response.status).toBe(401);
      }
    );
  });
  it("Error with incorrect password", async () => {
    let authData = { username: "a", password: "aasasasasasas" };
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authData),
    };
    fetch("http://localhost:8000/api/Authenticate", requestOptions).then(
      (response) => {
        expect(response.status).toBe(401);
      }
    );
  });
});

describe("Get employees test suite", () => {
  it("Error if no auth given", async () => {
    let url = "http://localhost:8000/api/Employees";
    let fetchData = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
      }),
    };
    fetch(url, fetchData).then((response) => {
      expect(response.status).toBe(401);
    });
  });

  it("Error if JWT token is expired", async () => {
    let url = "http://localhost:8000/api/Employees";
    let fetchData = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImEiLCJpYXQiOjE2ODA3OTM1NjgsImV4cCI6MTY4MDc5NTM2OH0.d8jpcU5PeXiJapxstC5zucifeYq9c6SsVxVkgkR5Id4",
      }),
    };
    fetch(url, fetchData).then((response) => {
      expect(response.status).toBe(401);
    });
  });

  it("Check if there are employees and they have all attributes", async () => {
    let url = "http://localhost:8000/api/Employees";
    let fetchData = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: authToken,
      }),
    };
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
      });
  });
});

describe("Update employee test suite", () => {
  it("Error if no auth given", async () => {
    let url = "http://localhost:8000/api/Employees/" + employeeID;
    let fetchData = {
      method: "PUT",
      body: JSON.stringify(newEmployeeData),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
      }),
    };
    fetch(url, fetchData).then((response) => {
      expect(response.status).toBe(401);
    });
  });

  it("Error if JWT token is expired", async () => {
    let url = "http://localhost:8000/api/Employees/" + employeeID;
    let fetchData = {
      method: "PUT",
      body: JSON.stringify(newEmployeeData),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImEiLCJpYXQiOjE2ODA3OTM1NjgsImV4cCI6MTY4MDc5NTM2OH0.d8jpcU5PeXiJapxstC5zucifeYq9c6SsVxVkgkR5Id4",
      }),
    };
    fetch(url, fetchData).then((response) => {
      expect(response.status).toBe(401);
    });
  });

  it("Check if the updated employee has all attributes and equals the data introduced", async () => {
    let url = "http://localhost:8000/api/Employees/" + employeeID;
    let fetchData = {
      method: "PUT",
      body: JSON.stringify(newEmployeeData),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: authToken,
      }),
    };
    newEmployeeData.id = employeeID;
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
      });
  });
});

describe("Delete employee test suite", () => {
  it("Error if no auth given", async () => {
    let url = "http://localhost:8000/api/Employees/" + deleteEmployeeID;
    let fetchData = {
      method: "DELETE",
      body: JSON.stringify(newEmployeeData),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
      }),
    };
    fetch(url, fetchData).then((response) => {
      expect(response.status).toBe(401);
    });
  });

  it("Error if JWT token is expired", async () => {
    let url = "http://localhost:8000/api/Employees/" + deleteEmployeeID;
    let fetchData = {
      method: "DELETE",
      body: JSON.stringify(newEmployeeData),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImEiLCJpYXQiOjE2ODA3OTM1NjgsImV4cCI6MTY4MDc5NTM2OH0.d8jpcU5PeXiJapxstC5zucifeYq9c6SsVxVkgkR5Id4",
      }),
    };
    fetch(url, fetchData).then((response) => {
      expect(response.status).toBe(401);
    });
  });

  it("Delete employee sends ok status code", async () => {
    let url = "http://localhost:8000/api/Employees/" + deleteEmployeeID;
    let fetchData = {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: authToken,
      }),
    };
    fetch(url, fetchData).then((response) => {
      expect(response.status).toBe(200);
    });
  });
});

describe("Create employee test suite", () => {
  it("Error if no auth given", async () => {
    let url = "http://localhost:8000/api/Employees";
    let fetchData = {
      method: "POST",
      body: JSON.stringify(newEmployeeData),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
      }),
    };
    fetch(url, fetchData).then((response) => {
      expect(response.status).toBe(401);
    });
  });

  it("Error if JWT token is expired", async () => {
    let url = "http://localhost:8000/api/Employees";
    let fetchData = {
      method: "POST",
      body: JSON.stringify(newEmployeeData),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImEiLCJpYXQiOjE2ODA3OTM1NjgsImV4cCI6MTY4MDc5NTM2OH0.d8jpcU5PeXiJapxstC5zucifeYq9c6SsVxVkgkR5Id4",
      }),
    };
    fetch(url, fetchData).then((response) => {
      expect(response.status).toBe(401);
    });
  });

  it("Check if the employee is created and send the id back", async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", authToken);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      first_name: "New",
      last_name: "Test",
      dob: "2022-01-01",
      email: "Test@Test.com",
      skill_level: "d3bfedba-ce42-11ed-9e71-025041000001",
      active: 1,
      age: 100,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8000/api/Employees", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        expect(result.length).toBe(36);
        expect(result).toContain("-");
      });
  });
});

describe("Password encryption", () => {
  it("password is encrypted", async () => {
    let password = "password";
    let encryptedPassword = await bcrypt.hash(password, 1);
    expect(encryptedPassword).toContain("$2b$04$");
  });
  it("check password is recovered from encryption", async () => {
    const comparison = await bcrypt.compare(
      "a",
      "$2b$04$7CMTyYd12tieamEmDMfO6eLs6Day1wML8v2adZ95S/c6GrOk7qHIu"
    );
    expect(comparison).toBe(true);
  });
});
