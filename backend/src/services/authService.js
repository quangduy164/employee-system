const Employee = require("../models/employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginService = async (email, password) => {

  const employee = await Employee.findOne({ where: { email } });

  if (!employee) {
    throw new Error("Email not found");
  }

  const isMatch = await bcrypt.compare(password, employee.password);

  if (!isMatch) {
    throw new Error("Wrong password");
  }

  const token = jwt.sign(
    { id: employee.id, email: employee.email },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "1h" }
  );

  return {
    message: "Login success",
    token
  };
};