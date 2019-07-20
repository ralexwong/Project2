
module.exports = function(sequelize, DataTypes) {
  var Info = sequelize.define("Info", {
    title: {      
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });





  return Info;
};
