const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/employees", verifyToken, employeeController.createEmployee);
router.get("/employees", verifyToken, employeeController.getEmployees);
router.get("/employees/:id", verifyToken, employeeController.getEmployeeById);
router.put("/employees/:id", verifyToken, employeeController.updateEmployee);
router.delete("/employees/:id", verifyToken, employeeController.deleteEmployee);

module.exports = router;