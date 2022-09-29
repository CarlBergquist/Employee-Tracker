const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

//CREATING DATABASE CONNECTION
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'Password123!',
        database: 'company'
    },
    console.log(`Connected to the company database.`),
    menu()
);


function menu() {
    inquirer
        .prompt({
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Departments",
                "View All Roles",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee Role",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.menu) {
                case "View All Employees":
                    allEmploy();
                    break;
                case "View All Departments":
                    allDept();
                    break;
                case "View All Roles":
                    allRoles();
                    break;
                case "Add Employee":
                    addEmploy();
                    break;
                case "Add Department":
                    addDept();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Update Employee Role":
                    update();
                    break;
                case "Exit":
                    db.end();
                    break;
            }
        });
}

function allEmploy() {
    db.query(`SELECT * FROM employee`, function (err, results) {
        console.table(results);
        menu();
    })
};


function allDept() {
    db.query(`SELECT * FROM department`, function (err, results) {
        console.table(results);
        menu();
    })
};


function allRoles() {
    db.query(`SELECT * FROM role`, function (err, results) {
        console.table(results);
        menu();
    })
};


function addEmploy() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the employee's first name",
                name: "firstName"
            },
            {
                type: "input",
                message: "Enter the employee's last name",
                name: "lastName"
            },
            {
                type: "input",
                message: "Enter the employee's role ID",
                name: "addRole"
            },
            {
                type: "input",
                message: "Enter the employee's manager ID",
                name: "addManagerID"
            }
        ])
        .then(function (res) {
            const firstName = res.firstName;
            const lastName = res.lastName;
            const RoleID = res.addRole;
            const ManagerID = res.addManagerID;
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${RoleID}", "${ManagerID}")`, function (err, results) {
                console.table(results);
                menu();
            })
        });

}

function addDept() {
    inquirer
        .prompt({
            type: "input",
            message: "Enter the name of the new department",
            name: "department"
        })
        .then(function (res) {
            db.query(`INSERT INTO department (department_name) VALUES ("${res.department}")`, function (err, results) {
                console.table(results);
                menu();
            });
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the employee's title",
                name: "roleTitle"
            },
            {
                type: "input",
                message: "Enter the employee's salary",
                name: "roleSalary"
            },
            {
                type: "input",
                message: "Enter the employee's department ID",
                name: "roleDept"
            }
        ])
        .then(function (res) {
            const title = res.roleTitle;
            const salary = res.roleSalary;
            const departmentID = res.roleDept;
            db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${departmentID}")`, function (err, results) {
                console.table(results);
                menu();
            });
        });
}

function update() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the employee's ID you want to be updated",
                name: "update"
            },
            {
                type: "input",
                message: "Enter the new role ID for that employee",
                name: "role"
            }
        ])
        .then(function (res) {
            const update = res.update;
            const role = res.role;
            db.query(`UPDATE employee SET role_id = "${role}" WHERE id = "${update}"`, function (err, results) {
                console.table(results);
                menu();
            })
        });
}
