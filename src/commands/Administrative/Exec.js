const { exec } = require("child_process");

module.exports = {
    name: "exec",
    description: "Execute command-line level statements as if you were on the command line.",
    args: false,
    usage: "<command>",
    adminOnly: true,
    preventDefaultError: true,
    category: "Administrative",
    execute(message, args, client) {
        try {
            const cmd = args.join(" ");
            exec(`${cmd}`, (error, stdout) => {
                if(error) return error;
                return message.channel.send(client.clean(stdout), { code: "xl", split: true });
            });
        } catch (error) {
            throw error.message;
        }
    },
    async error(message, args, client, error) {
        return message.channel.send(`\`ERROR\` \`\`\`xl\n${client.clean(error)}\n\`\`\``)
    }
};