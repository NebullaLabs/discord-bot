const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

module.exports = {
  start() {
    try {
      mongoose.connect(process.env.DATABASE_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("[DATABASE] Mongoose has successfully connected to the client.")
    } catch(err) {
      console.log("[DATABASE] An error occurred while connecting to the database.")
    }
  }
}