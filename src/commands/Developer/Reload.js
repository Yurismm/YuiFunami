
const { join } = require("path");
const { performance } = require("perf_hooks");
const Command = require("../../struct/Command");
const {firstUpperCase} = require("../../util/Util");
module.exports = class Reload extends Command{
    constructor(client){
        super(client, {
    
    name: "reload",
    description: "Reload a command within the bot process",
    usage: "<command|all|config>",
    aliases: ["rl"],
    permissions: ["Bot Admin"],
        });
    }
    async run(message, args) {
        if(args[0].toLowerCase() == "all" || args[0].toLowerCase() == "a") {
            let start = performance.now();

            let progress = await message.channel.send("Sweeping Commands...");

            let toReload = this.client.commands.array();

            this.client.commands.sweep(() => true);

            progress.edit("Commands swept. Scraping command directories...");

            toReload.forEach(c => {
                
                const name = firstUpperCase(c.help.name);
                delete require.cache[require.resolve(`${c.conf.location}/${name}`)];
                const cmd = new(require(join(`${c.conf.location}`,`${name}`)))(this.client);
                
                cmd.conf.location = c.conf.location;
                
                this.client.commands.set(cmd.help.name, cmd);
            });
 
            let stop = performance.now();

            return progress.edit(`Done. Reloaded ${toReload.length} command${toReload.length > 1 ? "s" : ""} in ${(stop - start).toFixed(2)} ms. It's recommended you run \`$rebuild_auto\` now.`);
        }else {          
            let command = this.client.commands.get(args[0]);

            if (!command) return message.channel.send(`That command couldn't be found within my processes. Try loading it with \`$load ${args[0]}\``);

            delete require.cache[require.resolve(join(`${command.conf.location}`,firstUpperCase(command.help.name)))];
            this.client.commands.delete(command.name);

            const cmd = new(require(join(`${command.conf.location}`,firstUpperCase(command.help.name))))(this.client);

            

            cmd.conf.location = command.conf.location;
            
            this.client.commands.set(cmd.name, cmd);

            return message.channel.send(`Successfully reloaded \`${cmd.help.name}\`. It's recommended you run \`$rebuild_auto\` now.`);
        }
    }
};