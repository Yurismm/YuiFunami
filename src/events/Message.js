module.exports = class{
    constructor(client){
        this.client = client
    }
    async execute(message){
        if (message.author.bot || !message.content.startsWith(this.client.prefixes.global)) return;

        const args = message.content.split(/\s+/g);
        const command = args.shift().slice(this.client.prefixes.global.length);
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

        if (!cmd) return;
        if(cmd.conf.args && !args.length){
            let reply = 'No arguments provided'
            if (command.usage) reply += `\nThe proper usage of that command is: \`${client.prefixes.global}${command.name} ${command.usage}\``;
            await message.channel.send(reply);
            return;
        }
        if (cmd.cooldown.has(message.author.id)) {
            let msg = await message.channel.send('That command is on cooldown')
            message.delete(1000)
            msg.delete(3000)
        }

        cmd.setMessage(message);
        cmd.execute(message, args);

        if (cmd.conf.cooldown > 0) cmd.setCooldown(message.author.id);
    }
}