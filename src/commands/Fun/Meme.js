const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const Command = require("../../struct/Command");
const apiBase = "https://meme-api.herokuapp.com/gimme";

const subs = ["dankmemes","wholesomememes", "memes"];

const getMemes = async (count = 1, sub = "dankmemes") => {
    let { data: data } = await axios({
        url: `${apiBase}/${sub}/${count}`,
        method: "get",
    });

    return data.memes;
};

module.exports = class Meme extends Command{
    constructor(client){
        super(client, {
    name: "meme",
    description: "Gets you a meme.",
    });
}  
    async run(message, args) {
        let sub = args[1];
        if(!args[1]) sub = subs[this.client.util.randomRange(0,subs.length-1)]; 
        let memes = await getMemes(args[0], sub);

        for (let m of memes) {
            let memeEmbed = new MessageEmbed()
                .setTitle(m.title)
                .setURL(m.postLink)
                .setImage(m.url)
                .setFooter(m.subreddit);

            await message.channel.send(memeEmbed);
        }
    }
};
