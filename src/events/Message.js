<<<<<<< HEAD
module.exports = class{
    constructor(client){
=======
module.exports = class {
    constructor(client) {
>>>>>>> 2759f1ede7c8711d52a43b9a83f534ab8defce14
        this.client = client;
    }

    async run(message) {
        if (message.author.bot) return;

<<<<<<< HEAD
        if (!cmd) return;
        if(cmd.conf.args && !args.length){
            let reply = "No arguments provided";
            if (command.usage) reply += `\nThe proper usage of that command is: \`${client.prefixes.global}${command.name} ${command.usage}\``;
            await message.channel.send(reply);
=======
        if (
            message.guild &&
            !message.channel
                .permissionsFor(message.guild.me)
                .missing('SEND_MESSAGES')
        )
>>>>>>> 2759f1ede7c8711d52a43b9a83f534ab8defce14
            return;

        const settings = this.client.getSettings(message.guild);

        message.settings = settings;

        const prefixMention = new RegExp(`^<@!?${this.client.user.id}> ?$`);
        if (message.content.match(prefixMention)) {
            return message.reply(
                `My prefix on this guild is \`${settings.prefix}\``
            );
        }
<<<<<<< HEAD
        if (cmd.cooldown.has(message.author.id)) {
            let msg = await message.channel.send("That command is on cooldown");
            message.delete(1000);
            msg.delete(3000);
=======

        if (message.content.indexOf(settings.prefix) !== 0) return;

        const args = message.content
            .slice(this.client.config.defaultSettings.prefix.length)
            .trim()
            .split(/ +/g);
        const command = args.shift().toLowerCase();

        if (message.guild && !message.member)
            await message.guild.fetchMember(message.author);

        const level = this.client.permlevel(message);

        const cmd =
            this.client.commands.get(command) ||
            this.client.commands.get(this.client.aliases.get(command));
        if (!cmd) return;

        if (cmd && !message.guild && cmd.conf.guildOnly)
            return message.channel.send(
                'This command is unavailable via private message. Please run this command in a guild.'
            );

        if (level < this.client.levelCache[cmd.conf.permLevel]) {
            if (settings.systemNotice === 'true') {
                return message.channel
                    .send(`You do not have permission to use this command.
        Your permission level is ${level} (${
                    this.client.config.permLevels.find((l) => l.level === level)
                        .name
                })
        This command requires level ${
            this.client.levelCache[cmd.conf.permLevel]
        } (${cmd.conf.permLevel})`);
            } else {
                return;
            }
        }

        message.author.permLevel = level;

        message.flags = [];
        while (args[0] && args[0][0] === '-') {
            message.flags.push(args.shift().slice(1));
>>>>>>> 2759f1ede7c8711d52a43b9a83f534ab8defce14
        }

        this.client.logger.info(
            `${
                this.client.config.permLevels.find((l) => l.level === level)
                    .name
            } ${message.author.username} (${message.author.id}) ran command ${
                cmd.help.name
            }`
        );

        cmd.run(message, args, level);
    }
<<<<<<< HEAD
};
=======
};
>>>>>>> 2759f1ede7c8711d52a43b9a83f534ab8defce14
