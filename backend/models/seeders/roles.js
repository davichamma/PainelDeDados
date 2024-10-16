// seeders/xxxx-roles.js

module.exports = {
    up: async (queryInterface, Sequelize) => {
      // Insert roles
      await queryInterface.bulkInsert('Roles', [
        {
          roleName: 'Gerente',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleName: 'Analista',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleName: 'Superintendente',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleName: 'Telemarketing',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    },
  
    down: async (queryInterface, Sequelize) => {
      // Delete roles
      await queryInterface.bulkDelete('Roles', null, {});
    },
  };