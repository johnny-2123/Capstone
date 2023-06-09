'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {

    options.tableName = 'Words';

    await queryInterface.bulkInsert(options, [

      // game 1 round 1
      { roundId: 1, userId: 1, wordText: 'brett' },
      { roundId: 1, userId: 2, wordText: 'christmas' },

      // game 1 round 2
      { roundId: 2, userId: 1, wordText: 'cameron' },
      { roundId: 2, userId: 2, wordText: 'eggnog' },

      // game 1 round 3
      { roundId: 3, userId: 1, wordText: 'pajamas' },
      { roundId: 3, userId: 2, wordText: 'pajamas' },

      // game 2 round 1
      { roundId: 4, userId: 1, wordText: 'taylor swift' },
      { roundId: 4, userId: 2, wordText: 'bowser' },

      // game 2 round 2
      { roundId: 5, userId: 1, wordText: 'anti hero' },
      { roundId: 5, userId: 2, wordText: 'anti hero' },

      // game 3 round 1
      { roundId: 6, userId: 1, wordText: 'oklahoma' },
      { roundId: 6, userId: 2, wordText: 'bread' },

      // game 3 round 2
      { roundId: 7, userId: 1, wordText: 'brett' },
      { roundId: 7, userId: 2, wordText: 'cinnamon rolls' },

      // game 3 round 3
      { roundId: 8, userId: 1, wordText: 'gay son on a honeybun' },
      { roundId: 8, userId: 2, wordText: 'gay son on a honeybun' },

      // game 4 round 1
      { roundId: 9, userId: 1, wordText: 'latino' },
      { roundId: 9, userId: 2, wordText: 'indian' },

      // game 4 round 2
      { roundId: 10, userId: 1, wordText: 'puja papi' },
      { roundId: 10, userId: 2, wordText: 'pooja papi' },
    ]);

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Words';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      roundId: { [Op.between]: [1, 20] }
    }, {});
  }
};
