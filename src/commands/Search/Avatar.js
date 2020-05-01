const { MessageEmbed } = require("discord.js");
const Command = require("../../struct/Command");
const colors = require("../../util/Colors");
module.exports = class Avatar extends Command{
    constructor(client){
        super(client, {
    
    name: "avatar",
    description: "Returns the avatar of the given user, or returns your own if no user is supplied.",
    usage: "<?username|mention>",
        });
    }
    async run(message, args) {
        const member = this.client.util.findMember(message, args[0], true);

        const embed = new MessageEmbed()
            .setTitle(`${member.displayName}'s avatar:`)
            .setImage(member.user.displayAvatarURL({ size: 512, dynamic: true }))
            .setColor(colors.embeds);

        return message.channel.send(embed);
    }

};