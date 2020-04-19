module.exports = {
    name: 'avatar',
    description: 'sends your avatar',
    async execute(message,args){
        message.reply({embed:{image:{url:message.author.avatarURL}}});
    }
}
module.exports.config = {
    type: 'misc'
}