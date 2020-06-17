const { redBright } = require("chalk");

module.exports = class {
  constructor(client) {
    this.client = client;
  }
  async execute(error) {
    this.client.logger.error(redBright(error));
  }
};
