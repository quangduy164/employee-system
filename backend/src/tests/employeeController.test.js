const employeeController = require("../controllers/employeeController");
const employeeService = require("../services/employeeService");
const { validationResult } = require("express-validator");

jest.mock("../services/employeeService");

jest.mock("express-validator", () => ({
  validationResult: jest.fn()
}));

describe("Employee Controller", () => {

  let req;
  let res;

  beforeEach(() => {

    validationResult.mockReturnValue({
      isEmpty: () => true,
      array: () => []
    });

    req = {
      body: {
        name: "John",
        email: "john@test.com",
        password: "123456"
      },
      params: { id: "1" }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  // ================= CREATE EMPLOYEE =================
  describe("createEmployee", () => {

    test("should create employee successfully", async () => {

      const mockEmployee = { id: 1, name: "John" };

      employeeService.createEmployeeService.mockResolvedValue(mockEmployee);

      await employeeController.createEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockEmployee);
    });

    test("should return 500 if service throws error", async () => {

      employeeService.createEmployeeService.mockRejectedValue(
        new Error("DB error")
      );

      await employeeController.createEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Internal server error"
      });
    });

  });

  // ================= GET ALL EMPLOYEES =================
  describe("getEmployees", () => {

    test("should return list of employees", async () => {

      const mockEmployees = [{ id: 1, name: "John" }];

      employeeService.getEmployeesService.mockResolvedValue(mockEmployees);

      await employeeController.getEmployees(req, res);

      expect(res.json).toHaveBeenCalledWith(mockEmployees);
    });

    test("should return 500 if service throws error", async () => {

      employeeService.getEmployeesService.mockRejectedValue(
        new Error("DB error")
      );

      await employeeController.getEmployees(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Internal server error"
      });
    });

  });

  // ================= GET EMPLOYEE BY ID =================
  describe("getEmployeeById", () => {

    test("should return employee when found", async () => {

      const mockEmployee = { id: 1, name: "John" };

      employeeService.getEmployeeByIdService.mockResolvedValue(mockEmployee);

      await employeeController.getEmployeeById(req, res);

      expect(res.json).toHaveBeenCalledWith(mockEmployee);
    });

    test("should return 404 when employee not found", async () => {

      employeeService.getEmployeeByIdService.mockRejectedValue(
        new Error("Employee not found")
      );

      await employeeController.getEmployeeById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Employee not found"
      });
    });

    test("should return 500 for other errors", async () => {

      employeeService.getEmployeeByIdService.mockRejectedValue(
        new Error("DB error")
      );

      await employeeController.getEmployeeById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Internal server error"
      });
    });

  });

  // ================= UPDATE EMPLOYEE =================
  describe("updateEmployee", () => {

    test("should update employee successfully", async () => {

      const updatedEmployee = { id: 1, name: "Updated" };

      employeeService.updateEmployeeService.mockResolvedValue(updatedEmployee);

      await employeeController.updateEmployee(req, res);

      expect(res.json).toHaveBeenCalledWith(updatedEmployee);
    });

    test("should return 404 if employee not found", async () => {

      employeeService.updateEmployeeService.mockRejectedValue(
        new Error("Employee not found")
      );

      await employeeController.updateEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Employee not found"
      });
    });

    test("should return 500 for other errors", async () => {

      employeeService.updateEmployeeService.mockRejectedValue(
        new Error("DB error")
      );

      await employeeController.updateEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Internal server error"
      });
    });

  });

  // ================= DELETE EMPLOYEE =================
  describe("deleteEmployee", () => {

    test("should delete employee successfully", async () => {

      const result = { message: "Employee deleted" };

      employeeService.deleteEmployeeService.mockResolvedValue(result);

      await employeeController.deleteEmployee(req, res);

      expect(res.json).toHaveBeenCalledWith(result);
    });

    test("should return 404 if employee not found", async () => {

      employeeService.deleteEmployeeService.mockRejectedValue(
        new Error("Employee not found")
      );

      await employeeController.deleteEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Employee not found"
      });
    });

    test("should return 500 for other errors", async () => {

      employeeService.deleteEmployeeService.mockRejectedValue(
        new Error("DB error")
      );

      await employeeController.deleteEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Internal server error"
      });
    });

  });


  describe("Employee Controller - extra coverage", () => {

    test("should return 400 when validation fails", async () => {

      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [{ msg: "Invalid input" }]
      });

      await employeeController.createEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid input" });

    });

    test("should return 400 for invalid name", async () => {

      req.body.name = "";

      await employeeController.createEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid name" });

    });

    test("should return 400 for invalid email", async () => {

      req.body.email = "invalidemail";

      await employeeController.createEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid email" });

    });

    test("should return 400 for invalid password", async () => {

      req.body.password = "123";

      await employeeController.createEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid password" });

    });

    test("should return 400 for invalid employee id (getEmployeeById)", async () => {

      req.params.id = "abc";

      await employeeController.getEmployeeById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid employee id"
      });

    });

    test("should return 400 for invalid employee id (updateEmployee)", async () => {

      req.params.id = "abc";

      await employeeController.updateEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid employee id"
      });

    });

    test("should return 400 for invalid employee id (deleteEmployee)", async () => {

      req.params.id = "abc";

      await employeeController.deleteEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid employee id"
      });

    });

  });

});