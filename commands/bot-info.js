const {RichEmbed} = require('discord.js')
module.exports = {
  name: "bot-info",
  description: "info on the bot",
  async execute(message, args) {
    const embed = new RichEmbed()
      .setTitle("About Yui Funami")
      .setColor("0x000FFF")
      .addField("Owner:", "cherie#9794")
      .addField(
        "Developers:",
        "MendTheMiner#0001, mariobob#8342, cherie#9794",
        true
      )
      .addField(
        "Support Server:",
        "If you find any bugs, issues or have any data concerns, please join this server: https://discord.gg/JwJdysC",
        true
      )
      .addField("Extra Thanks to:", "Iri, Dylan, Aiden, Ane (:", true)
      .setTimestamp()
      .setFooter("Infomation about Yui Funami - Accurate as of 4/17/2020");
    message.channel.send(embed);
  },
};
module.exports.config = {
    type: 'core'
}