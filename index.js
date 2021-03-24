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

// inquirer prompts to start user
// start inquirer prompt asking user what they'd like to do with
// functions

//inquirer prompt asking what user would like to do
// choices into a switch statement, call each function based on selection from user
//                "View All Employees?",
//               "View All Employee's By Roles?",
//               "View all Emplyees By Deparments",
//               "Update Employee",
//               "Add Employee?",
//               "Add Role?",
//               "Add Department?"

const start = () => {
  inquirer
    .prompt({
      name: "userOption",
      type: "list",
      message: "What would you like to do ",
      choices: ["View All Employees", "Add Employee"],
    })
    .then((answer) => {
      switch (answer.userOption) {
        case "View All Employees":
          allEmployees();
          break;
        case "Add Employee":
          addEmployees();
          break;
        default:
          console.log("Error");
          connection.end();
      }
    });
};

// within functions

const allEmployees = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
  });
};
