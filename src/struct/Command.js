class Command {
    constructor(
        client,
        {
            name = null,
            description = "No description provided.",
            category = "Information",
            usage = "No usage provided.",
            enabled = true,
            guildOnly = true,
            aliases = new Array(),
            permLevel = "User",
        }
    ) {
        this.client = client;
        this.conf = { enabled, guildOnly, aliases, permLevel };
        this.help = { name, description, category, usage };
    }
}
module.exports = Command;
