const Employee = require("../models/employee");
const bcrypt = require("bcrypt");


// CREATE
exports.createEmployeeService = async (data) => {

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const employee = await Employee.create({
    name: data.name,
    email: data.email,
    password: hashedPassword
  });

  return employee;
};


// GET ALL
exports.getEmployeesService = async () => {

  const employees = await Employee.findAll();

  return employees;
};


// GET BY ID
exports.getEmployeeByIdService = async (id) => {

  const employee = await Employee.findByPk(id);

  if (!employee) {
    throw new Error("Employee not found");
  }

  return employee;
};


// UPDATE
exports.updateEmployeeService = async (id, data) => {

  const employee = await Employee.findByPk(id);

  if (!employee) {
    throw new Error("Employee not found");
  }

  await employee.update(data);

  return employee;
};


// DELETE
exports.deleteEmployeeService = async (id) => {

  const employee = await Employee.findByPk(id);

  if (!employee) {
    throw new Error("Employee not found");
  }

  await employee.destroy();

  return { message: "Employee deleted" };
};