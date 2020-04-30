const { MessageEmbed } = require("discord.js");
const Command = require("../../struct/Command");
const categoryDescriptions = {
    developer: "Commands related to Yui's core process.\n\nUsage restricted to bot-owners only.",
    fun: "Commands that are fun in some way, such as being a game, or being funny.",
    information: "Commands related to Yui, such as statistics, or general information.\n\nAlso includes some commands to gather general information related to things such as users or servers.",
    search: "Search commands. Usually this means they query an outside API or service, but it can vary.",
    utility: "Utility commands. There to be helpful... Sometimes...",
    config: "Commands to change settings for your guild"
};

module.exports = class Help extends Command{
    constructor(client){
        super(client, {
    name: "help",
    description: "Lists all of my commands or information related to a singularity",
    usage: "<?command|category|args>",
});
}
    async run(message, args) {
        const prefix = await this.client.prefixes.get(message.guild.id) || this.client.config.defaultSettings.prefix;

        if(!args.length) {
            const embed = new MessageEmbed()
                .setTitle("Command Categories:")
                .setColor("2f3136")
                .setDescription(this.client.categories.map(c => `≫ ${this.client.util.firstUpperCase(c)}`).concat(["≫ All"]).sort().join("\n"))
                .setFooter(`Use ${prefix}help <command> to see more information about a category, and the commands that fall into it.`);

            return message.channel.send(embed);
        }

        const name = args[0].toLowerCase();
        let result;

        if(!this.client.categories.includes(this.client.util.firstUpperCase(args[0])) && this.client.commands.get(name) || !this.client.categories.includes(this.client.util.firstUpperCase(args[0])) && this.client.commands.find(cmd => cmd.conf.aliases && cmd.conf.aliases.includes(name))) {
            result = this.client.commands.get(name) || this.client.commands.find(cmd => cmd.conf.aliases && cmd.conf.aliases.includes(name));
            let description = `Name: ${result.help.name}\nCategory: ${result.help.category}`;

            if (result.conf.aliases) description += `\nAliases: ${result.conf.aliases.join(", ")}`;
            if (result.help.description) description += `\nDescription: ${result.help.description}`;
            if (result.help.usage) description += `\nUsage: ${prefix}${result.help.name} ${result.help.usage}`;

            description += `\nCooldown: ${result.cooldown || 3} second(s)`;

            const embed = new MessageEmbed()
                .setDescription(description)
                .setColor("2f3136");

            return message.channel.send(embed);
        } else if(this.client.categories.includes(this.client.util.firstUpperCase(args[0]))) {
            result = this.client.util.firstUpperCase(args[0]);
            
            let cmds = this.client.commands.filter(c => {
                
                if(c.help.category == result) {
                    return true;
                }
                else {return false;}
            }).map(c => {
                return c.help.name;
            });

            const embed = new MessageEmbed()
                .setTitle(`Listing all commands in ${result}`)
                .setDescription(`${categoryDescriptions[result.toLowerCase()]}`)
                .addField("Available Commands:", cmds.sort().join(", "))
                .setColor("2f3136")
                .setFooter(`Use ${prefix}help [COMMAND] to see more information about a command.`);

            return message.channel.send(embed);
        } else if (args[0] == "all" || args[0] == "a") {         
            const embed = new MessageEmbed()
                .setTitle("Listing all available commands:")
                .setColor("2f3136")
                .setDescription(`${this.client.commands.map(c => c.help.name).sort().join(", ")}\n\nUse \`${prefix}help <category>\` to see more information about a specific category.\nUse \`${prefix}help <command>\` to see more information about a specific command.`);
            
            return message.channel.send(embed);
        } else if (args[0] == "args" || args[0] == "arguments") {
            const embed = new MessageEmbed()
                .setTitle("Help with arguments:")
                .setColor("2f3136")
                .setDescription(`Some of Yui's commands use things called arguments. Arguments are the words or symbols that come after a command, and are sometimes used to provide extra options for commands, or user input.\n\nIn the help panel, a command's arguments are explained in the **Usage** section. Usually it looks something like this: \n\n\`\`\`xl\n${prefix}markov <?channel> <?user>\`\`\`\nThe arguments for this command are \`channel\` and \`user\`. We know this because they're surrounded by \`< >\`. Notice how they're prefixed with a \`?\`. This means that they're optional. In the case of the \`${prefix}generate\` command, if the arguments aren't supplied Yui defaults to using the channel the command was called it, and the user who called it.\n\nSometimes though, arguments will be shown like this:\n\n\`\`\`xl\n${prefix}msnmacm <query|list>\`\`\`\nSee that \`|\` character? That means that the command will either take a query (number), or \`list\` for it's arguments.\n\nThat's it! You know everything there is to know about command arguments! Have fun!`);
        
            return message.channel.send(embed);
        } else {
            return message.channel.send(`404 requested function (**${prefix}{name}**) was not found.`);
        }
    }
};