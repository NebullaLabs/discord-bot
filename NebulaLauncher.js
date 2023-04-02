const NebulaClient = require('./src/Structures/NebulaClient');
const { GatewayIntentBits } = require('discord.js');
require('dotenv').config();

new NebulaClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ]
}).connect();