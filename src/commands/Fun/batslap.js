const { createCanvas, loadImage } = require("canvas");
const { join } = require("path");
const Command = require("../../struct/Command");
module.exports = class Batslap extends Command {
  constructor(client) {
    super(client, {
      name: "batslap",
      aliases: ["slap"],
      description: "slap someone",
      usage: "<@mention>",
    });
  }
  async run(message, args) {
    const conjoined = args.join(" ");
    try {
      const base = await loadImage(
        join(
          __dirname,
          "..",
          "..",
          "..",
          "assets",
          "image",
          "bin",
          "batslap.jpg"
        )
      );
      const canvas = createCanvas(base.width, base.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(base, 0, 0);

      ctx.beginPath();
      ctx.arc(364, 384, 140, 0, Math.PI * 2, true);
      ctx.arc(720, 226, 140, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      const mentionAvatar = await loadImage(
        this.client.util
          .findMember(message, conjoined, true)
          .user.displayAvatarURL({ format: "jpg" })
      );

      ctx.drawImage(mentionAvatar, 220, 240, 300, 300);

      const avatar = await loadImage(
        message.author.displayAvatarURL({ format: "jpg" })
      );

      ctx.drawImage(avatar, 580, 85, 300, 300);

      return await message.channel.send({
        files: [{ attachment: canvas.toBuffer(), name: "batslap.jpg" }],
      });
    } catch (error) {
      throw error.message;
    }
  }
  async error(message, args, error) {
    return message.channel.send(`\`\`\`${error}\`\`\``);
  }
};
