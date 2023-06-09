'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {

    options.tableName = 'Games';

    await queryInterface.bulkInsert(options, [
      { user1Id: 1, user2Id: 2, gameOver: true },
      { user1Id: 1, user2Id: 2, gameOver: true },
      { user1Id: 2, user2Id: 1, gameOver: true },
      { user1Id: 2, user2Id: 1, gameOver: true },

    ], options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Games';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }

};
