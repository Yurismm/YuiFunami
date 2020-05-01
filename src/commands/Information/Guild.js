const { MessageEmbed } = require("discord.js");
const Command = require("../../struct/Command");
const colors = require("../../util/Colors");
module.exports = class Guild extends Command {
  constructor(client) {
    super(client, {
      name: "guild",
      aliases: ["guildinfo"],
      description: "Retrieves information about the current guild",
      permissions: ["User"],
    });
  }
  run(message) {
    const embed = new MessageEmbed()
      .setTitle(`Information for ${message.guild.name}`)
      .setThumbnail(message.guild.iconURL)
      .addField("ID:", message.guild.id, true)
      .addField("Size:", message.guild.memberCount, true)
      .addField(
        "Region:",
        message.guild.region.charAt(0).toUpperCase() +
          message.guild.region.slice(1),
        true
      )
      .addField(
        "Owner:",
        `${message.guild.owner} (${message.guild.ownerID})`,
        true
      )
      .setColor(colors.embeds);

    return message.channel.send(embed);
  }
};
