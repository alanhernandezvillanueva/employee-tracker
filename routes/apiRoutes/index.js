const { express } = require('express');
const inquirer = require('inquirer');
const db = require('../../db/connection');
const cTable = require('console.table');

let departments = [];
let roles = [];
let employees = [];
let updatedRole = [];

// function that starts the questions
async function startQuestions() {
    const question = await inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: "What would you like to do?",
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a role', 'Add an employee', 'Add a department', 'Update employee role', 'Exit']
        }
    ])

    // show all departments
    if (question.selection === 'View all departments') {
        viewDepartments();
    }

    // show all roles
    if (question.selection === "View all roles") {
        viewRoles();
         }


    // show all employees
    if (question.selection === "View all employees") {
        viewEmployees();
       
    }
    // add new role to data base
    let newRole
    if (question.selection === "Add a role") {
        newRole = await inquirer.prompt([
            {
                type: 'input',
                name: 'newRoleTitle',
                message: "What is the title of the new role? (Required)",
                validate: newRoleTitle => {
                    if (newRoleTitle) {
                        return true;
                    } else {
                        console.log("Please enter a role title")
                    }
                }
            },
            {
                type: 'input',
                name: 'newRoleSalary',
                message: "What is the new role's salary? (Required)",
                validate: newRoleSalary => {
                    if (newRoleSalary) {
                        return true;
                    } else {
                        console.log("Please enter the role's salary")
                    }
                }
            },
            {
                type: 'list',
                name: 'departmentID',
                message: "What department does the new role belong to?",
                choices: ['1', '2', '3', '4']
            }

        ])
        // append new role to array 
        if (newRole) {
            roles.push(newRole)
            
        }
        addRole();
        
    }

    // add new employee
    if (question.selection === "Add an employee") {
        
        newEmployee = await inquirer.prompt([
            {
                type: 'input',
                name: 'newEmployeeFirstName',
                message: "What is the employee's first name? (Required)",
                validate: newEmployeeFirstName => {
                    if (newEmployeeFirstName) {
                        return true;
                    } else {
                        console.log("Please enter the employee's first name!")
                    }
                }
            },
            {
                type: 'input',
                name: 'newEmployeeLastName',
                message: "What is the employee's last name? (Required)",
                validate: newEmployeeLastName => {
                    if (newEmployeeLastName) {
                        return true;
                    } else {
                        console.log("Please enter the employee's last name!")
                    }
                }
            },
            {
                type: 'input',
                name: 'roleID',
                message: "What is the employee's role id? (Required)",
                validate: roleID => {
                    if (roleID) {
                        return true;
                    } else {
                        console.log("Please enter the role ID!")
                    }
                }
            },
            {
                type: 'input',
                name: 'managerID',
                message: "What is the Manager's name? (Required)",
                validate: managerID => {
                    if (managerID) {
                        return true;
                    } else {
                        console.log("Please enter the manager's name!")
                    }
                }
            },
            {
                type: 'input',
                name: 'departmentID',
                message: "What is the employee's department id? (Required)",
                validate: departmentID => {
                    if (departmentID) {
                        return true;
                    } else {
                        console.log("Please enter the department ID!")
                    }
                }
            }

        ])
        if (newEmployee) {

            employees.push(newEmployee);
            
        }

        addEmployee();
       
    }

        // add new department 
    if (question.selection === 'Add a department') {
        newDepartment = await inquirer.prompt([
            {
                type: 'input',
                name: 'newDepartment',
                message: "What is the new Department name? (Required)",
                validate: newDepartment => {
                    if (newDepartment) {
                        return true;
                    } else {
                        console.log("Please enter a department name!")
                    }
                }
            }
        ])
        if (newDepartment) {

            departments.push(newDepartment);
            
        }
        addDepartment();
       
    }


    // update employee's role
    if (question.selection === "Update employee role") {
        
        updatedEmployeeRole = await inquirer.prompt([ 
            {
                type: 'input',
                name: 'employeeFirstName',
                message: "What is the first name of the employee you would like to update? (Required)",
                validate: employeeFirstName => {
                    if (employeeFirstName) {
                        return true;
                    } else {
                        console.log("Please enter your employee's first name!")
                    }
                }
            },
            {
                type: 'input',
                name: 'employeeLastName',
                message: "What is the last name of the employee you would like to update? (Required)",
                validate: employeeLastName => {
                    if (employeeLastName) {
                        return true;
                    } else {
                        console.log("Please enter your employee's last name!")
                    }
                }
            },
            {
                type: 'input',
                name: 'newRoleID',
                message: "What is the new role id you would like to assign the employee? (Required)",
                validate: newRoleID => {
                    if (newRoleID) {
                        return true;
                    } else {
                        console.log("Please enter the new role ID!")
                    }
                }
            }
        ])

        if (updatedEmployeeRole) {
            updatedRole.push(updatedEmployeeRole);
            
        }
        
        updateEmployeeRole();
       
    }



// exit app
    if (question.selection === 'Exit') {
        console.log("Press Control + C to Exit");
        return;
    }
    startQuestions();
};


// Show * from department tables 
const viewDepartments = () => {

    departments = [];

    db.query(`SELECT * FROM department`, (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < row.length; i++) {
            departments.push(row[i]);
        }
        console.table('', departments);
        console.log('Arrow down to perform another action');
    })

};

// view  * from roles table

const viewRoles = () => {

    roles = [];

    db.query(`SELECT * FROM employeerole`, (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let j = 0; j < row.length; j++) {
            roles.push(row[j]);
        }
        console.table('', roles);
        console.log('Arrow down to perform another action');
    })

};

// view * data from employees table 
const viewEmployees = () => {
    employees = [];

    db.query(`SELECT employee.*, department.department_name AS department, employeerole.title AS role
    from employee
    LEFT JOIN department
    ON employee.department_id = department.id
    LEFT JOIN employeerole
    ON employee.role_id = employeerole.id`, (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let k = 0; k < row.length; k++) {
            employees.push(row[k]);
        }
        
        console.table('', employees);
        console.log('Arrow down to perform another action');
    })
};

// create a new role 
const addRole = () => {


    const params = [roles[roles.length-1].newRoleTitle, roles[roles.length-1].newRoleSalary, roles[roles.length-1].departmentID];

    db.query(`INSERT INTO employeerole (title, salary, department_id)
    VALUES (?, ?, ?)`, params, (err, res) => {
        if (err) {

            return;
        }

    });

    console.log('The role has been added!')
    console.log('Arrow down to perform another action');

};

// create a new employee in data base 
const addEmployee = () => {

    const params = [employees[employees.length-1].newEmployeeFirstName, employees[employees.length-1].newEmployeeLastName, employees[employees.length-1].roleID, employees[employees.length-1].managerID, employees[employees.length-1].departmentID];
    
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_name, department_id)
    VALUES (?, ?, ?, ?, ?)`, params, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }


        console.log('', "The employee has been added!")
        console.log("Arrow down to perform another action");

    });

};


// create a new department in data base 
const addDepartment = () => {
    const params = [departments[departments.length-1].newDepartment];
    
    db.query(`INSERT INTO department (department_name)
    VALUES (?)`, params, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log("The department has been added!")
        console.log("Arrow down to perform another action");
    });
};

// update employee in database 
const updateEmployeeRole = () => {
    
    const params = [updatedRole[0].newRoleID, updatedRole[0].employeeFirstName, updatedRole[0].employeeLastName];
   
    db.query(`UPDATE employee set role_id = ?
    WHERE first_name = ? and last_name = ?`, params, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("The employee has been updated!")
        console.log("Arrow down to perform another action");
    });


}

// starts the program 
startQuestions();