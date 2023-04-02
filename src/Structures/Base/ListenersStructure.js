const NebulaClient = require('../NebulaClient');

class ListenersProps {
    constructor() {
        /**
         * @type {keyof typeof import('discord.js').Events} 
         **/
        this.name = '';
        this.once = false;
    }
}

class ListernerStructure {
    /**
     * @param {NebulaClient} client
     * @param {ListenersProps} options
     **/
    constructor(client, options) {
        /**
         * @type {NebulaClient}
         **/
        this.client = client;
        /**
         * @type {ListenersProps}
         **/
        this.options = options;
    }

    /**
     * @returns {Promise<void> | void}
     */
    eventExecute(...args) {
        return { args };
    }
}

module.exports = ListernerStructure;