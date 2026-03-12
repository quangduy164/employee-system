const request = require("supertest");
const express = require("express");

// mock controller để test route độc lập
jest.mock("../controllers/authController");

const authController = require("../controllers/authController");
const authRoutes = require("../routes/authRoutes");

describe("Auth Routes", () => {

  let app;

  beforeEach(() => {

    // tạo express app giả để mount route
    app = express();
    app.use(express.json());
    app.use("/api", authRoutes);

    jest.clearAllMocks();

  });

  // ================= LOGIN SUCCESS =================
  test("POST /api/login should call authController.login", async () => {

    // mock controller trả response thành công
    authController.login.mockImplementation((req, res) => {
      res.status(200).json({ token: "fake-jwt-token" });
    });

    const res = await request(app)
      .post("/api/login")
      .send({
        username: "admin",
        password: "123456"
      });

    // kiểm tra controller được gọi
    expect(authController.login).toHaveBeenCalled();

    // kiểm tra response
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ token: "fake-jwt-token" });

  });


  // ================= LOGIN ERROR =================
  test("POST /api/login should handle controller error", async () => {

    // mock controller trả lỗi
    authController.login.mockImplementation((req, res) => {
      res.status(401).json({ message: "Invalid credentials" });
    });

    const res = await request(app)
      .post("/api/login")
      .send({
        username: "wrong",
        password: "wrong"
      });

    // kiểm tra controller được gọi
    expect(authController.login).toHaveBeenCalled();

    // kiểm tra response lỗi
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ message: "Invalid credentials" });

  });

});