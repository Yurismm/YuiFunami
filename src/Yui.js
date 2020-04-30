const { Client, Collection } = require('discord.js');
const { join, parse, sep } = require('path');
const { readdirSync, readdir } = require('fs');
const klaw = require('klaw');
const Enmap = require('enmap');

const Logger = require('./helper/Logger');

const util = require('./util/Util');

class YuiClient extends Client {
    constructor(props) {
        super(props);

        this.logger = Logger;

        this.config = require('./config');

        
        this.commands = new Collection();
        this.aliases = new Collection();
        this.settings = new Enmap({
            name: 'settings',
            cloneLevel: 'deep',
            fetchAll: false,
            autoFetch: true,
        });


        this.util = util;

        this.giveaways = new Collection();

        this._presence = {
            activities: [
                { title: 'with Axel', type: 0 },
                { title: 'with Cherie', type: 0 },
                { title: 'Dodo', type: 0 },
            ],
            random: () => {
                return util.randomElementFromArray(this._presence.activities);
            },
        };
    }

    permlevel(message) {
        let permlvl = 0;

        const permOrder = this.config.permLevels
            .slice(0)
            .sort((p, c) => (p.level < c.level ? 1 : -1));

        while (permOrder.length) {
            const currentLevel = permOrder.shift();
            if (message.guild && currentLevel.guildOnly) continue;
            if (currentLevel.check(message)) {
                permlvl = currentLevel.level;
                break;
            }
        }
        return permlvl;
    }

    loadCommand(commandPath, commandName,category) {
        try {
            const props = new (require(`${commandPath}${sep}${commandName}`))(
                this
            );
            this.logger.info(`Loading Command: ${props.help.name}`);
            props.conf.location = commandPath;
            if (props.init) {
                props.init(this);
            }
            this.commands.set(props.help.name, props);
            props.conf.aliases.forEach((alias) => {
                this.aliases.set(alias, props.help.name);
            });
            props.help.category = category
            return false;
        } catch (e) {
            return `Unable to load command ${commandName}: ${e}`;
        }
    }

    async unloadCommand(commandPath, commandName) {
        let command;
        if (this.commands.has(commandName)) {
            command = this.commands.get(commandName);
        } else if (this.aliases.has(commandName)) {
            command = this.commands.get(this.aliases.get(commandName));
        }
        if (!command)
            return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;

        if (command.shutdown) {
            await command.shutdown(this);
        }
        delete require.cache[
            require.resolve(`${commandPath}${path.sep}${commandName}.js`)
        ];
        return false;
    }

    async clean(text) {
        if (text && text.constructor.name == 'Promise') text = await text;
        if (typeof text !== 'string')
            text = require('util').inspect(text, { depth: 1 });

        text = text
            .replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(/@/g, '@' + String.fromCharCode(8203))
            .replace(
                this.config.token,
                '[REMOVED]'
            )
            replace(this.config.cb_token, '[REDACTED]')
            .replace(this.config.repo_token, '[CENSORED]')
            .replace(this.config.trello_key, '[CLASSIFIED]')
            .replace(this.config.trello_token,'[FORBIDDEN]')

        return text;
    }

    getSettings(guild) {
        const defaults = this.config.defaultSettings || {};
        const guildData = this.settings.get(guild.id) || {};
        const returnObject = {};
        Object.keys(defaults).forEach((key) => {
            returnObject[key] = guildData[key] ? guildData[key] : defaults[key];
        });
        return returnObject;
    }

    writeSettings(id, newSettings) {
        const defaults = this.settings.get('default');
        let settings = this.settings.get(id);
        if (typeof settings != 'object') settings = {};
        for (const key in newSettings) {
            if (defaults[key] !== newSettings[key]) {
                settings[key] = newSettings[key];
            } else {
                delete settings[key];
            }
        }
        this.settings.set(id, settings);
    }

    async awaitReply(msg, question, limit = 60000) {
        const filter = (m) => m.author.id === msg.author.id;
        await msg.channel.send(question);
        try {
            const collected = await msg.channel.awaitMessages(filter, {
                max: 1,
                time: limit,
                errors: ['time'],
            });
            return collected.first().content;
        } catch (e) {
            return false;
        }
    }

    getDirectories = async (source) =>
        readdirSync(source, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);
}


const client = new YuiClient();

const init = async () => {
    const categories = await client.getDirectories(join(__dirname, 'commands'));
    client.categories  = categories
    categories.forEach((c) => {
        klaw(join(__dirname, 'commands', c)).on('data', (item) => {
            const cmdFile = parse(item.path);
            if (!cmdFile.ext || cmdFile.ext !== '.js') return;
            const response = client.loadCommand(
                cmdFile.dir,
                `${cmdFile.name}${cmdFile.ext}`,c
            
            );
           
            
            if (response) {
                client.logger.error(response)
            };
        });
    });

    const evtFiles = await readdirSync(join(__dirname, 'events'));
    client.logger.info(`Loading a total of ${evtFiles.length} events.`);
    evtFiles.forEach((file) => {
        const eventName = file.split('.')[0];
        client.logger.info(`Loading Event: ${eventName}`);
        const event = new (require(join(__dirname, 'events', file)))(client);
        client.on(eventName.toLowerCase(), (...args) => event.execute(...args));
        delete require.cache[require.resolve(join(__dirname, 'events', file))];
    });

    client.levelCache = {};
    for (let i = 0; i < client.config.permLevels.length; i++) {
        const thisLevel = client.config.permLevels[i];
        client.levelCache[thisLevel.name] = thisLevel.level;
    }

    client.login(client.config.token);
};

init();

client
    .on('disconnect', () => client.logger.warn('Bot is disconnecting...'))
    .on('reconnecting', () => client.logger.log('Bot reconnecting...', 'log'))
    .on('error', (e) => client.logger.error(e))
    .on('warn', (info) => client.logger.warn(info));

String.prototype.toProperCase = function () {
    return this.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};

process.on('uncaughtException', (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
    console.error('Uncaught Exception: ', errorMsg);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('Uncaught Promise Error: ', err);
});
