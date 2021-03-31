INSERT INTO department (name)
VALUES ("Sales"), ("IT"), ("Human Resources"), ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Director", 3.10, 1),("IT Director", 3.10, 2), ("Coder", 2000000, 2), ("Salesman", 50000, 1);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("James", "Bond", 2, NULL), ("Michael", "Jordan", 3, 1 ), ("Michelle", "Wee", 1, NULL), ("Jennifer", "Gardner", 4, NULL), ("Andre", "Bowman", 5, NULL), ("Kelly", "Clark", 6, NULL), ("Samantha", "Martinez", 7, NULL)

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;