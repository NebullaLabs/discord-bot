const Client = require("./src/structures/Client.js")
require("dotenv").config()

new Client().connect()