module.exports = {
    name:"osu",
    description: "Returns information about your osu name",
    category:"Fun",
    async execute(message,args){
        const osuname = args.join(" ");

        message.channel.send({ files: [{ attachment: `https://lemmmy.pw/osusig/sig.php?colour=hexff66aa&uname=${osuname}&pp=1&countryrank&flagshadow&flagstroke&opaqueavatar&avatarrounding=5&onlineindicator=undefined&xpbar&xpbarhex&random`, name: "missing.jpg" }] });
    }
};