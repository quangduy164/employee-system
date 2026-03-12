const employeeController = require("../controllers/employeeController");
const employeeService = require("../services/employeeService");

// mock toàn bộ service để controller test độc lập
jest.mock("../services/employeeService");

describe("Employee Controller", () => {

  let req;
  let res;

  beforeEach(() => {

    // giả lập request
    req = {
      body: { name: "John", position: "Developer" },
      params: { id: 1 }
    };

    // giả lập response
    res = {
      set: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();

  });

  // ================= CREATE EMPLOYEE =================
  describe("createEmployee", () => {

    test("should create employee successfully", async () => {

      // giả lập service trả về employee
      const mockEmployee = { id: 1, name: "John" };
      employeeService.createEmployeeService.mockResolvedValue(mockEmployee);

      await employeeController.createEmployee(req, res);

      // kiểm tra header cache
      expect(res.set).toHaveBeenCalledWith("Cache-Control", "no-store");

      // kiểm tra status code
      expect(res.status).toHaveBeenCalledWith(201);

      // kiểm tra dữ liệu trả về
      expect(res.json).toHaveBeenCalledWith(mockEmployee);

    });

    test("should return 500 if service throws error", async () => {

      employeeService.createEmployeeService.mockRejectedValue(
        new Error("DB error")
      );

      await employeeController.createEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "DB error" });

    });

  });

  // ================= GET ALL EMPLOYEES =================
  describe("getEmployees", () => {

    test("should return list of employees", async () => {

      const mockEmployees = [{ id: 1, name: "John" }];

      employeeService.getEmployeesService.mockResolvedValue(mockEmployees);

      await employeeController.getEmployees(req, res);

      expect(res.set).toHaveBeenCalledWith("Cache-Control", "no-store");
      expect(res.json).toHaveBeenCalledWith(mockEmployees);

    });

    test("should return 500 if service throws error", async () => {

      employeeService.getEmployeesService.mockRejectedValue(
        new Error("DB error")
      );

      await employeeController.getEmployees(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "DB error" });

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
      expect(res.json).toHaveBeenCalledWith({ message: "Employee not found" });

    });

    test("should return 500 for other errors", async () => {

      employeeService.getEmployeeByIdService.mockRejectedValue(
        new Error("DB error")
      );

      await employeeController.getEmployeeById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "DB error" });

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
      expect(res.json).toHaveBeenCalledWith({ message: "Employee not found" });

    });

    test("should return 500 for other errors", async () => {

      employeeService.updateEmployeeService.mockRejectedValue(
        new Error("DB error")
      );

      await employeeController.updateEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "DB error" });

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
      expect(res.json).toHaveBeenCalledWith({ message: "Employee not found" });

    });

    test("should return 500 for other errors", async () => {

      employeeService.deleteEmployeeService.mockRejectedValue(
        new Error("DB error")
      );

      await employeeController.deleteEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "DB error" });

    });

  });

});