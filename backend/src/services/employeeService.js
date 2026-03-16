const Employee = require("../models/employee");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

// CREATE
exports.createEmployeeService = async (data) => {

  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const employee = await Employee.create({
    name: data.name,
    email: data.email,
    password: hashedPassword
  });

  return {
    id: employee.id,
    name: employee.name,
    email: employee.email
  };
};

// GET ALL
exports.getEmployeesService = async () => {

  return Employee.findAll({
    attributes: { exclude: ["password"] }
  });

};

// GET BY ID
exports.getEmployeeByIdService = async (id) => {

  const employee = await Employee.findByPk(id, {
    attributes: { exclude: ["password"] }
  });

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

  await employee.update({
    name: data.name ?? employee.name,
    email: data.email ?? employee.email
  });

  return {
    id: employee.id,
    name: employee.name,
    email: employee.email
  };

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