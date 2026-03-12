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
    jest.resetModules();

    authenticateMock = jest.fn();

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

    const { sequelize } = require("../config/db");

    expect(sequelize).toBeDefined();

  });

  // ================= CONNECT SUCCESS =================
  test("should log success when database connects", async () => {

    authenticateMock.mockResolvedValue(true);

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });

    const { connectDB } = require("../config/db");

    await connectDB();

    expect(consoleSpy).toHaveBeenCalledWith("MySQL Connected");

    consoleSpy.mockRestore();

  });

  // ================= CONNECT FAIL =================
  test("should retry when database connection fails", async () => {

    jest.useFakeTimers();

    authenticateMock
      .mockRejectedValueOnce(new Error("DB error"))
      .mockResolvedValueOnce(true);

    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => { });
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => { });

    const { connectDB } = require("../config/db");

    const promise = connectDB();

    // chạy timer 3s
    await jest.advanceTimersByTimeAsync(3000);

    await promise;

    expect(consoleLogSpy).toHaveBeenCalledWith("⏳ Retry in 3 seconds...");
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();

  });

});