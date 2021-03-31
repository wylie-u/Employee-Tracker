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
    "View All Employees By Department?",
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
      console.log(answer)
      // choices then go into a switch statement, call each function based on selection from user
      switch (answer.userOption) {
        case "View All Employees?":
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
          case "Add Role?":
          addRole();
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
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    // call start function to bring up options
    start();
  });
};


const employeesByDepartment = () => {
  connection.query('SELECT * FROM department', (err, results) => {
      if (err) throw err;
      console.table(results);
      start();
  })
};

const employeesByRole = () => {
  // role.title will be just Title
  connection.query("SELECT employee.first_name, employee.last_name,role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",  (err, res) => {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    // call start function to bring up options
    start();
    
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

          name: "roleId",
          type: "input",
          message: "What is the employee's role id?",
          
        },
        {

            name: "managerId",
            type: "input",
            message: "What is the manager id number?",
          
        }
  ])
  .then((answers) => {
      
    // answers from the prompt will be set as values of the properties from the table
      connection.query("INSERT INTO employee SET ?", 
      {
          // first name in employee column
          first_name: answers.firstname,
          // last name in employee column
          last_name: answers.lastname,
          // manager id in employee column 
          manager_id: answers.managerId,
          // role id in employee column
          role_id: answers.roleId

           
      }, function(err){
          if (err) throw err
          console.table(answers)
          start()
      })

  })

}
// add department
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
            // ties to name column in department table 
            name: answers.department    
              
          }, function(err){
              if (err) throw err
              console.table(answers)
              start()
          })
    
      })

}

function addRole () {
  inquirer
  .prompt([
        {
            type: 'input',
            name: 'role',
            message: 'What is the role you would like to add?'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'What is the department ID for this role?'
      },
      ]).then((answers) => {
        connection.query("INSERT INTO role SET ?",
        {
          // ties to name column in role table 
          role: answers.role,  
          // ties to department id
          department_id: answers.department_id,

            
        }, function(err){
            if (err) throw err
            console.table(answers)
            start()

        })

})
}

function removeEmployees () {
  connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
    // console.log(res)
     if (err) throw err
     console.log(res)
     inquirer
  .prompt([
        {
            type: 'input',
            name: 'employee',
            choices: function() {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the Employee's last name? ",
        },
      ]).then((answers) => {
        console.log('Delete selected employee\n');
        connection.query('DELETE FROM employee WHERE ?',
    {
      last_name: answers.employee,
    },
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} employee removed!\n`);
      // Call start AFTER the DELETE completes
      start();
    }
  );
      })
  })  
}

function updatedEmpRole () {
  connection.query("SELECT * FROM employee", function(err, res) {
     if (err) throw err
     console.log(res)
     // need to reference last name of employee and update role 
     inquirer
    .prompt([
      {
        name: 'employee',
        name: 'choice',
          type: 'rawlist',
          choices() {
            const empSelection = [];
            res.forEach(({ last_name }) => {
              empSelection.push(last_name);
            });
            return empSelection;
          },
          message: 'Which employee would you like to update?',
      },
      {

        name: 'role',
        type: 'input',
        message: "What is the Employee's new role id?",
    
      
      },

    ]).then((answer) => {
      
      let chosenRole;
      res.forEach((role_id) => {
        if (role_id.last_name === answer.employee) {
          chosenRole = role_id;
        }
      });

      
      if (parseInt(answer.role)) {
       
        connection.query(
          'UPDATE employee SET ? WHERE ?',
          [
            {
              role_id: answer.role,
            },
            {
              id: chosenRole,
            },
          ],
          (error) => {
            if (error) throw err;
            console.log('Employee updated correctly!');
            start();
          }
        );
      } 
    });
})
}