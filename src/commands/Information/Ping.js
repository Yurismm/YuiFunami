const Command = require("../../struct/Command");
const {MessageEmbed} = require("discord.js");
const colors = require('../../util/Colors')
module.exports = class Ping extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Latency and API response times.",
            usage: "ping",
            aliases: ["pong"],
        });
    }

    async run(message, args) {
        // eslint-disable-line no-unused-vars
        try {
            const msg = await message.channel.send("pinging...");
            const embed = new MessageEmbed()
                .setTitle("🏓 Ping!")
                .setDescription(`
                    Roundtrip: ${msg.createdTimestamp - message.createdTimestamp}\n
                    Heartbeat: ${this.client.ws.ping}ms.
                `)
                .setColor(colors.embeds);
            msg.edit("",{embed:embed});
        } catch (e) {
            console.log(e);
        }
    }
};
