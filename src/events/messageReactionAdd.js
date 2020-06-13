const { MessageEmbed } = require("discord.js");
const colors = require("../util/Colors");
module.exports = class {
  constructor(client) {
    this.client = client;
  }
  async execute(reaction, user) {
    if (await this.client.starboards.get(reaction.message.guild.id)) {
      if (reaction.emoji.name === "⭐") {
        if (reaction.message.embeds[0]) {
          return;
        }
        const starboard = await this.client.starboards.get(
          reaction.message.guild.id
        );
        if (reaction.count == starboard.stars) {
          const starchannel = reaction.message.guild.channels.cache.get(
            starboard.channelId
          );
          let content = reaction.message.content;
          if (content.length > 1024)
            content = this.client.util.shorten(reaction.message.content, 1024);

          const embed = new MessageEmbed()
            .addField("Author", reaction.message.author, true)
            .addField("Channel", reaction.message.channel, true)
            .addField("Message", content, false)
            .setTimestamp(reaction.message.createdAt.toISOString())
            .addField("Jump", `[jump here](${reaction.message.url})`)
            .setThumbnail(reaction.message.author.displayAvatarURL())
            .setColor(colors.embeds);
          starchannel.send(embed);
        }
      }
    }
  }
};
