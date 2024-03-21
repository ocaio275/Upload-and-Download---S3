"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
    });
    await queryInterface.sequelize.query(`
      CREATE TRIGGER before_insert_user
      BEFORE INSERT ON user
      FOR EACH ROW
      IF(new.id is null)
        THEN SET new.id = uuid();
      END IF;
    `);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("user");
  },
};
