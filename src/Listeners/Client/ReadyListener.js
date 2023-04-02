const { Events } = require('discord.js');
const { ListenerStructure } = require('../../Structures/Base/index');
 
class ReadyListener extends ListenerStructure {
    constructor(client) {
        super(client, {
            name: Events.ClientReady,
            once: true
        });
    }

    async eventExecute() {
        try {
            const commands = this.client.commands.filter((command) => command.options && command.options.config.registerSlash).map((command) => command.options);
            await this.client.registryCommands(commands);
            this.client.logger.info('Client connected without errors.');
        } catch (err) {
            this.client.logger.error(err.stack, ReadyListener.name);
        }
    }
}

module.exports = ReadyListener;