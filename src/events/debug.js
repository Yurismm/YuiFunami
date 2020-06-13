const { grey } = require("chalk");

module.exports = class {
  constructor(client) {
    this.client = client;
  }
  async execute(message) {
    this.client.logger.debug(grey(message));
  }
};
