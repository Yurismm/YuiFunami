module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async execute(message) {
    if (message.author.bot) return;

    if (
      message.guild &&
      !message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")
    )
      return;

    const prefixes = this.client.prefixes;

    const prefix =
      (await prefixes.get(message.guild.id)) ||
      this.client.config.defaultSettings.prefix;

    const prefixMention = new RegExp(`^<@!?${this.client.user.id}> ?$`);
    if (message.content.match(prefixMention)) {
      return message.reply(`My prefix on this guild is \`${prefix}\``);
    }

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.guild && !message.member)
      await message.guild.fetchMember(message.author);

    const cmd =
      this.client.commands.get(command) ||
      this.client.commands.get(this.client.aliases.get(command));
    if (!cmd) return;

    if (cmd && !message.guild && cmd.conf.guildOnly)
      return message.channel.send(
        "This command is unavailable via private message. Please run this command in a guild."
      );
    const level = this.client.permlevel(cmd, message);
    if (!level)
      return message.channel.send("You don't have permission to do that!");

    message.flags = [];
    while (args[0] && args[0][0] === "-") {
      message.flags.push(args.shift().slice(1));
    }

    cmd.run(message, args);
  }
};
