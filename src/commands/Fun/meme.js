const { MessageEmbed } = require('discord.js');
const axios = require('axios');

const apiBase = 'https://meme-api.herokuapp.com/gimme';

const getMemes = async (count = 1, sub = 'dankmemes') => {
    let { data: data } = await axios({
        url: `${apiBase}/${sub}/${count}`,
        method: 'get',
    });

    return data.memes;
};

module.exports = {
    name: 'meme',
    description: 'Gets you a meme.',
    category: 'Fun',
    async execute(message, args, client) {
        let memes = await getMemes(args[0], args[1]);

        for (let m of memes) {
            let memeEmbed = new MessageEmbed()
                .setTitle(m.title)
                .setURL(m.postLink)
                .setImage(m.url)
                .setFooter(m.subreddit);

            await message.channel.send(memeEmbed);
        }
    },
};
