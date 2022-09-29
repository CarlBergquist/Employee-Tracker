INSERT INTO department(id, department_name)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Legal"),
       (4, "Sales");


INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales Lead", 90000, 1),
       (2, "Sales Person", 60000, 1),
       (3, "Lead Engineer", 100000, 2),
       (4, "Software Engineer", 70000, 2),
       (5, "Account Manager", 110000, 3),
       (6, "Accountant", 65000, 3),
       (7, "Legal Team Lead", 155000, 4),
       (8, "Lawyer", 110000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1,"Jim", "Brown", 8 , 7),
        (2,"Adam", "Smith", 7 , 7),
        (3,"Phil", "Hammer", 6, 5),
        (4,"Max", "Crawford", 5 , 5),
        (5,"Dan", "Black", 4, 3),
        (6,"Sam", "Mann", 3, 3),
        (7,"Val", "Norton", 2, 1),
        (8,"Chad", "King", 1, 1);