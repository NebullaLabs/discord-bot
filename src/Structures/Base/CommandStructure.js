const NebulaClient = require('../NebulaClient');

class CommandsProps {
    constructor() {
        this.name = '';
        this.description = '';
        this.config = {
            registerSlash: true
        };
    }
}

class CommandStructure {
    /**
     * @param {NebulaClient} client
     * @param {CommandsProps} options
     **/
    constructor(client, options) {
        /**
         * @type {NebulaClient}
         **/
        this.client = client;
        /**
         * @type {CommandsProps}
         **/
        this.options = options;
    }

    /**
     * @returns {Promise<void> | void}
     */
    commandExecute() {}
}

module.exports = CommandStructure;