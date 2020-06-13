const { createCanvas, loadImage, registerFont } = require("canvas");
const { join } = require("path");
const { shortenText } = require("../../util/Canvas");
registerFont(
  join(__dirname, "..", "..", "..", "assets", "font", "Minecraftia.ttf"),
  { family: "Minecraftia" }
);
const Command = require("../../struct/Command");
module.exports = class Achievement extends Command {
  constructor(client) {
    super(client, {
      name: "achievement",
      aliases: ["minecraft-achievement"],
      description:
        "Sends a Minecraft achievement with the text of your choice.",
    });
  }
  async run(message, args) {
    try {
      const text = args.join(" ");
      const base = await loadImage(
        join(
          __dirname,
          "..",
          "..",
          "..",
          "assets",
          "image",
          "bin",
          "achievement.png"
        )
      );
      const canvas = createCanvas(base.width, base.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(base, 0, 0);
      ctx.font = "17px Minecraftia";
      ctx.fillStyle = "#ffff00";
      ctx.fillText("Achievement Get!", 60, 40);
      ctx.fillStyle = "#ffffff";
      ctx.fillText(shortenText(ctx, text, 230), 60, 60);
      return await message.channel.send({
        files: [{ attachment: canvas.toBuffer(), name: "achievement.png" }],
      });
    } catch (error) {
      throw error.message;
    }
  }
  async error(message, args, error) {
    return message.channel.send(`\`\`\`${error}\`\`\``);
  }
};
