module.exports = {
    name: "eval",
    description: "Inject and evaluate code within the bot process.",
    args: true,
    usage: "<code>",
    permissions: ["DEVELOPER"],
    category: "Developer",
    async execute(message, args, client) {
        const code = args.join(" ");
       
        try {
            const evaled = await eval(`(async () => { ${code} })()`);
            const clean = await client.clean(evaled);
            const MAX_CHARS = 3+2+ clean.length + 3;
            if (MAX_CHARS > 2000) {
                return message.channel.send(
                    "Output exceeded 2000 characters. Sending as a file.",
                    {
                        files: [
                            {
                                attachment: Buffer.from(clean),
                                name: "output.txt",
                            },
                        ],
                    }
                );
            }
            message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
        } catch (err) {
            message.channel.send(
                `\`ERROR\` \`\`\`xl\n${err}\n\`\`\``
            );
        }
    },
    
};

