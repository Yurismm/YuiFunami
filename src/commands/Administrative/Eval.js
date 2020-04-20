module.exports = {
    name: "eval",
    description: "Inject and evaluate code within the bot process.",
    args: true,
    usage: "<code>",
    adminOnly: true,
    category: "Administrative",
    preventDefaultError: true,
    async execute(message, args, client) {
        try {
            const code = args.join(" ");
<<<<<<< HEAD
            let evaled = await eval(`(async() => {${code}})()`);
=======
            let evaled = await eval(code);
>>>>>>> b027eec6c2bc431ff09a3c5e7d3617f1293aedf4

            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
            
            return message.channel.send(client.clean(evaled), { code: "js", split: true });
        } catch(error) {
            throw error.message;
        }
    },
    async error(message, args, client, error) {
        return message.channel.send(`\`ERROR\` \`\`\`xl\n${client.clean(error)}\n\`\`\``);
    }
};