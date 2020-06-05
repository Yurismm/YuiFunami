const { MessageEmbed } = require("discord.js");
const util = require("util");
const Command = require("../../struct/Command");
const colors = require('../../util/Colors')
module.exports = class Eval extends Command {
  constructor(client) {
    super(client, {
      name: "eval",
      description: "Evaluates arbitrary Javascript.",
      usage: "eval <expression>",
      aliases: ["ev"],
      permLevel: "Bot Admin",
    });
  }

  async run(message, args, level) {
    const code = args.join(" ");
    if (!code) return message.channel.send(`I can't eval nothing.`);

      let evaled = await eval(`(async () => { ${code} })()`);

      if (typeof evaled !== "string") evaled = util.inspect(evaled);
      const checkCharLength = await this.client.clean(evaled);
      const MAX_CHARS = 3 + 2 + checkCharLength.length + 3;
      if (MAX_CHARS > 1023) {
        return message.channel.send(
          "Output exceeded 1024 characters. Sending as a file.",
          {
            files: [
              { attachment: Buffer.from(checkCharLength), name: "output.txt" },
            ],
          }
        );
      }
      const embed = new MessageEmbed()
        .setColor(0x36393f)
        .addField(":inbox_tray: Input: ", `\`\`\`js\n${code}\n\`\`\``)
        .addField(
          ":outbox_tray: Output: ",
          `\`\`\`js\n${await this.client.clean(evaled)}\n\`\`\``
        );
      message.channel.send(embed);

  }
};
