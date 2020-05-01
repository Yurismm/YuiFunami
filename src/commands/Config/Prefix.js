const Command  = require("../../struct/Command");

module.exports = class Prefix extends Command{
    constructor(client){
        super(client,{
            name: "prefix",
            description: "show or set the prefix for the guild",
            usage: "[prefix]",
            permLevel: "Administrator"
        });
    }
    async run(message,args){
        const prefix = args[0] || undefined;
        if(prefix){
            await this.client.prefixes.set(message.guild.id,prefix);
            return message.channel.send(`Set guild prefix to ${await this.client.prefixes.get(message.guild.id)}`);
        }
        else{
            return message.channel.send(`The prefix for this guild is ${await this.client.prefixes.get(message.guild.id)}`);
        }
    }
};