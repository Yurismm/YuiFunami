<<<<<<< HEAD
const Command = require("../../struct/Command");
module.exports = class Eval extends Command{
    constructor(client){
        super(client,{
    name: "eval",
    description: "Inject and evaluate code within the bot process.",
    args: true,
    usage: "<code>",
    permissions: ["DEVELOPER"],
    category: "Developer"
    
        });
    }
        async execute(message, args) {
            const code = args.join(" ");
           
            try {
                const evaled = await eval(`(async () => { ${code} })()`);
                const clean = await this.client.clean(evaled);
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
=======
const Command = require('../../struct/Command');

class Eval extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            description: 'Evaluates arbitrary Javascript.',
            category: 'System',
            usage: 'eval <expression>',
            aliases: ['ev'],
            permLevel: 'Bot Admin',
        });
    }

    async run(message, args, level) {
        const code = args.join(' ');
        try {
            const evaled = await eval(code);
            const clean = await this.client.clean(evaled);
            const MAX_CHARS = 3 + 2 + clean.length + 3;
            if (MAX_CHARS > 2000) {
                message.channel.send(
                    'Output exceeded 2000 characters. Sending as a file.',
                    {
                        files: [
                            {
                                attachment: Buffer.from(clean),
                                name: 'output.txt',
                            },
                        ],
                    }
                );
            }
>>>>>>> 2759f1ede7c8711d52a43b9a83f534ab8defce14
            message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
        } catch (err) {
            message.channel.send(
                `\`ERROR\` \`\`\`xl\n${await this.client.clean(
                    this.client,
                    err
                )}\n\`\`\``
            );
        }
    }
<<<<<<< HEAD
};
=======
}
>>>>>>> 2759f1ede7c8711d52a43b9a83f534ab8defce14

module.exports = Eval;
