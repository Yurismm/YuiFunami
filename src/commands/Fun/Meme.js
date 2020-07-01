const { randomRange } = require("../../util/Util");
const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const Command = require("../../struct/Command");

async function getPost(sub) {
  const { data: posts } = await axios({
    url: `https://www.reddit.com/r/${sub}/random.json`,
    method: "get",
  });
  return posts;
}

module.exports = class Meme extends Command {
  constructor(client) {
    super(client, {
      name: "meme",
      description: "Gets you a meme.",
    });
  }
  async run(message, args, client) {
    const subReddits = [
      "meirl",
      "dankmemes",
      "MemeEconomy",
      "Memes_Of_The_Dank",
    ]; //ADD SUBREDDITS HERE <<<<<<<<
    const random = subReddits[randomRange(0, subReddits.length - 1)];
    let posts = await getPost(random);
    let msg = await message.channel.send("Getting meme...");

    let meme = posts[0].data.children[0].data;
    while (!meme.is_reddit_media_domain || meme.is_video) {
      posts = await getPost(random);
      meme = posts[0].data.children[0].data;
    }
    const embed = new MessageEmbed()
      .setTitle(meme.title)
      .setURL(`https://www.reddit.com/${meme.permalink}`)
      .setImage(meme.url)
      .setAuthor(meme.subreddit)
      .setFooter(meme.author)
      .setColor("2f3136");
    msg.edit("", { embed: embed });
  }
};
