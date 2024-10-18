// models/Report.js
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Group is optional
      references: {
        model: 'Groups',
        key: 'id',
      },
    },
  }, {
    timestamps: false, // Disable `createdAt` and `updatedAt`
  });

  // Defining associations
  Report.associate = function(models) {
    Report.belongsTo(models.Group, {
      foreignKey: 'groupId',
      as: 'group',
    });
  };

  return Report;
};
