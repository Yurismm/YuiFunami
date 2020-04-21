const { MessageEmbed } = require("discord.js");

module.exports = {
    name:"osu",
    description: "Returns infomation about your osu name",
    category:"Fun",
    async execute(message,args,client){
        const osuname = args.join(" ");
        const embed = new MessageEmbed()
        .setTitle("osu! Profile")
        .setImage(`https://lemmmy.pw/osusig/sig.php?colour=hexff66aa&uname=${osuname}&pp=1&countryrank&flagshadow&flagstroke&opaqueavatar&avatarrounding=5&onlineindicator=undefined&xpbar&xpbarhex&random`);
        message.channel.send(embed);
    }
};