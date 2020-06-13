module.exports = class {
  constructor(client) {
    this.client = client;
  }
  async execute(guild) {
    await this.client.prefixes.delete(guild.id);
  }
};
