const employeeService = require("../services/employeeService");


// CREATE
exports.createEmployee = async (req, res) => {
  try {
    res.set("Cache-Control", "no-store");
    const employee = await employeeService.createEmployeeService(req.body);

    res.status(201).json(employee);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET ALL
exports.getEmployees = async (req, res) => {
  try {
    res.set("Cache-Control", "no-store");
    const employees = await employeeService.getEmployeesService();

    res.json(employees);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET BY ID
exports.getEmployeeById = async (req, res) => {
  try {
    res.set("Cache-Control", "no-store");
    const employee = await employeeService.getEmployeeByIdService(req.params.id);

    res.json(employee);

  } catch (error) {

    if (error.message === "Employee not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ error: error.message });
  }
};


// UPDATE
exports.updateEmployee = async (req, res) => {
  try {
    res.set("Cache-Control", "no-store");
    const employee = await employeeService.updateEmployeeService(
      req.params.id,
      req.body
    );

    res.json(employee);

  } catch (error) {

    if (error.message === "Employee not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ error: error.message });
  }
};


// DELETE
exports.deleteEmployee = async (req, res) => {
  try {
    res.set("Cache-Control", "no-store");
    const result = await employeeService.deleteEmployeeService(req.params.id);

    res.json(result);

  } catch (error) {

    if (error.message === "Employee not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ error: error.message });
  }
};