const authService = require("../services/authService");
const Employee = require("../models/employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../models/employee");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

/*
Test logic loginService
*/

describe("Auth Service", () => {

  test("should login successfully", async () => {

    const fakeEmployee = {
      id: 1,
      email: "test@gmail.com",
      password: "hashed"
    };

    Employee.findOne.mockResolvedValue(fakeEmployee);

    bcrypt.compare.mockResolvedValue(true);

    jwt.sign.mockReturnValue("fake-token");

    const result = await authService.loginService(
      "test@gmail.com",
      "123456"
    );

    expect(result.message).toBe("Login success");
    expect(result.token).toBe("fake-token");

  });

  test("should throw error when email not found", async () => {

    Employee.findOne.mockResolvedValue(null);

    await expect(
      authService.loginService("abc@gmail.com", "123")
    ).rejects.toThrow("Email not found");

  });

  test("should throw error when password wrong", async () => {

    const fakeEmployee = {
      id: 1,
      email: "test@gmail.com",
      password: "hashed"
    };

    Employee.findOne.mockResolvedValue(fakeEmployee);

    bcrypt.compare.mockResolvedValue(false);

    await expect(
      authService.loginService("test@gmail.com", "wrong")
    ).rejects.toThrow("Wrong password");

  });

});