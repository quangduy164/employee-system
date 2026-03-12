/*
 Test file config/db.js

 Mục tiêu:
 1. Sequelize được khởi tạo
 2. Kết nối DB thành công -> log "MySQL Connected"
 3. Kết nối DB thất bại -> log retry và gọi setTimeout
*/

describe("Database config", () => {

  let authenticateMock;

  beforeEach(() => {

    // reset module cache
    jest.resetModules();

    authenticateMock = jest.fn();

    // mock Sequelize trước khi require db.js
    jest.doMock("sequelize", () => {
      return {
        Sequelize: jest.fn(() => ({
          authenticate: authenticateMock
        }))
      };
    });

  });

  // ================= INIT SEQUELIZE =================
  test("should initialize Sequelize instance", () => {

    process.env.NODE_ENV = "test";

    const sequelize = require("../config/db");

    // kiểm tra instance được tạo
    expect(sequelize).toBeDefined();

  });


  // ================= CONNECT SUCCESS =================
  test("should log success when database connects", async () => {

    process.env.NODE_ENV = "development";

    // giả lập authenticate thành công
    authenticateMock.mockResolvedValue(true);

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });

    require("../config/db");

    // đợi async chạy
    await Promise.resolve();

    // kiểm tra log kết nối thành công
    expect(consoleSpy).toHaveBeenCalledWith("MySQL Connected");

    consoleSpy.mockRestore();

  });


  // ================= CONNECT FAIL =================
  test("should retry when database connection fails", async () => {

    process.env.NODE_ENV = "development";

    // giả lập authenticate lỗi
    authenticateMock.mockRejectedValue(new Error("DB error"));

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });
    const timeoutSpy = jest.spyOn(global, "setTimeout");

    require("../config/db");

    await Promise.resolve();

    // kiểm tra log retry
    expect(consoleSpy).toHaveBeenCalledWith(
      "⏳ MySQL chưa sẵn sàng, thử lại sau 3s..."
    );

    // kiểm tra retry sau 3s
    expect(timeoutSpy).toHaveBeenCalledWith(expect.any(Function), 3000);

    consoleSpy.mockRestore();
    timeoutSpy.mockRestore();

  });

});