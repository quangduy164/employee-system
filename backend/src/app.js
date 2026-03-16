require("dotenv").config();

const express = require("express");
const helmet = require("helmet");

const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// hide express signature
app.disable("x-powered-by");

// security headers
app.use(helmet());

// Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "https:"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "http://localhost:5173"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      frameAncestors: ["'self'"],
      formAction: ["'self'"]
    }
  })
);

app.use(express.json());

app.use("/api", employeeRoutes);
app.use("/api", authRoutes);

module.exports = app;