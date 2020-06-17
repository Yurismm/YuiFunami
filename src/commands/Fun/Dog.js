const axios = require("axios");
const { MessageEmbed } = require("discord.js");
const Command = require("../../struct/Command");
const colors = require("../../util/Colors");
module.exports = class Dog extends Command {
  constructor(client) {
    super(client, {
      name: "dog",
      description: "Fetches dog.",
    });
  }
  async run(message, args, client) {
    const { data: dog } = await axios({
      url: "https://api.chewey-bot.top/dog",
      method: "get",
      headers: {
        Authorization: this.client.config.cb_token,
      },
    });

    const embed = new MessageEmbed()
      .setImage(dog.data)
      .setColor(colors.embeds)
      .setFooter("Powered by api.chewey-bot.top");

    message.channel.send(embed);
  }
};
