const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Returns the avatar of the given user, or returns your own if no user is supplied.",
    usage: "<?username|mention>",
    category: "Search",
    execute(message, args, client) {
        const member = client.findMember(message, args[0], true);

        const embed = new MessageEmbed()
            .setTitle(`${member.displayName}'s avatar:`)
            .setImage(member.user.displayAvatarURL({ size: 512, dynamic: true }))
            .setColor("2f3136");

        return message.channel.send(embed);
    }
};