 INSERT INTO department (department_name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

INSERT INTO employeerole (title, salary, department_id)
VALUES 
('Salesperson', '9000', 1),
('Lead Engineer', '200000', 2),
('Software Engineer', '150000', 2),
('Account Manager', '167000', 3),
('Accountant', '130000', 3),
('Legal Team Lead', '300000', 4),
('Lawyer', '250000', 4);




INSERT INTO employee (first_name, last_name, role_id, manager_name, department_id)
VALUES
('Alan', 'Hernandez', 1, 'Karen Juarez', 1),
('Bill', 'Tracy', 2, 'Karen juarez ', 2),
('Sasha', 'Shane', 3, 'Mariah Carey', 2),
('Lizeth', 'Hernandez', 4, 'Erika Tornez', 3),
('Alejandro', 'Hernandez', 5, 'Rosa Villanueva', 3);

INSERT INTO manager (first_name, last_name)
VALUES
('Karen', 'Juarez'),
('Mariah', 'Carey'),
('Erika', 'Tornez'),
('Rosa', 'Villanueva');

  

 