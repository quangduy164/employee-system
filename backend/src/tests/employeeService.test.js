const employeeService = require("../services/employeeService");
const Employee = require("../models/employee");
const bcrypt = require("bcrypt");

jest.mock("../models/employee");
jest.mock("bcrypt");

/*
 Test logic CRUD employee
*/

describe("Employee Service", () => {

  // ================= CREATE =================
  test("create employee", async () => {

    // giả lập bcrypt hash password
    bcrypt.hash.mockResolvedValue("hashedPassword");

    const fakeEmployee = {
      id: 1,
      name: "John"
    };

    // giả lập Employee.create
    Employee.create.mockResolvedValue(fakeEmployee);

    const result = await employeeService.createEmployeeService({
      name: "John",
      email: "john@gmail.com",
      password: "123456"
    });

    // kiểm tra employee được tạo
    expect(result.name).toBe("John");

  });


  // ================= GET ALL =================
  test("get all employees", async () => {

    const employees = [{ id: 1 }, { id: 2 }];

    Employee.findAll.mockResolvedValue(employees);

    const result = await employeeService.getEmployeesService();

    // kiểm tra trả về đúng số lượng
    expect(result.length).toBe(2);

  });


  // ================= GET BY ID =================
  test("get employee by id success", async () => {

    Employee.findByPk.mockResolvedValue({ id: 1 });

    const result = await employeeService.getEmployeeByIdService(1);

    expect(result.id).toBe(1);

  });

  test("get employee by id not found", async () => {

    Employee.findByPk.mockResolvedValue(null);

    // kiểm tra khi employee không tồn tại
    await expect(
      employeeService.getEmployeeByIdService(10)
    ).rejects.toThrow("Employee not found");

  });


  // ================= UPDATE =================
  test("update employee success", async () => {

    const mockUpdate = jest.fn();

    const fakeEmployee = {
      id: 1,
      update: mockUpdate
    };

    // giả lập tìm thấy employee
    Employee.findByPk.mockResolvedValue(fakeEmployee);

    const result = await employeeService.updateEmployeeService(1, {
      name: "Updated"
    });

    // kiểm tra update được gọi
    expect(mockUpdate).toHaveBeenCalled();

    // kiểm tra employee được trả về
    expect(result.id).toBe(1);

  });

  test("update employee not found", async () => {

    Employee.findByPk.mockResolvedValue(null);

    // kiểm tra khi employee không tồn tại
    await expect(
      employeeService.updateEmployeeService(1, { name: "New" })
    ).rejects.toThrow("Employee not found");

  });


  // ================= DELETE =================
  test("delete employee success", async () => {

    const mockDestroy = jest.fn();

    const fakeEmployee = {
      destroy: mockDestroy
    };

    // giả lập tìm thấy employee
    Employee.findByPk.mockResolvedValue(fakeEmployee);

    const result = await employeeService.deleteEmployeeService(1);

    // kiểm tra destroy được gọi
    expect(mockDestroy).toHaveBeenCalled();

    // kiểm tra message trả về
    expect(result.message).toBe("Employee deleted");

  });

  test("delete employee not found", async () => {

    Employee.findByPk.mockResolvedValue(null);

    // kiểm tra khi employee không tồn tại
    await expect(
      employeeService.deleteEmployeeService(1)
    ).rejects.toThrow("Employee not found");

  });

});