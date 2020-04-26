const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const { format } = require("date-fns");
const Command = require("../../struct/Command");
module.exports = class Info extends Command {
  constructor(client) {
    super(client, {
      name: "info",
      description: "Important and general information related to Yui.",
      aliases: ["information", "about"],
    });
  }
  async run(message, args) {
    const { data: updated } = await axios({
      url: this.client.githubAPI + "/commits",
      method: "get",
      headers: {
        Authorization: `token ${this.client.config.repo_token}`,
        "User-Agent": "Yui Funami",
      },
    });
    const embed = new MessageEmbed()
      .setAuthor("Yui Funami", this.client.user.displayAvatarURL())
      .setDescription(
        "Yui Funami is a blazing-fast Discord bot designed to help you have fun!"
      )
      .setColor("2f3136")
      .addField(
        "Programmed with:",
        "<:JS:691370643886702725>  <:DiscordJS:691370753836449834>  <:TOML:691370861294387220>",
        true
      )
      .addField("License:", "GNU General Public v3", true)
      .addField(
        "Created and developed by:",
        "cherie#0004, [Dodo#1797](https://discord.bio/p/dodo), [Meliodas#0001](https://discord.bio/p/meliodas), [xgrvaeli#0880](https://xgrvae.li), MendTheMiner#0001, mariobob#8342"
      )
      .addField(
        "Links:",
        `Yui's source-code is available on [GitHub](${this.client.githubURL}).${
          message.guild.ownerID == message.author.id
            ? ""
            : "\nYou can invite Yui to your server [here](" +
              this.client.InviteURL +
              ")."
        }`
      )
      .setFooter(
        `Code last updated ${format(
          new Date(updated[0].commit.author.date),
          "EEEE, MMMM dd, yyyy"
        )}.`
      );

    return message.channel.send(embed);
  }
};
