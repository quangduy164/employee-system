const request = require("supertest");
const express = require("express");
const authController = require("../controllers/authController");
const authService = require("../services/authService");

jest.mock("../services/authService");

const app = express();
app.use(express.json());

// tạo endpoint test
app.post("/login", authController.login);

/*
 Test endpoint login của authController
 Mock authService để không cần database
*/

describe("Auth Controller", () => {

  // ================= SUCCESS =================
  test("login success - should return 200 and token", async () => {

    // giả lập service trả về login thành công
    authService.loginService.mockResolvedValue({
      message: "Login success",
      token: "abc123"
    });

    const res = await request(app)
      .post("/login")
      .send({
        email: "test@gmail.com",
        password: "123"
      });

    // kiểm tra status
    expect(res.statusCode).toBe(200);

    // kiểm tra dữ liệu trả về
    expect(res.body.message).toBe("Login success");

  });


  // ================= EMAIL NOT FOUND =================
  test("login fail - email not found should return 404", async () => {

    // giả lập service ném lỗi email không tồn tại
    authService.loginService.mockRejectedValue(
      new Error("Email not found")
    );

    const res = await request(app)
      .post("/login")
      .send({
        email: "unknown@gmail.com",
        password: "123"
      });

    // controller phải trả 404
    expect(res.statusCode).toBe(404);

    // kiểm tra message
    expect(res.body.message).toBe("Email not found");

  });


  // ================= WRONG PASSWORD =================
  test("login fail - wrong password should return 401", async () => {

    // giả lập service ném lỗi password sai
    authService.loginService.mockRejectedValue(
      new Error("Wrong password")
    );

    const res = await request(app)
      .post("/login")
      .send({
        email: "test@gmail.com",
        password: "wrong"
      });

    // controller phải trả 401
    expect(res.statusCode).toBe(401);

    expect(res.body.message).toBe("Wrong password");

  });


  // ================= SERVER ERROR =================
  test("login fail - unexpected error should return 500", async () => {

    // giả lập lỗi server
    authService.loginService.mockRejectedValue(
      new Error("Database error")
    );

    const res = await request(app)
      .post("/login")
      .send({
        email: "test@gmail.com",
        password: "123"
      });

    // controller phải trả 500
    expect(res.statusCode).toBe(500);

    // kiểm tra error message
    expect(res.body.error).toBe("Database error");

  });

});