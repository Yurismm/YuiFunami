const { MessageEmbed } = require("discord.js");
const Command = require('../../struct/Command')
module.exports = class Avatar extends Command{
    constructor(client){
        super(client, {
    
    name: "avatar",
    description: "Returns the avatar of the given user, or returns your own if no user is supplied.",
    usage: "<?username|mention>",
    category: "Search",
        })
    }
    async run(message, args) {
        const member = this.client.util.findMember(message, args[0], true);

        const embed = new MessageEmbed()
            .setTitle(`${member.displayName}'s avatar:`)
            .setImage(member.user.displayAvatarURL({ size: 512, dynamic: true }))
            .setColor("2f3136");

        return message.channel.send(embed);
    }

};