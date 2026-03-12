const request = require("supertest");
const express = require("express");

// mock controller để route test độc lập
jest.mock("../controllers/employeeController");

// mock middleware auth
jest.mock("../middleware/authMiddleware", () => ({
  verifyToken: (req, res, next) => next()
}));

const employeeController = require("../controllers/employeeController");
const employeeRoutes = require("../routes/employeeRoutes");

describe("Employee Routes", () => {

  let app;

  beforeEach(() => {

    // tạo express app giả
    app = express();
    app.use(express.json());
    app.use("/api", employeeRoutes);

    jest.clearAllMocks();

  });

  // ================= CREATE EMPLOYEE =================
  test("POST /api/employees should call createEmployee controller", async () => {

    employeeController.createEmployee.mockImplementation((req, res) => {
      res.status(201).json({ id: 1, name: "John" });
    });

    const res = await request(app)
      .post("/api/employees")
      .send({ name: "John", position: "Developer" });

    expect(employeeController.createEmployee).toHaveBeenCalled();

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ id: 1, name: "John" });

  });


  // ================= GET ALL EMPLOYEES =================
  test("GET /api/employees should call getEmployees controller", async () => {

    employeeController.getEmployees.mockImplementation((req, res) => {
      res.json([{ id: 1, name: "John" }]);
    });

    const res = await request(app).get("/api/employees");

    expect(employeeController.getEmployees).toHaveBeenCalled();

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 1, name: "John" }]);

  });


  // ================= GET EMPLOYEE BY ID =================
  test("GET /api/employees/:id should call getEmployeeById controller", async () => {

    employeeController.getEmployeeById.mockImplementation((req, res) => {
      res.json({ id: 1, name: "John" });
    });

    const res = await request(app).get("/api/employees/1");

    expect(employeeController.getEmployeeById).toHaveBeenCalled();

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, name: "John" });

  });


  // ================= UPDATE EMPLOYEE =================
  test("PUT /api/employees/:id should call updateEmployee controller", async () => {

    employeeController.updateEmployee.mockImplementation((req, res) => {
      res.json({ id: 1, name: "Updated John" });
    });

    const res = await request(app)
      .put("/api/employees/1")
      .send({ name: "Updated John" });

    expect(employeeController.updateEmployee).toHaveBeenCalled();

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, name: "Updated John" });

  });


  // ================= DELETE EMPLOYEE =================
  test("DELETE /api/employees/:id should call deleteEmployee controller", async () => {

    employeeController.deleteEmployee.mockImplementation((req, res) => {
      res.json({ message: "Employee deleted" });
    });

    const res = await request(app).delete("/api/employees/1");

    expect(employeeController.deleteEmployee).toHaveBeenCalled();

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Employee deleted" });

  });

});