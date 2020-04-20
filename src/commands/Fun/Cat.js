const axios = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "cat",
    description: "Finds cat.",
    category: "Fun",
    async execute(message, args, client) {
        const { data: cat } = await axios.get("https://api.chewey-bot.top/cat", {
            headers: {
                "Authorization": client.config.secret["cb-token"] 
            }
        });
        const embed = new MessageEmbed()
            .setImage(cat.data)
            .setFooter("Powered by api.chewey-bot.top")
            .setColor("2f3136");

        return message.channel.send(embed);
    }
};
