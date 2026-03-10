require("dotenv").config();

const express = require("express");
const sequelize = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use("/api", employeeRoutes);
app.use("/api", authRoutes);

const PORT = process.env.APP_PORT || 3000;

sequelize.sync()
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });