const { MessageEmbed } = require("discord.js");
const util = require("util");
const Command = require("../../struct/Command");

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

    try {
      let evaled = await eval(`(async () => { ${code} })()`);

      if (typeof evaled !== "string") evaled = util.inspect(evaled);
      const checkCharLength = clean(evaled);
      if (code === clean(evaled))
        return message.channel.send("The input was the same as the output.");
      const MAX_CHARS = 3 + 2 + checkCharLength.length + 3;
      if (MAX_CHARS > 1023) {
        message.channel.send(
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
        .addField(":inbox_tray: Input: ", `\`\`\`${code}\`\`\``)
        .addField(
          ":outbox_tray: Output: ",
          `\`\`\`js\n${clean(evaled)}\n\`\`\``
        );
      message.channel.send(embed);
    } catch (err) {
      if (err.message.length > 1023) {
        message.channel.send(
          "Output exceeded 1024 characters. Sending as a file.",
          {
            files: [
              { attachment: Buffer.from(err.message), name: "output.txt" },
            ],
          }
        );
      }
      const embed = new MessageEmbed()
        .setColor(0x36393f)
        .addField(":inbox_tray: Input: ", `\`\`\`${code}\`\`\``)
        .addField(
          ":outbox_tray: Output: ",
          `\`\`\`${clean(err.message)}\`\`\``
        );
      message.channel.send(embed);
    }

    function clean(text) {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }
  }
};
