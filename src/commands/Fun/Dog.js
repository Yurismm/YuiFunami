const axios = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "dog",
    description: "Fetches dog.",
    category: "Fun",
    async execute(message, args, client) {
        const { data: dog } = await axios({
            url: "https://api.chewey-bot.top/dog",
            method: "get",
            headers: {
                "Authorization": client.config.secret["cb-token"]
            }
        });

        const embed = new MessageEmbed()
            .setImage(dog.data)
            .setColor("2f3136")
            .setFooter("Powered by api.chewey-bot.top");
        
        message.channel.send(embed);
    }
};