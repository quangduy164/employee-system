require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false
  }
);

async function connectDB() {
  while (true) {
    try {
      await sequelize.authenticate();
      console.log("MySQL Connected");
      break;
    } catch (error) {
      console.error("❌ MySQL connection failed:", error.message);
      console.log("⏳ Retry in 3 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
}

module.exports = { sequelize, connectDB };