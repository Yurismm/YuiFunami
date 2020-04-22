const { exec } = require("child_process");

module.exports = {
    name: "exec",
    description: "Execute command-line level statements as if you were on the command line.",
    args: false,
    usage: "<command>",
    permissions: ["DEVELOPER"],
    preventDefaultError: true,
    category: "Developer",
    async execute(message, args, client) {
        try {
            const cmd = args.join(" ");
            exec(`${cmd}`, async (error, stdout) => {
                if(error) return error;
                stdout = await client.clean(stdout)
                return message.channel.send(stdout, { code: "xl", split: true });
            });
        } catch (error) {
            throw error.message;
        }
    },
    async error(message, args, client, error) {
        return message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(error)}\n\`\`\``);
    }
};