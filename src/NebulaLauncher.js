const NebulaClient = require('./NebulaClient');
const { GatewayIntentBits } = require('discord.js');
require('dotenv').config();

new NebulaClient({
    intents: [
        GatewayIntentBits.Guilds
    ]
}).connect();