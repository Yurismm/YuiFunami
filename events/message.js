const { PREFIX } = require("../config.json");
module.exports = {
  run(message, client) {
    const args = message.content.slice(PREFIX.length).split(" ");
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;
    if(message.author.bot) return;

    try {
      client.commands.get(command).execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply(
        "there was an error trying to execute that command! Please inform the developer"
      );
    }
  },
};
