const axios = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "bird",
    aliases: ["birb"],
    description: "Gives birb.",
    category: "Fun",
    async execute(message, args, client) {
        const { data: birb } = await axios.get("https://api.chewey-bot.top/birb", {
            headers: {
                "Authorization": client.config.secret["cb-token"] 
            }
        });
        const embed = new MessageEmbed()
            .setImage(birb.data)
            .setFooter("Powered by api.chewey-bot.top")
            .setColor("2f3136");

        return message.channel.send(embed);
    }
};
