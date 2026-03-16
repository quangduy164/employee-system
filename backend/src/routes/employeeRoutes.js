const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeController");
const { verifyToken } = require("../middleware/authMiddleware");

const { body, param } = require("express-validator");

const nameValidator = body("name")
  .trim()
  .isLength({ min: 1, max: 100 })
  .matches(/^[a-zA-Z0-9\s]+$/u);

const emailValidator = body("email")
  .trim()
  .isEmail()
  .normalizeEmail();

const passwordValidator = body("password")
  .isLength({ min: 6, max: 100 })
  .matches(/^[a-zA-Z0-9@!#$%^&*]+$/u);

const idValidator = param("id").isInt();

// CREATE
router.post(
  "/employees",
  [nameValidator, emailValidator, passwordValidator],
  employeeController.createEmployee
);

// GET ALL
router.get(
  "/employees",
  verifyToken,
  employeeController.getEmployees
);

// GET BY ID
router.get(
  "/employees/:id",
  verifyToken,
  [idValidator],
  employeeController.getEmployeeById
);

// UPDATE
router.put(
  "/employees/:id",
  verifyToken,
  [
    idValidator,
    body("name").optional().trim().escape(),
    body("email").optional().isEmail().normalizeEmail()
  ],
  employeeController.updateEmployee
);

// DELETE
router.delete(
  "/employees/:id",
  verifyToken,
  [idValidator],
  employeeController.deleteEmployee
);

module.exports = router;