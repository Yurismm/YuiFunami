const { MessageEmbed } = require("discord.js");
const Command  = require("../../struct/Command");
module.exports = class User extends Command{
    constructor(client){
        super(client, {
    
    name: "user",
    aliases: ["userinfo"],
    description: "Display user information.",
    usage: "<?user>",
        });
    }
    async run(message, args) {
        let conjoined = args.join(" ");
        let person = this.client.util.findMember(message, conjoined, true);
        
        const embed = new MessageEmbed()
            .setTitle(`${person.user.username}#${person.user.discriminator}`)
            .setColor("2f3136")
            .setThumbnail(person.user.displayAvatarURL())
            .addField("User Related:", `ID: **${person.id}**\nAvatar URL: **[Here](${person.user.displayAvatarURL()})**\nAccount Created: **${this.client.util.snowflake(person.user.id)}**\n${person.nickname ? "Nickname: **" + person.nickname + "**" : ""}`, true)
            .setFooter(`${person.nickname ? person.nickname : person.user.username} joined ${message.guild.name} on ${new Date(person.guild.joinedTimestamp).toLocaleDateString()}`);

        return message.channel.send(embed);
    }
};