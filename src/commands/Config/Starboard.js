const Command = require('../../struct/Command')

module.exports = class Starboard extends Command{
    constructor(client){
        super(client,{
            name: 'starboard',
            description: 'Set the starboard channel | Toggle starboard on and off',
            usage: '<channel>',
            permLevel: 'Administrator'
        })
    }
    async run(message,args){
        const channel = message.mentions.channels.first() || message.guild.channels.cache.find(c => c.name === args[0])
        const stars = args[1] || 2
        if(channel){
            await this.client.starboards.set(message.guild.id,{channelId: channel.id, stars: stars})
            return message.channel.send(`Set starboard channel to ${channel} with a required amount of stars of ${stars}`)
        }
        else{
            if(await this.client.starboards.get(message.guild.id)){
                await this.client.starboards.delete(message.guild.id)
                return message.channel.send("Disabled Starboard")
            }
            else{
                return message.channel.send("Please provide a channel")
            }
        }
    }
}