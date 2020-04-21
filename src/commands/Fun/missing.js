const { createCanvas, loadImage, registerFont } = require("canvas");
const { join } = require("path");
const { shortenText } = require("../../util/Canvas");
registerFont(join(__dirname, "..", "..", "..", "assets", "font", "Minecraftia.ttf"), { family: "Minecraftia" });

module.exports = {
    name: "missing",
    description: "Person is missing.",
    category: "Fun",
    preventDefaultError: true,
    async execute(message, args) {
        let who = ''
        if(message.mentions.members.first()){
             who = message.mentions.members.first()
        }
        else{
            who = message.member
        } 
        try {
            const base = await loadImage(join(__dirname, "..", "..", "..", "assets", "image", "bin", "missing.jpg"));
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "28px sans-serif";
            ctx.fillStyle = "#000000";
            ctx.fillText(shortenText(ctx, who.displayName, 171), 73, 45);

            ctx.beginPath();
            ctx.arc(86, 296, 21, 0, Math.PI * 2, true);
	        ctx.closePath();
            ctx.clip();
            const avatar = await loadImage(who.user.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar,62,275,50,50)

            return await message.channel.send({files: [{attachment: canvas.toBuffer(), name: "missing.jpg"}]});
        }catch(error){
            throw error.message;
        }
    },
    async error(message, args, client, error) {
        return message.channel.send(`\`\`\`${error}\`\`\``);
    }
};