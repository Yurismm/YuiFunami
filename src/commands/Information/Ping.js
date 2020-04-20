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
<<<<<<< HEAD
            .setDescription(`Gateway: **${client.ws.ping.toFixed(2)}**\nMessage: **${sent.createdTimestamp - message.createdTimestamp}ms**`);

        return sent.edit(embed);
=======
            .setDescription(`Gateway: **${client.ws.ping.toFixed(2)}**\nMessage: **${sent.createdTimestamp - message.createdTimestamp}ms**`)

        return sent.edit("", { embed });
>>>>>>> b027eec6c2bc431ff09a3c5e7d3617f1293aedf4
    }
};