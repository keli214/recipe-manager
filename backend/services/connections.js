var mongoose = require("mongoose");
var config = require("config");

mongoose.Promise = global.Promise;
let options = {
  autoIndex: false,
};

mongoose
  .connect(config.get("mongodb.connectionString"), options)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

module.exports = mongoose;
