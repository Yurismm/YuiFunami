const readyChannel = require("../config.json").READY;
module.exports = {
  run(client) {
    console.log(`Letsu go, logged in as ${client.user.tag}!`);
    client.channels
      .get(readyChannel)
      .send(
        `Ready, there was a successful launch!, please check console for more info.\nLogged in as ${client.user.tag}`
      );
    client.user.setStatus("availble");
    client.user.setPresence({
      game: {
        name:
          "cherie is the best | Prefix is $ | Rewriting Yui, no fun commands for a while.",
        type: "STREAMING",
        url: "https://www.twitch.tv/monstercat",
      },
    });
  },
};
