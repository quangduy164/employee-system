require("dotenv").config();

const express = require("express");
const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use("/api", employeeRoutes);
app.use("/api", authRoutes);

module.exports = app;