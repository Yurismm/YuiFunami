const { Client, Collection } = require("discord.js");
const { join } = require("path");
const { readdirSync, readdir } = require("fs");
const { js } = require("js-beautify");

const Config = require("../helper/Config");

const Logger = require("../helper/Logger");

const util = require("../util/Util");

class YuiClient extends Client {
    constructor(props) {
        super(props);
        
        this.InviteURL = "https://discordapp.com/oauth2/authorize?client_id=456910763504697363&scope=bot&permissions=8";
        this.githubURL = "https://github.com/Yurismm/YuiBotRewrite-Js-";
        this.githubAPI = "https://api.github.com/repos/Yurismm/YuiBotRewrite-Js-";

        this.developers = [
            "228872946557386752",  //xgrvaeli
            "210324193391149056",  //dodo
            "358970589697933314"   //cherie
        ];

        this.logger = Logger;

        this.config = new Config(join(__dirname, "..", "..", "Config.toml"));

        this.debug = this.config.debug || process.argv[2];

        this.commandPath = join(__dirname, "..", "commands");
        this.eventPath = join(__dirname, "..", "events");
        this.commands = new Collection();
        this.autoCommands = new Collection();
        this.autoPatterns = [];

        this.rawCategories = [
            "ADMINISTRATIVE",
            "FUN",
            "INFORMATION",
            "SEARCH",
            "UTILITY"
        ];

        this.cooldowns = new Collection();

        this.prefixes = {
            global: this.config.bot.prefix,
        };

        this.util = util;

        this.giveaways = new Collection();

        this._presence = {
            activities: [
                { title: "with Axel", type: 1 }
            ],
            random: () => {
                return util.randomElementFromArray(this._presence.activities);
            }
        };
    }

    /**
     * Loads all available events
     * @param {string} path 
     */
    loadEvents(path = this.eventPath) {
        readdir(path, (err, files) => {
            if (err) this.logger.error(err);
            files = files.filter(f => f.split(".").pop() === "js");
            if (files.length === 0) return this.logger.warn("No events found");
            if(this.debug) this.logger.info(`${files.length} event(s) found...`);
            
            files.forEach(f => {
                let eventName = f.substring(0, f.indexOf(".")).split("");
                eventName[0] = eventName[0].toLowerCase();
                eventName = eventName.join("");
                const event = require(join(path, f));

                super.on(eventName, event.bind(null, this));

                delete require.cache[require.resolve(join(path, f))]; // Clear cache
                
                if(this.debug) this.logger.info(`Loading event: ${eventName}`);
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

        util.getDirectories(path).forEach(d => {
            let commands = readdirSync(join(path, d)).filter(file => file.endsWith(".js")).map(path => `${d}/${path}`);
            Commands = Commands.concat(...commands);
        });

        if(this.debug) this.logger.info(`${Commands.length} commands found`);

        for (const File of Commands) {
            const cmd = require(`../commands/${File}`);

            if(cmd.auto && cmd.patterns) {
                cmd.patterns.forEach(p => {
                    this.autoCommands.set(p, cmd);
                    this.autoPatterns.push(p);
                });
                cmd.ABSOLUTE_PATH = File;
                this.commands.set(cmd.name, cmd);
            }

            if(!this.rawCategories.includes(cmd.category.toUpperCase())) throw new Error(`Command category must match one of ${this.rawCategories}. Got ${cmd.category} instead.`);

            cmd.ABSOLUTE_PATH = File;
            this.commands.set(cmd.name, cmd);
            if(this.debug) this.logger.info(`Loaded command: ${cmd.name}`);
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
            let member = msg.mentions.members.first() || msg.guild.members.cache.get(suffix) || msg.guild.members.cache.find(m => m.displayName.toLowerCase().includes(suffix.toLowerCase()) || m.user.username.toLowerCase().includes(suffix.toLowerCase()));
            return member;
        }
    }

    /**
     * Replaces certain characters and fixes mentions in messages.
     * @property {string} text The text to clean
     */
    clean(text) {
        let cleanRegex = new RegExp(this.config.secret.token, "g");

        if (text.indexOf(this.config.secret.token) !== -1) text = text.replace(cleanRegex, this.util.randomElementFromArray(["[redacted]", "[DATA EXPUNGED]", "[REMOVED]", "[SEE APPENDIUM INDEX A494-A]"]));
        
        if (typeof (text) === "string") text = text.replace(/` /g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));

        text = js(text, {
            indent_size: 4,
            space_in_empty_paren: true
        });
        
        return text;
    }

    /**
     * Checks if user is the bot owner
     * @param {User} user 
     */
    isOwner(user) {
        if (this.developers.includes(user.id)) return true;
        else return false;
    } 

}

module.exports = YuiClient;