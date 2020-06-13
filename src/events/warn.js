const { yellowBright } = require("chalk");

module.exports = class {
  constructor(client) {
    this.client = client;
  }
  async execute(message) {
    this.client.logger.warn(yellowBright(message));
  }
};
