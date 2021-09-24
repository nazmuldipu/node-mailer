const mongoose = require("mongoose");

module.exports = function () {
  const db = "mongodb://localhost/node_micro_mailer";
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log(`Connected to ${db}...`));
};
