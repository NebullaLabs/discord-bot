const { Client, ClientOptions } = require('discord.js');

class NebulaClient extends Client {
    /**
     * @param {ClientOptions} options 
     */
    constructor(options) {
        super(options);
    }

    async connect() {
        await super.login(process.env.CLIENT_TOKEN);
    }
}

module.exports = NebulaClient;