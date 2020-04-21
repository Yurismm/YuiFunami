const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "guild",
    aliases: ["guildinfo"],
    description: "Retrieves information about the current guild",
    guildOnly: true,
    category: "Information",
    execute(message) {
        const embed = new MessageEmbed()
            .setTitle(`Information for ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL)
            .addField("ID:", message.guild.id, true)
            .addField("Size:", message.guild.memberCount, true)
            .addField("Region:", message.guild.region.charAt(0).toUpperCase() + message.guild.region.slice(1), true)
            .addField("Owner:", `${message.guild.owner} (${message.guild.ownerID})`, true)
            .setColor("2f3136");

        return message.channel.send(embed);
    }
};