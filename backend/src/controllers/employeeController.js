const employeeService = require("../services/employeeService");
const { validationResult } = require("express-validator");

const sanitizeInput = (input) => {
  if (typeof input !== "string") {
    return input;
  }

  return input
    .replaceAll("%", "")
    .replaceAll("<", "")
    .replaceAll(">", "")
    .trim();
};

const sanitizeBody = (body) =>
  Object.fromEntries(
    Object.entries(body).map(([key, value]) => [key, sanitizeInput(value)])
  );

const parseId = (id) => {
  const parsed = Number.parseInt(id, 10);
  return Number.isNaN(parsed) ? null : parsed;
};

const handleValidation = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ message: "Invalid input" });
    return false;
  }

  return true;
};

const handleServerError = (res, error) => {
  console.error(error);
  return res.status(500).json({ error: "Internal server error" });
};

// CREATE
exports.createEmployee = async (req, res) => {
  try {
    if (!handleValidation(req, res)) return;

    let { name, email, password } = req.body;

    name = sanitizeInput(name);
    email = sanitizeInput(email);
    password = sanitizeInput(password);

    if (!name?.trim() || name.length > 100) {
      return res.status(400).json({ message: "Invalid name" });
    }

    if (!email?.includes("@")) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (!password || password.length < 6 || password.length > 100) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const employee = await employeeService.createEmployeeService({
      name,
      email,
      password
    });

    return res.status(201).json(employee);

  } catch (error) {
    return handleServerError(res, error);
  }
};

// GET ALL
exports.getEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getEmployeesService();
    return res.json(employees);

  } catch (error) {
    return handleServerError(res, error);
  }
};

// GET BY ID
exports.getEmployeeById = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid employee id" });
    }

    const employee = await employeeService.getEmployeeByIdService(id);

    return res.json(employee);

  } catch (error) {
    if (error?.message === "Employee not found") {
      return res.status(404).json({ message: "Employee not found" });
    }

    return handleServerError(res, error);
  }
};

// UPDATE
exports.updateEmployee = async (req, res) => {
  try {
    if (!handleValidation(req, res)) return;

    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid employee id" });
    }

    const sanitizedBody = sanitizeBody(req.body);

    const employee = await employeeService.updateEmployeeService(
      id,
      sanitizedBody
    );

    return res.json(employee);

  } catch (error) {
    if (error?.message === "Employee not found") {
      return res.status(404).json({ message: "Employee not found" });
    }

    return handleServerError(res, error);
  }
};

// DELETE
exports.deleteEmployee = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid employee id" });
    }

    const result = await employeeService.deleteEmployeeService(id);

    return res.json(result);

  } catch (error) {
    if (error?.message === "Employee not found") {
      return res.status(404).json({ message: "Employee not found" });
    }

    return handleServerError(res, error);
  }
};