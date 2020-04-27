const { performance } = require("perf_hooks");
const Command = require("../../struct/Command");
const {join} = require("path");
const {firstUpperCase} = require("../../util/Util");
module.exports = class Unload extends Command{
    constructor(client){
        super(client, {
    
    name: "unload",
    description: "Unload a command from the bot process",
    usage: "<command|all>",
    aliases: ["ul"],
    permissions: ["Bot Admin"],
});
}
    async run(message, args) {
        if(args[0].toLowerCase() == "all" || args[0].toLowerCase() == "a") {
            let start = performance.now();

            let commands = this.client.commands.filter(c => c.help.category != "Developer");

            let progress = await message.channel.send("Clearing require cache...");

            this.client.commands.each(async c => {
                if (c.help.category == "Developer") return;

                delete require.cache[require.resolve(join(`${c.conf.location}`,firstUpperCase(c.help.name)))];
                progress.edit(`Removed \`${c.help.name}\` from require cache...`);
                
            });
            
            progress.edit("Sweeping commands...");

            this.client.commands.sweep(c => c.help.category != "Developer");


            let stop = performance.now();
            
            return progress.edit(`Done. Unloaded ${commands.size} command${commands.size > 1 ? "s" : ""} in ${(stop - start).toFixed(2)} ms. It's recommended you run \`$rebuild_auto\` now.`);
        } else {           
            let command = this.client.commands.get(args[0]);

            if (!command) return message.channel.send("That command couldn't be found within my files.");

            this.client.commands.delete(command.name);
            delete require.cache[require.resolve(join(`${command.conf.location}`,firstUpperCase(command.help.name)))];

            return message.channel.send(`Successfully unloaded \`${command.help.name}\`. It's recommended you run \`$rebuild_auto\` now.`);
        }
    }
};