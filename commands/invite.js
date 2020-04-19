const {RichEmbed} = require('discord.js')
module.exports = {
    name: 'invite',
    description: 'invite the bot',
    async execute(message,args){
        const embed = new RichEmbed()
        .setTitle('The invite link to invite this bot to your server!')
        .setColor('0x000FFF')
        .setDescription('[invite here](https://discordapp.com/oauth2/authorize?client_id=456910763504697363&scope=bot&permissions=8)');
        message.channel.send(embed);
    }
}
module.exports.config = {
    type: 'core'
}