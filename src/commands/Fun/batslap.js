const { createCanvas, loadImage } = require("canvas");
const { join } = require("path");

module.exports = {
  name: "batslap",
  aliases: ["slap"],
  description: "slap someone",
  args: true,
  usage: "<@mention>",
  category: "Fun",
  preventDefaultError: true,
  async execute(message) {
    try {
      const base = await loadImage(join(__dirname,"..","..","..","assets","image","bin","batslap.jpg"));
      const canvas = createCanvas(base.width, base.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(base, 0, 0);

      ctx.beginPath();
      ctx.arc(364, 384, 140, 0, Math.PI * 2, true);
      ctx.arc(720, 226, 140, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      const mentionAvatar = await loadImage(
        message.mentions.users.first().displayAvatarURL({ format: "jpg" })
      );

      ctx.drawImage(mentionAvatar, 220, 240, 300, 300);

      const avatar = await loadImage(
        message.member.user.displayAvatarURL({ format: "jpg" })
      );

      ctx.drawImage(avatar, 580, 85, 300, 300);

      return await message.channel.send({
        files: [{ attachment: canvas.toBuffer(), name: "batslap.jpg" }],
      });
    } catch (error) {
      throw error.message;
    }
  },
  async error(message, args, client, error) {
    return message.channel.send(`\`\`\`${error}\`\`\``);
  },
};
