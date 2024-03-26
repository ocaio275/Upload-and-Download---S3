const Sequelize = require("sequelize");
const db = require("../../config/mysql");

const DocumentModel = db.define("documents", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  key: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  userId: {
    allowNull: false,
    type: Sequelize.UUID,
    field: "user_id",
    references: { model: "users", key: "id" },
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
}, {
  paranoid: true,
});

module.exports = DocumentModel;
