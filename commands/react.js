module.exports = {
    name: 'react',
    description: 'reacts',
    async execute(message,args){
        message.react('😩');
        message.react("🤏");
        message.react("💯");
        message.react("👀");
    }
}
module.exports.config = {
    type: 'fun'
}