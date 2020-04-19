module.exports = {
  name: "ping",
  description: "get bot ping",
  async execute(message, args) {
    message.channel.send(
      `heartbeat:${
        new Date().getTime() - message.createdTimestamp
      }ms\nlatency: ${message.client.ping}`
    );
  },
};
module.exports.config = {
    type: 'core'
}