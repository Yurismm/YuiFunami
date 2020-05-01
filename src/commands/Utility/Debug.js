const { MessageEmbed } = require("discord.js");
const { join } = require("path");
const { readdirSync } = require("fs");
const Command = require("../../struct/Command");
const colors = require("../../util/Colors");

module.exports = class Debug extends Command{
    constructor(client){
        super(client, {    
    name: "debug",
    description: "Yui debug information.",
    aliases: ["information"],
        });
    }
    async run(message, args) {
        let prefixes = [];
        let allCommands = [];

        for(const prefix in client.prefixes) {
            prefixes.push([prefix, client.prefixes[prefix]]);
        }

        this.client.util.getDirectories(join(__dirname, "..")).forEach(d => {
            let commands = readdirSync(join(__dirname, "..", d)).filter(file => file.endsWith(".js")).map(path => `${d}/${path}`);
            
            allCommands = allCommands.concat(...commands);
        });

        let availableCommands = allCommands.length - this.client.commands.size;
        
        const embed = new MessageEmbed()
            .setTitle("Debug for Yui Funami:")
            .setColor(colors.embeds)
            .addField("Web:", "Inactive")
            .addField("Commands:", `Loaded: ${this.client.commands.size}\nAvailable: ${availableCommands}`)
            .addField("Permissions:", `Add Reactions: ${message.guild.me.hasPermission("ADD_REACTIONS")}\nManage Messages: ${message.guild.me.hasPermission("MANAGE_MESSAGES")}\nRead Messages: ${message.guild.me.hasPermission("VIEW_CHANNEL")}\nRead Message History: ${message.guild.me.hasPermission("READ_MESSAGE_HISTORY")}\nSend Messages: ${message.guild.me.hasPermission("SEND_MESSAGES")}`);

        return message.channel.send(embed);
    }
};
