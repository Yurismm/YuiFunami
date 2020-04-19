const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Return the bots response times.",
    category: "Information",
    async execute(message, args, client) {
        const sent = await message.channel.send("Performing calculations...");
    
        const embed = new MessageEmbed()
            .setColor("2f3136")
            .setTitle("Ping!")
            .setDescription(`Gateway: **${client.ws.ping.toFixed(2)}**\nMessage: **${sent.createdTimestamp - message.createdTimestamp}ms**`)

        return sent.edit(embed);
    }
};