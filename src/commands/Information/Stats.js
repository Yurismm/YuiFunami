const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const { format } = require("date-fns");
const Command = require("../../struct/Command");
module.exports = class Stars extends Command{
    constructor(client){
        super(client, {
    
    name: "stats",
    description: "On the dot statistics.",
    aliases: ["statistics"],
});
}
    async run(message, args) {
        const sent = await message.channel.send("Performing calculations...");

        const { data: updated } = await axios({
            url: this.client.config.githubAPI + "/commits",
            method: "get",
            headers: {
                "Authorization": `token ${this.client.config.repo_token}`,
                "User-Agent": "Yui Funami"
            }
        });

        const embed = new MessageEmbed()
            .setColor("2f3136")
            .addField(`${this.client.user.username}#${this.client.user.discriminator} `, `Channels: **${this.client.channels.cache.size}**\nUsers: **${this.client.users.cache.size}**\nGuilds: **${this.client.guilds.cache.size}**\nCommands: **${this.client.commands.size}**`, true)
            .addField("(not sharding)", `Gateway: **${this.client.ws.ping.toFixed(2)}**\nMessage: **${sent.createdTimestamp - message.createdTimestamp}ms**\nUptime: **${this.client.util.uptime().formatted}**\nRAM: **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB**`, true)
            .setFooter(`Code last updated ${format(new Date(updated[0].commit.author.date), "EEEE, MMMM dd, yyyy")}.`);

        return sent.edit("", { embed });
    }
};