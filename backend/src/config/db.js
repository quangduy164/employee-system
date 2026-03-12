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
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected");
  } catch (error) {
    console.log("⏳ MySQL chưa sẵn sàng, thử lại sau 3s...");
    setTimeout(connectDB, 3000);
  }
}

/*
  Chỉ connect database khi KHÔNG phải môi trường test
  Khi Jest chạy thì NODE_ENV = test nên đoạn này sẽ bị bỏ qua
*/
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

module.exports = sequelize;