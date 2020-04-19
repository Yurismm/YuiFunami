const Discord = require("discord.js");
const { TOKEN, PREFIX } = require("./config.json");
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});

client
  .on("message", (message) => {
    require("./events/message").run(message, client);
  })
  .on("ready", () => {
    require("./events/ready").run(client);
  });

client.login(TOKEN);
