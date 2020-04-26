const { performance } = require("perf_hooks");

module.exports = class Unload extends Command{
    constructor(client){
        super(client, {
    
    name: "unload",
    description: "Unload a command from the bot process",
    usage: "<command|all>",
    aliases: ["ul"],
    permissions: ["Bot Admin"],
})
}
    async run(message, args) {
        if(args[0].toLowerCase() == "all" || args[0].toLowerCase() == "a") {
            let start = performance.now();

            let commands = this.client.commands.filter(c => c.category != "Developer");

            let progress = await message.channel.send("Clearing require cache...");

            this.client.commands.each(async c => {
                if (c.category == "Developer") return;

                delete require.cache[require.resolve(`../${c.ABSOLUTE_PATH}`)];
                progress.edit(`Removed \`${c.name}\` from require cache...`);
            });
            
            progress.edit("Sweeping commands...");

            this.client.commands.sweep(c => c.category != "Developer");
            this.client.autoCommands.sweep(() => true);
            this.client.autoPatterns = [];

            let stop = performance.now();
            
            return progress.edit(`Done. Unloaded ${commands.size} command${commands.size > 1 ? "s" : ""} in ${(stop - start).toFixed(2)} ms. It's recommended you run \`$rebuild_auto\` now.`);
        } else {           
            let command = this.client.commands.get(args[0]);

            if(command.auto) {
                this.client.autoCommands.sweep(cmd => cmd.name == command.name);
                this.client.autoPatterns = this.client.autoPatterns.filter(p => !command.patterns.includes(p));
            }

            if (!command) return message.channel.send("That command couldn't be found within my files.");

            client.commands.delete(command.name);
            delete require.cache[require.resolve(`../${command.ABSOLUTE_PATH}`)];

            return message.channel.send(`Successfully unloaded \`${command.name}\`. It's recommended you run \`$rebuild_auto\` now.`);
        }
    }
};