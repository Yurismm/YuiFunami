module.exports = class {
  constructor(client) {
    this.client = client;
  }
  async execute(guild) {
    if (!(await this.client.prefixes.get(guild.id))) {
      await this.client.prefixes.set(
        guild.id,
        this.client.config.defaultSettings.prefix
      );
    }
  }
};
