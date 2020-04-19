const {Attachment} = require('discord.js')
module.exports = {
    name: 'despacito',
    description: 'DESPACITO!!',
    async execute(message,args){
        const attachment = new Attachment('https://i.imgur.com/FcEmBV5.png');
        message.channel.send(attachment);
    }
}
module.exports.config = {
    type: 'fun'
}