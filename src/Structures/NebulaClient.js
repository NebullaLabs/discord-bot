const { Client, ClientOptions, Collection } = require('discord.js');
const { readdirSync, PathOrFileDescriptor } = require('node:fs');
const { join } = require('node:path');
const { Logger } = require('../Utils/util');
const { GuildSchema, UserSchema } = require('../Database/Schemas/index');

class NebulaClient extends Client {
    /**
     * @param {ClientOptions} options 
     */
    constructor(options) {
        super(options);
        this.commands = new Collection();
        this.logger = new Logger();
        this.database = {
            guilds: GuildSchema,
            users: UserSchema
        };
    }

    /**
     * @returns {Promise<void>}
     */
    async connect() {
        await super.login(process.env.CLIENT_TOKEN);
        await this.loadCommands('../Commands');
        await this.loadEvents('../Listeners');
        this.databaseInit();
    }

    /**
     * @returns {Promise<void>}
     */
    async registryCommands(command) {
        await this.application.commands.set(command)
            .then((commands) => this.logger.info(`Registered ${commands.map((command) => command).length} slash command sucessfully.`))
            .catch((err) => this.logger.error(err, this.registryCommands.name));
    }

    /**
     * @returns {void}
     */
    databaseInit() {
        const { dbConnection } = require('../Database/index');
        new dbConnection(this).initialize();
    }

    /**
     * @param {PathOrFileDescriptor} path 
     * @returns {Promise<void>}
     */
    async loadCommands(path) {
        const commandDir = join(__dirname, path);
        const categories = readdirSync(commandDir, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);

        const commands = await Promise.all(
            categories.map(async (category) => {
                const folderPath = join(commandDir, category);
                const files = readdirSync(folderPath, { withFileTypes: true })
                    .filter((dirent) => dirent.isFile() && dirent.name.endsWith('.js'))
                    .map((dirent) => dirent.name);

                const folderCommands = await Promise.all(
                    files.map((file) => {
                        const commandClass = require(join(folderPath, file));
                        const command = new commandClass(this);

                        return this.commands.set(command.options.name, command);
                    })
                );

                return folderCommands;
            })
        );

        this.logger.info(`Added ${commands.flat().length} commands for the client!`, 'Commands');
    }

    /**
     * @param {PathOrFileDescriptor} path 
     * @returns {Promise<void>}
     */
    async loadEvents(path) {
        const eventDir = join(__dirname, path);
        const categories = readdirSync(eventDir, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);

        const events = await Promise.all(
            categories.map(async (category) => {
                const folderPath = join(eventDir, category);
                const files = readdirSync(folderPath, { withFileTypes: true })
                    .filter((dirent) => dirent.isFile() && dirent.name.endsWith('.js'))
                    .map((dirent) => dirent.name);

                const folderEvents = await Promise.all(
                    files.map((file) => {
                        const listenerClass = require(join(folderPath, file));
                        const listener = new listenerClass(this);

                        return listener.options.once
                            ? this.once(listener.options.name, (...args) => listener.eventExecute(...args))
                            : this.on(listener.options.name, (...args) => listener.eventExecute(...args));
                    })
                );

                return folderEvents;
            })
        );

        this.logger.info(`Added ${events.flat().length} events for the client!`, 'Events');
    }
}

module.exports = NebulaClient;