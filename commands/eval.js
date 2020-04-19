const { ownerID } = require("../config.json");
function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203), false);
  else return text;
}
module.exports = {
  name: "eval",
  description: "only dev can use this",
  async execute(message, args) {
    if (message.author.id !== ownerID) return;
    try {
      const code = args.join(" ");
      let evaled = await eval(`(async() => {${code}})()`);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), { code: "xl" });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  },
};
module.exports.config = {
    type: 'dev'
}