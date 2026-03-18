require("dotenv").config();

const express = require("express");
const helmet = require("helmet");

const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// hide express signature
app.disable("x-powered-by");

// parse JSON
app.use(express.json());

// security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"], // chặt hơn

        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https:"], // React thường cần
        imgSrc: ["'self'", "data:", "https:"],

        connectSrc: [
          "'self'",
          "http://localhost:5173" // frontend dev
        ],

        fontSrc: ["'self'", "https:"],

        objectSrc: ["'none'"],

        baseUri: ["'self'"],

        // FIX lỗi ZAP
        frameAncestors: ["'none'"],   // chống clickjacking
        formAction: ["'self'"],

        // thêm để tránh warning khác
        frameSrc: ["'none'"],
        mediaSrc: ["'self'"]
      }
    }
  })
);

// routes
app.use("/api", employeeRoutes);
app.use("/api", authRoutes);

module.exports = app;