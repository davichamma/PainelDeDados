// models/Group.js
module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      groupName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      timestamps: false, // Disable `createdAt` and `updatedAt`
    });
  
    // Defining associations
    Group.associate = function(models) {
      Group.hasMany(models.Report, {
        foreignKey: 'groupId',
        as: 'reports',
      });
    };
  
    return Group;
  };
  