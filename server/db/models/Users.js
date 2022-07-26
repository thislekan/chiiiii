const { Model, DataTypes, Sequelize } = require("sequelize");
const config = require("../../config/database");
// import config from "config";

const sequelize = new Sequelize(`${config.DATABASE_URL}`);

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Anonymous User",
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    modelName: "User",
    sequelize,
  }
);
