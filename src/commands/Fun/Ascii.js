const Command = require('../../struct/Command')
const asciify = require('asciify-image');

module.exports = class Ascii extends Command{
    constructor(client){
        super(client, {
            name: "ascii",
            description: "Turn yourself into ascii"
        })
    }
    async run(message,args){
        const conjoined = args.join(" ");
        const mentionAvatar = this.client.util.findMember(message,conjoined,true).user.displayAvatarURL({format: "png"});
        const ascii = await asciify(mentionAvatar, {fit: "box", width: 30, height: 30, color: false})
        message.channel.send(ascii, {code: ''})
    }
}
