INSERT INTO department (name)
VALUES ("Sales"), ("IT");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Director", 3.10, 1),("IT Director", 3.10, 2), ("Coder", 2000000, 2), ("Salesman", 50000, 1);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Strawberry", "Shortcake", 2, NULL), ("Chocolate", "Pie", 3, 1 ), ("Blueberry", "Cheesecake", 1, NULL)