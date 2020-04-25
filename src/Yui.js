const { Client, Collection } = require('discord.js');
const { join } = require('path');
const { readdirSync, readdir } = require('fs');

const Config = require('./helper/Config');

const Logger = require('./helper/Logger');

const util = require('./util/Util');

class YuiClient extends Client {
    constructor(props) {
        super(props);

        this.InviteURL =
            'https://discordapp.com/oauth2/authorize?client_id=456910763504697363&scope=bot&permissions=8';
        this.githubURL = 'https://github.com/xgrvaeli/YuiFunami';
        this.githubAPI = 'https://api.github.com/repos/xgrvaeli/YuiFunami';

        this.developers = [
            '228872946557386752', // xgrvaeli
            '210324193391149056', // Dodo
            '358970589697933314', // Cherie
            '205014454042099712', // Meliodas
            '460892852889845780', // MendtheMiner
            '293159670040887297', // mariobob
        ];

        this.logger = Logger;

        this.config = require('./config.js');

        this.debug = this.config.debug || process.argv[2];

        this.commandPath = join(__dirname, '..', 'commands');
        this.eventPath = join(__dirname, '..', 'events');
        this.commands = new Collection();
        this.aliases = new Collection();

        this.rawCategories = [
            'DEVELOPER',
            'FUN',
            'INFORMATION',
            'SEARCH',
            'UTILITY',
        ];

        this.rawPermissions = [
            'DEVELOPER', // Developer Only
            'GUILDONLY', // Guild Only
            'DISABLED', // Disabled
            'HIDDEN', // Hidden
        ];

        this.prefixes = {
            global: this.config.bot.prefix,
        };

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

    /**
     * Loads all available events
     * @param {string} path
     */
    loadEvents(path = this.eventPath) {
        readdir(path, (err, files) => {
            if (err) this.logger.error(err);
            files = files.filter((f) => f.split('.').pop() === 'js');
            if (files.length === 0) return this.logger.warn('No events found');
            if (this.debug)
                this.logger.info(`${files.length} event(s) found...`);

            files.forEach((f) => {
                let eventName = f.substring(0, f.indexOf('.')).split('');
                eventName[0] = eventName[0].toLowerCase();
                eventName = eventName.join('');
                const event = new (require(join(path, f)))(this);

                super.on(eventName, (...args) => event.execute(...args));

                delete require.cache[require.resolve(join(path, f))]; // Clear cache

                if (this.debug) this.logger.info(`Loading event: ${eventName}`);
            });
        });

        return this;
    }

    /**
     * Load all available commands.
     * @param {string} path The path to load commands from. Defaults to client.commandPath
     */
    loadCommands(path = this.commandPath) {
        let Commands = [];

        util.getDirectories(path).forEach((d) => {
            let commands = readdirSync(join(path, d))
                .filter((file) => file.endsWith('.js'))
                .map((path) => `${d}/${path}`);
            Commands = Commands.concat(...commands);
        });

        if (this.debug) this.logger.info(`${Commands.length} commands found`);

        for (const File of Commands) {
            const cmd = new (require(`../commands/Information/Ping`))(this);

            this.commands.set(cmd.help.name, cmd);
            cmd.help.aliases.forEach((a) => this.aliases.set(a, cmd.help.name));
        }

        return this;
    }

    /**
     * Initializes Yui
     * .
     * @param {string} token The bot token
     */
    init(token = this.config.secret.token) {
        this.loadEvents();
        this.loadCommands();
        this.login(token);
    }

    /**
     * Finds a member from a string, mention, or id
     * @property {string} msg The message to process
     * @property {string} suffix The username to search for
     * @property {bool} self Whether or not to default to yourself if no results are returned. Defaults to false.
     */
    findMember(msg, suffix, self = false) {
        if (!suffix) {
            if (self) return msg.member;
            else return null;
        } else {
            let member =
                msg.mentions.members.first() ||
                msg.guild.members.cache.get(suffix) ||
                msg.guild.members.cache.find(
                    (m) =>
                        m.displayName
                            .toLowerCase()
                            .includes(suffix.toLowerCase()) ||
                        m.user.username
                            .toLowerCase()
                            .includes(suffix.toLowerCase())
                );
            return member;
        }
    }

    /**
     * Replaces certain characters and fixes mentions in messages.
     * @property {string} text The text to clean
     */
    async clean(text) {
        if (text && text.constructor.name == 'Promise') text = await text;
        if (typeof text !== 'string')
            text = require('util').inspect(text, { depth: 1 });
        let cleanRegex = new RegExp(
            `${this.config.secret.token}|${this.config.secret['cb-token']}|${this.config.secret['repo-token']}`,
            'g'
        );
        if (
            text.indexOf(this.config.secret.token) !== -1 ||
            text.indexOf(this.config.secret['cb-token']) !== -1 ||
            text.indexOf(this.config.secret['repo-token'] !== -1)
        )
            text = text.replace(
                cleanRegex,
                this.util.randomElementFromArray([
                    '[redacted]',
                    '[DATA EXPUNGED]',
                    '[REMOVED]',
                    '[SEE APPENDIUM INDEX A494-A]',
                ])
            );

        text = text
            .replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(/@/g, '@' + String.fromCharCode(8203));

        return text;
    }
    /**
     * Checks if user is a bot developer
     * @param {User} userID the User's ID
     */
    isDev(id) {
        if (typeof id !== 'string') throw new Error('ID must be a string!');
        if (this.developers.includes(id)) return true;
        else return false;
    }

    /**
     * Check if the given permissions are valid.
     * @param {Array} cmdPerms The command's `permissions` array
     * @param {Array} permission The permission to check for
     */
    check(cmdPerms, permission) {
        return cmdPerms.includes(this.rawPermissions[permission]);
    }
}

const client = new YuiClient();

const init = async () => {
    const categories = await client.getDirs('./commands');

    categories.forEach((c) => {
        klaw(`./commands/${c}`).on('data', (item) => {
            const cmdFile = path.parse(item.path);
            if (!cmdFile.ext || cmdFile.ext !== '.js') return;
            const response = client.loadCommand(
                cmdFile.dir,
                `${cmdFile.name}${cmdFile.ext}`
            );
            if (response) client.logger.error(response);
        });
    });

    const evtFiles = await readdir('./events/');
    client.logger.log(`Loading a total of ${evtFiles.length} events.`, 'log');
    evtFiles.forEach((file) => {
        const eventName = file.split('.')[0];
        client.logger.log(`Loading Event: ${eventName}`);
        const event = new (require(`./events/${file}`))(client);
        client.on(eventName, (...args) => event.run(...args));
        delete require.cache[require.resolve(`./events/${file}`)];
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
