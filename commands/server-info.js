module.exports = {
  name: "server-info",
  description: "Info for the server",
  async execute(message, args) {
    message.channel.send(
      `This server was made on: ${message.guild.createdAt}\nServer name: ${message.guild.name}\nThe owner of this guild is: ${message.guild.owner}\nTotal members: ${message.guild.memberCount}`
    );
  },
};
module.exports.config = {
    type: 'core'
}