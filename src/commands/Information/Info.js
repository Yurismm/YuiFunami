const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const { format } = require("date-fns");

module.exports = {
    name: "info",
    description: "Important and general information related to Yui.",
    aliases: ["information"],
    category: "Information",
    async execute(message, args, client) {
        const { data: updated } = await axios({
            url: client.githubAPI + "/commits",
            method: "get",
            headers: {
                "Authorization": `token ${client.config.secret["repo-token"]}`,
                "User-Agent": "Yui Funami"
            }
        });

        const embed = new MessageEmbed()
            .setAuthor("Yui Funami", client.user.displayAvatarURL())
            .setDescription("Yui Funami is a blazing-fast Discord bot designed to help you have fun!")
            .setColor("2f3136")
            .addField("Programmed with:", "<:JS:691370643886702725>  <:DiscordJS:691370753836449834>  <:TOML:691370861294387220>", true)
            .addField("License:", "GNU General Public v3", true)
            .addField("Created and developed by:", "cherie#0004, [Dodo#1797](https://discord.bio/p/dodo), Meliodas#0001, [xgrvaeli# 0880](https: //xgrvae.li)")
            .addField("Links:", `Yui's source-code is available on [GitHub](${client.githubURL}).${message.guild.ownerID == message.author.id ? "" : "\nYou can invite Yui to your server [here](" + client.InviteURL + ")."}`)
            .setFooter(`Code last updated ${format(new Date(updated[0].commit.author.date), "EEEE, MMMM dd, yyyy")}.`);

            return message.channel.send(embed);
    }
};