const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const Employee = sequelize.define("Employee", {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },

  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },

  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  }

}, {
  tableName: "employees",
  timestamps: true   // Sequelize tự tạo createdAt và updatedAt
});

module.exports = Employee;