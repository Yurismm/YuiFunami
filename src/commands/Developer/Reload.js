const Config = require("../../helper/Config");
const { join } = require("path");
const { performance } = require("perf_hooks");
const Command = require('../../struct/Command')
module.exports = class Reload extends Command{
    constructor(client){
        super(client, {
    
    name: "reload",
    description: "Reload a command within the bot process",
    usage: "<command|all|config>",
    aliases: ["rl"],
    permissions: ["Bot Admin"],
        })
    }
    async run(message, args) {
        if(args[0].toLowerCase() == "all" || args[0].toLowerCase() == "a") {
            let start = performance.now();

            let progress = await message.channel.send("Sweeping Commands...");

            let toReload = this.client.commands.array();

            this.client.commands.sweep(() => true);

            progress.edit("Commands swept. Scraping command directories...");

            toReload.forEach(c => {
                delete require.cache[require.resolve(`../${c.ABSOLUTE_PATH}`)];
                const cmd = require(`../${c.ABSOLUTE_PATH}`);
                if(!this.client.rawCategories.includes(cmd.category.toUpperCase())) return message.channel.send(`${cmd.name}'s category must match one of ${this.client.rawCategories}. Got ${cmd.category} instead.`);
                cmd.ABSOLUTE_PATH = c.ABSOLUTE_PATH;
                if (!cmd.permissions || typeof cmd.permissions !== "object") cmd.permissions = [];
                this.client.commands.set(cmd.name, cmd);
            });
 
            let stop = performance.now();

            return progress.edit(`Done. Reloaded ${toReload.length} command${toReload.length > 1 ? "s" : ""} in ${(stop - start).toFixed(2)} ms. It's recommended you run \`$rebuild_auto\` now.`);
        } else if(args[0].toLowerCase() == "config" || args[0].toLowerCase() == "c") {
            let config = new Config(join(__dirname, "..", "..", "..", "config.js"));

            this.client.config = config;

            message.channel.send("Successfully reloaded config.");

        } else {          
            let command = this.client.commands.get(args[0]);

            if (!command) return message.channel.send(`That command couldn't be found within my processes. Try loading it with \`$load ${args[0]}\``);

            delete require.cache[require.resolve(`../${command.ABSOLUTE_PATH}`)];
            this.client.commands.delete(command.name);

            const cmd = require(join(this.client.commandPath, `${command.ABSOLUTE_PATH}`));

            if(!this.client.rawCategories.includes(cmd.category.toUpperCase())) return message.channel.send(`${cmd.name}'s category must match one of ${this.client.rawCategories}. Got ${cmd.category} instead.`);

            cmd.ABSOLUTE_PATH = command.ABSOLUTE_PATH;
            if (!cmd.permissions || typeof cmd.permissions !== "object") cmd.permissions = [];
            this.client.commands.set(cmd.name, cmd);

            return message.channel.send(`Successfully reloaded \`${cmd.name}\`. It's recommended you run \`$rebuild_auto\` now.`);
        }
    }
};