const { MessageEmbed } = require("discord.js");
const Command = require("../../struct/Command");
module.exports = class Ping extends Command{
    constructor(client){
        super(client, {
            name: "ping",
            description: "Return the bots response times.",
            category: "Information"
        });
    }
    async execute(message) {
        const sent = await message.channel.send("Performing calculations...");
    
        const embed = new MessageEmbed()
            .setColor("2f3136")
            .setTitle("Ping!")
            .setDescription(`Gateway: **${this.client.ws.ping.toFixed(2)}**\nMessage: **${sent.createdTimestamp - message.createdTimestamp}ms**`);

        return sent.edit("", { embed });
    }
};    
    