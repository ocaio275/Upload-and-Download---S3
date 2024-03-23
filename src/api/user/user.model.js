const Sequelize = require("sequelize");
const db = require("../../config/mysql");

const UserModel = db.define(
  "users",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      type: Sequelize.UUID,
      unique: true,
    },
    email: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
      field: "created_at",
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
      field: "updated_at",
      type: Sequelize.DATE,
    },
    deletedAt: {
      allowNull: true,
      field: "deleted_at",
      type: Sequelize.DATE,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = UserModel;
