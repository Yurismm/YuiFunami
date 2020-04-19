module.exports = {
  name: "fruits",
  description: "Get fruits!",
  async execute(message, args) {
    message.react("🍎");
    message.react("🍊");
    message.react("🍇");
    message.react("🍆");
  },
};
module.exports.config = {
    type: 'fun'
}