import logo from './logo.svg';
import './App.css';

function LoginApp() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          CRUD operations
        </p>
      </header>
    </div>
  );
}

//FillEmployee
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Listing Page
        </p>
      </header>
      <body class="App-body">
      <table>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Skill Level</th>
            <th>Active</th>
            <th>Age</th>
          </tr>
          
        </table>
      </body>
    </div>
  );
}

function FillEmployee() {
  return(
    <tr>
      <td>Employee ID</td>
      <td>First Name</td>
      <td>Last Name</td>
      <td>Date of Birtd</td>
      <td>Email</td>
      <td>Skill Level</td>
      <td>Active</td>
      <td>Age</td>
    </tr>
  )
}

export default App;
