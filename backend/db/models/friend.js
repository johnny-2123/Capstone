'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Friend.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    friend_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING
    },
    date_added: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Friend',
  });
  return Friend;
};
