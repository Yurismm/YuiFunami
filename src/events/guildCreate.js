module.exports = class {
    constructor(client){
        this.client = client
    }
    async execute(guild){
        console.log('hello')
        await this.client.prefixes.set(guild.id,this.client.config.defaultSettings.prefix)
    }
}