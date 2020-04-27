const { magenta, blue, grey } = require("chalk");
const { version, dependencies } = require("../../package.json");

module.exports =  class {
    constructor(client){
        this.client = client;
    }
    async execute(){
    this.client.logger.info(`${magenta(this.client.user.username)} is online`);
    this.client.logger.info(`Defaultprefix set to: ${this.client.config.defaultSettings.prefix}`);
    this.client.logger.info(`${magenta(this.client.commands.size)} commands loaded`);
    this.client.logger.info(`Program version: ${blue("v" + version)}`);
    this.client.logger.info(`Node version: ${blue(process.version)}`);
    this.client.logger.info(`Discord.js version: ${blue(dependencies["discord.js"].replace("^", "v"))}`);

    if (this.client.debug) this.client.logger.info(grey("Started in DEBUG MODE"));

    await this.client.user.setActivity({
        name: `Feel Good Inc. | ${this.client.config.defaultSettings.prefix}help`,
        type: 2
    });

    setInterval(() => {
        let activity = this.client._presence.random();
        this.client.user.setActivity({
            name: `${activity.title} | ${this.client.config.defaultSettings.prefix}help`,
            type: activity.type
        });
    }, 300000);
}
};
