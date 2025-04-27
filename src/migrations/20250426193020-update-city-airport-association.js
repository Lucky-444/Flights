'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addConstraint('Airports', {
       fields: ['cityId'],
       type: 'FOREIGN KEY', 
       name: 'fk_airports_cityId',
       references: {
         table: 'Cities',
         field: 'id'
       },
       onDelete: 'CASCADE',
       onUpdate : 'CASCADE',
       
     })
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.removeConstraint('Airports', 'fk_airports_cityId');
  }
};
