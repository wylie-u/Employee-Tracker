// Use the MySQL NPM package to connect to your MySQL database and perform queries.
const mysql = require("mysql");
// Use InquirerJs NPM package to interact with the user via the command-line.
const inquirer = require("inquirer");
// Use console.table to print MySQL rows to the console. There is a built-in version of console.table, but the NPM package formats the data a little better for our purposes.
const cTable = require("console.table");
// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Be sure to update with your own MySQL password!
  password: "Wynona1@",
  database: "EmployeeTracker_db",
});

//   connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  //queryAllSongs();
  start();
});

// inquirer prompts to ask user what they'd like to do


const start = () => {
  inquirer
  .prompt({
    name: 'userOption',
    type: 'list',
    message: 'What would you like to do?',
    choices: ["View All Employees?",
    new inquirer.Separator(), 
    "View all Employees By Department?",
    new inquirer.Separator(), 
    "View All Employees By Role?", 
    new inquirer.Separator(), 
    "Add Employee?",
    new inquirer.Separator(), 
    "Remove Employee?",
    new inquirer.Separator(), 
    "Update Employee Role?",
    new inquirer.Separator(), 
    "Add Department?",
    new inquirer.Separator(),
  ],
  })
    .then((answer) => {
      // choices then go into a switch statement, call each function based on selection from user
      switch (answer.userOption) {
        case "View All Employees":
          allEmployees();
          break;
        case "View All Employees By Department?":
          employeesByDepartment();
          break;
          case "View All Employees By Role?":
          employeesByRole();
          break;
          case "Add Employee?":
          addEmployees();
          break;
          case "Remove Employee?":
          removeEmployees();
          break;
          case "Update Employee Role?":
          updatedEmpRole();
          break;
          case "Add Department?":
          addDepartment();
          break;
          default:
          console.log("Error");
          connection.end();
      }
    });
};

const allEmployees = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    // call start function to bring up options
    start();
  });
};

const employeesByDepartment = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    // call start function to bring up options
    start();
  });
};

const employeesByRole = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    
  });
};


