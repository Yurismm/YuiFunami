module.exports = {
    name: "discriminator",
    aliases: ["discrim", "search-discrim", "search-discriminator"],
    description: "Searches for other users with your desired discriminator",
    category: "Search",
    async execute(message, args, client) {
        const discrim = args.length !== 0 ? args.join(" ") : message.author.discriminator;
        
        if (!/^[0-9]+$/.test(discrim) && !discrim.length === 4) {
            return message.channel.send("Discriminator was invalid.");
        }
        
        const users = client.users.cache.filter(user => user.discriminator === discrim).map(user => user.username + " (" + user.id + ")");
        return message.channel.send(`I found **${users.length}** ${(users.length === 1) ? "user"  : "users"} with the discriminator **#${discrim}**:\n${client.util.trimArray(users, 50).join(", ")}`);
    }
};