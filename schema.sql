DROP DATABASE IF EXISTS EmployeeTracker_db;
-- Creates the "Employee-Tracker_db" database --
CREATE DATABASE EmployeeTracker_db;

-- Makes it so all of the following code will affect Employee-Tracker_db --
USE EmployeeTracker_db;

--  creates 'department' table within Employee-Tracker_db

CREATE TABLE department (

    -- column or a set of columns that uniquely identifies each row in the table.
    id INT auto_increment PRIMARY KEY,
    -- holds department name 
    name VARCHAR(30)  NOT NULL
  
);

CREATE TABLE role (

    -- column or a set of columns that uniquely identifies each row in the table.
   id INT auto_increment PRIMARY KEY,
    -- department title 
    title  VARCHAR(30),
    salary DECIMAL,
    -- department_id -  INT to hold reference to department role belongs to
    department_id INT, 
    CONSTRAINT department_id FOREIGN KEY (department_id) REFERENCES department(id)
  
);

CREATE TABLE employee (
    -- column or a set of columns that uniquely identifies each row in the table.
    id INT auto_increment PRIMARY KEY,

    first_name VARCHAR(30), 

    last_name VARCHAR(30),
    -- INT to hold reference to role employee has

    role_id INT, 
    CONSTRAINT role_id FOREIGN KEY (role_id) REFERENCES role(id),

    -- hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
    manager_id INT DEFAULT NULL,
    CONSTRAINT manager_id FOREIGN KEY (manager_id) REFERENCES employee(id)



);

