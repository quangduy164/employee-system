require("dotenv").config();

const app = require("./app");
const { sequelize, connectDB } = require("./config/db");

const PORT = process.env.BACKEND_PORT || 3000;

async function startServer() {
  await connectDB();
  await sequelize.sync();

  console.log("Database connected");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// không chạy server khi test
if (process.env.NODE_ENV !== "test") {
  startServer().catch((error) => {
    console.error("Server start failed:", error);
  });
}

module.exports = app;