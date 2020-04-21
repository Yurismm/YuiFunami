const { createCanvas, loadImage, registerFont } = require("canvas");
const { join } = require("path");
registerFont(join(__dirname, "..", "..", "..", "assets", "font", "Smash.ttf"), { family: "Smash" });

module.exports = {
    name: "challenger",
    aliases: ["smash"],
    description: "Sends a smash announcement.",
    category: "Fun",
    preventDefaultError: true,
    async execute(message) {
        try {
            const text = message.mentions.members.first() ? message.mentions.members.first().displayName : message.member.displayName;
            const base = await loadImage(join(__dirname, "..", "..", "..", "assets", "image", "bin", "challenger.jpg"));
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "50px Smash";
            ctx.fillStyle = "#ffffff";
            radians = (-4.3 * Math.PI / 180);
            ctx.rotate(radians);
            ctx.fillText(text, 500, 180);
            ctx.restore();
            return await message.channel.send({files: [{attachment: canvas.toBuffer(), name: "challenger.jpg"}]});
        }catch(error){
            throw error.message;
        }
    },
    async error(message, args, client, error) {
        return message.channel.send(`\`\`\`${error}\`\`\``);
    }
};