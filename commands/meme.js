const randomPuppy = require('random-puppy');
const snekfetch = require("snekfetch");
module.exports = {
    name: 'meme',
    description: 'Sends a meme, or a dog',
    async execute(message,args){
    let reddit = [
    "meme",
    "animemes",
    "dankmemes",
    "dankmeme"
  ]
  let subreddit = reddit[Math.floor(Math.random() * reddit.length - 1)];

  message.channel.startTyping()

  randomPuppy(subreddit).then(url =>{
    snekfetch.get(url).then(async res =>{
      await message.channel.send({
        files:[{
          attachment:res.body,
          name: "meme.png"
        }]
      }).then(() => message.channel.stopTyping());
    }).catch(err => console.error(err));
  }).catch(err => console.error(err));;
}
}
module.exports.config = {
    type: 'fun'
}
