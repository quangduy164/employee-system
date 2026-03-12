import { describe, it, expect, vi } from "vitest";
import api from "../utils/api";

/*
 Test file này kiểm tra việc gọi API:
 - GET employees
 - POST create employee
 - PUT update employee
 - DELETE employee
*/

describe("API tests", () => {

  // Test gọi API lấy danh sách nhân viên
  it("should call GET /employees", async () => {

    const mockResponse = {
      data: [{ id: 1, name: "John", email: "john@gmail.com" }]
    };

    // giả lập api.get trả về dữ liệu
    vi.spyOn(api, "get").mockResolvedValue(mockResponse);

    const response = await api.get("/employees");

    // kiểm tra api.get có được gọi đúng endpoint
    expect(api.get).toHaveBeenCalledWith("/employees");

    // kiểm tra dữ liệu trả về
    expect(response.data.length).toBe(1);

  });

  // Test tạo nhân viên mới
  it("should call POST /employees", async () => {

    const newEmployee = {
      name: "Alice",
      email: "alice@gmail.com"
    };

    vi.spyOn(api, "post").mockResolvedValue({ data: newEmployee });

    const response = await api.post("/employees", newEmployee);

    expect(api.post).toHaveBeenCalledWith("/employees", newEmployee);

    expect(response.data.name).toBe("Alice");

  });

  // Test update nhân viên
  it("should call PUT /employees/:id", async () => {

    const updatedEmployee = {
      name: "John Updated"
    };

    vi.spyOn(api, "put").mockResolvedValue({ data: updatedEmployee });

    await api.put("/employees/1", updatedEmployee);

    expect(api.put).toHaveBeenCalledWith("/employees/1", updatedEmployee);

  });

  // Test xoá nhân viên
  it("should call DELETE /employees/:id", async () => {

    vi.spyOn(api, "delete").mockResolvedValue({});

    await api.delete("/employees/1");

    expect(api.delete).toHaveBeenCalledWith("/employees/1");

  });

});