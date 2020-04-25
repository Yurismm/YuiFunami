class Command {
<<<<<<< HEAD
    /**
     * 
     * @param {YuiClient} client 
     * @param {CommandOptions} options 
     */
    constructor(client, options){
        this.client = client;

        this.help = {
            name: options.name,
            description: options.description || "No description",
            usage: options.usage || "",
            category: options.category,
            aliases: options.aliases || []
        };

        this.conf = {
            cooldown: options.cooldown || 1000,
            permissions: options.permissions || "null",
            args : options.args || false,
            permLevel: this.permLevel || 0
            //stuff like dms allowed can go here
        };

        this.cooldown = new Set();
    }
    setCooldown(user){
        this.cooldown.add(user);

        setTimeout(() => this.cooldown.delete(user), this.conf.cooldown);
    }
    setMessage(message){
        this.message = message;
=======
    constructor(
        client,
        {
            name = null,
            description = 'No description provided.',
            category = 'Miscellaneous',
            usage = 'No usage provided.',
            enabled = true,
            guildOnly = false,
            aliases = new Array(),
            permLevel = 'User',
        }
    ) {
        this.client = client;
        this.conf = { enabled, guildOnly, aliases, permLevel };
        this.help = { name, description, category, usage };
>>>>>>> 18e6e9412ebc882f16970a3aa8b71a388439d225
    }
}
<<<<<<< HEAD
module.exports = Command;
=======
module.exports = Command;
>>>>>>> 18e6e9412ebc882f16970a3aa8b71a388439d225
