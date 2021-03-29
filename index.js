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
          addEmployee();
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
// table first, then property within table (ie = employee(table).property
const allEmployees = () => {
  connection.query("SELECT employee.first_name, employee.last_name, role.title, department.name, employee.manager_id FROM employee INNER JOIN job_role ON employee.role_id = job_role.role_id", (err, res) => {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    // call start function to bring up options
    start();
  });
};

const employeesByDepartment = () => {
  connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", (err, res) => {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    // call start function to bring up options
    start();
  });
};

const employeesByRole = () => {
  // role.title will be just Title
  connection.query("SELECT employee.first_name, employee.last_name,role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",  (err, res) => {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    
  });
};


// add employee
function addEmployee () {
  inquirer
  .prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter the employee's first name"
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter the employee's last name"
        },
        {
          name: "role",
          type: "list",
          message: "What is their role? ",
          //calls selectRole function
          choices: selectRole()
        },
        {
            name: "manager",
            type: "rawlist",
            message: "What is their managers name?",
            // calls selectManager function
            choices: selectManager()
        }
  ])
  .then((answers) => {
      connection.query("INSERT INTO employee SET ?", 
      {
          first_name: answers.firstName,
          last_name: answers.lastName,
          manager_id: managerId,
          role_id: roleId
          
      }, function(err){
          if (err) throw err
          console.table(answers)
          start()
      })

  })

}

function addDepartment () {

  inquirer
  .prompt([
        {
          name: "department",
          type: "input",
          message: "What is the department you wish to add?"
        }
      ])
        .then((answers) => {
          connection.query("INSERT INTO department SET ?", 
          {
              
            name: answers.department    
              
          }, function(err){
              if (err) throw err
              console.table(answers)
              start()
          })
    
      })


}



