/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var topMovieData = sequelize.define(
    "topMovieData",
    {
      api_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      release_year: DataTypes.INTEGER,
      rating: DataTypes.STRING,
      image_url: DataTypes.STRING
    },
    {
      timestamps: false
    }
  );
  return topMovieData;

  // var Example = sequelize.define("Example", {
  //   text: DataTypes.STRING,
  //   description: DataTypes.TEXT
  // });
  // return Example;
};
