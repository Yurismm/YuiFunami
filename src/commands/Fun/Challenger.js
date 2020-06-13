const { createCanvas, loadImage, registerFont } = require("canvas");
const { join } = require("path");
registerFont(join(__dirname, "..", "..", "..", "assets", "font", "Smash.ttf"), {
  family: "Smash",
});
const Command = require("../../struct/Command");
module.exports = class Challenger extends Command {
  constructor(client) {
    super(client, {
      name: "challenger",
      aliases: ["smash"],
      description: "Sends a smash announcement.",
    });
  }
  async run(message, args) {
    const conjoined = args.join(" ");
    try {
      const mention = this.client.util.findMember(message, conjoined, true);
      const avatar = await loadImage(
        mention.user.displayAvatarURL({ format: "jpg" })
      );
      const text = mention.displayName;
      const base = await loadImage(
        join(
          __dirname,
          "..",
          "..",
          "..",
          "assets",
          "image",
          "bin",
          "challenger.jpg"
        )
      );
      const canvas = createCanvas(base.width, base.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(base, 0, 0);
      ctx.font = "50px Smash";
      ctx.fillStyle = "#ffffff";
      let radians = (-3 * Math.PI) / 180;
      ctx.rotate(radians);
      ctx.fillText(text, 500, 170);
      ctx.rotate(-radians);
      radians = (-10 * Math.PI) / 180;
      ctx.rotate(radians);
      ctx.drawImage(avatar, 20, 220, 270, 270);

      return await message.channel.send({
        files: [{ attachment: canvas.toBuffer(), name: "challenger.jpg" }],
      });
    } catch (error) {
      throw error.message;
    }
  }
  async error(message, args, error) {
    return message.channel.send(`\`\`\`${error}\`\`\``);
  }
};
