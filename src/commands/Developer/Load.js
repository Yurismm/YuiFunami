const { join } = require("path");
const { readdirSync } = require("fs");
const { performance } = require("perf_hooks");
const Command = require("../../struct/Command");
module.exports = class Load extends Command{
    constructor(client){
        super(client, {
    
    name: "load",
    description: "Load a command into the bot process",
    usage: "<command|all>",
    aliases: ["l"],
    permissions: "Bot Admin",
        });
    }
    async run(message, args) {
        if(args[0].toLowerCase() == "all" || args[0].toLowerCase() == "a") {
            let start = performance.now();

            let progress = await message.channel.send("Scraping command directories...");

            let Commands = [];
            let newCommands = 0;

            this.client.util.getDirectories(join(__dirname, "..")).forEach(d => {
                let commands = readdirSync(join(__dirname, "..", d)).filter(file => file.endsWith(".js")).map(path => `${d}/${path}`);
                Commands = Commands.concat(...commands);
                progress.edit(`Scraped ${commands.length} commands from directories. Loading them...`);
            });

            Commands.forEach(c => {
                const cmd = require(`../${c}`);
                
                if(this.client.commands.get(cmd.name)) return;
                if (!this.client.categories.includes(cmd.help.category)) return message.channel.send(`${cmd.help.name}'s category must match one of ${this.client.categories}. Got ${cmd.help.category} instead.`);
                if(cmd.auto && cmd.patterns) {
                    cmd.patterns.forEach(p => {
                        this.client.autoCommands.set(p, cmd);
                        this.client.autoPatterns.push(p);
                    });
                }
                
                
                this.client.commands.set(cmd.help.name, cmd);
                newCommands++;
            });

            let stop = performance.now();

            return progress.edit(`Done. Loaded ${newCommands} new command${newCommands > 1 ? "s" : ""} in ${(stop - start).toFixed(2)} ms. It's recommended you run \`$rebuild_auto\` now.`);

        } else {
            let name = this.client.util.capitalize(args[0]);
            let Commands = [];

            if(this.client.commands.get(args[0])) return message.channel.send("That command has already been loaded.");

            this.client.util.getDirectories(join(__dirname, "..")).forEach(d => {
                let commands = readdirSync(join(__dirname, "..", d)).filter(file => file.endsWith(".js")).map(path => `${d}/${path}`);
                Commands = Commands.concat(...commands);
            });

            let [path] = Commands.filter(c => c.endsWith(`/${name}.js`));
            delete require.cache[require.resolve(`../${path}`)];
            
            let cmd = require(`../${path}`);


            if (!this.client.categories.includes(cmd.help.category)) return message.channel.send(`${cmd.help.name}'s category must match one of ${this.client.categories}. Got ${cmd.help.category ? cmd.help.category : "no category"} instead.`);

          
            this.client.commands.set(cmd.help.name, cmd);

            return message.channel.send(`Successfully loaded \`${cmd.help.name}\`. It's recommended you run \`$rebuild_auto\` now.`);
        }
    }
};