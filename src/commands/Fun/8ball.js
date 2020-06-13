const { MessageEmbed } = require("discord.js");
const { randomRange } = require("../../util/Util");
const colors = require("../../util/Colors");
const { pool } = require("../../util/Emojis");
const Command = require("../../struct/Command");
//Choice arrays
// move these at a later date
const positive = [
  "It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes – definitely.",
  "You may rely on it.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Yes.",
  "Signs point to yes",
];
const negative = [
  "Don't count on it.",
  "My reply is no",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful.",
];
const neutral = [
  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",
];
const choice = ["positive", "negative", "neutral"];

module.exports = class Ball extends Command {
  constructor(client) {
    super(client, {
      name: "8ball",
      description: "Predicts the future.",
    });
  }
  async run(message) {
    let msg = await message.channel.send("Predicting the future...");
    let color = "ffffff";
    let phrase = "Phrase Template";
    switch (choice[this.client.util.randomRange(0, choice.length - 1)]) {
      case "positive":
        color = colors.positive;
        phrase = positive[this.client.util.randomRange(0, positive.length)];
        break;
      case "negative":
        color = colors.negative;
        phrase = negative[this.client.util.randomRange(0, negative.length)];
        break;
      case "neutral":
        color = colors.neutral;
        phrase = neutral[this.client.util.randomRange(0, neutral.length)];
        break;
    }
    const embed = new MessageEmbed()
      .setColor(color)
      .setTitle(pool)
      .setDescription(phrase);
    msg.edit("", { embed: embed });
  }
};
