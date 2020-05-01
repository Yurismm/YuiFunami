const axios = require("axios");
const { MessageEmbed } = require("discord.js");
const Command = require("../../struct/Command");
const colors = require("../../util/Colors");

module.exports = class Bird extends Command{
    constructor(client){
        super(client, {
    name: "bird",
    aliases: ["birb"],
    description: "Gives birb.",
        });
    }
    async run(message, args) {
        const { data: birb } = await axios.get("https://api.chewey-bot.top/birb", {
            headers: {
                "Authorization": this.client.config.cb_token
            }
        });
        const embed = new MessageEmbed()
            .setImage(birb.data)
            .setFooter("Powered by api.chewey-bot.top")
            .setColor(colors.embeds);

        return message.channel.send(embed);
    }
};
