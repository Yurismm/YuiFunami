class Command {
    /**
     * 
     * @param {YuiClient} client 
     * @param {CommandOptions} options 
     */
    constructor(client, options){
        this.client = client

        this.help = {
            name: options.name,
            description: options.description || 'No description',
            usage: options.usage || '',
            category: options.category,
            aliases: options.aliases || []
        }

        this.conf = {
            cooldown: options.cooldown || 1000,
            permissions: options.permissions || "null",
            args : options.args || false
            //stuff like dms allowed can go here
        }

        this.cooldown = new Set()
    }
    setCooldown(user){
        this.cooldown.add(user)

        setTimeout(() => this.cooldown.delete(user), this.conf.cooldown)
    }
    setMessage(message){
        this.message = message
    }


}
module.exports = Command