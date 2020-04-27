const { exec } = require("child_process");
const Command = require("../../struct/Command");
module.exports = class Execute extends Command{
    constructor(client){
        super(client,{
    
    name: "exec",
    description: "Execute command-line level statements as if you were on the command line.",
    usage: "<command>",
    permissions: ["Bot Admin"],
        });
    }
    async run(message, args) {
        try {
            const cmd = args.join(" ");
            exec(`${cmd}`, async (error, stdout) => {
                if(error) return error;
                stdout = await this.client.clean(stdout);
                return message.channel.send(stdout, { code: "xl", split: true });
            });
        } catch (error) {
            throw error.message;
        }
    }
    async error(message, args, error) {
        return message.channel.send(`\`ERROR\` \`\`\`xl\n${await this.client.clean(error)}\n\`\`\``);
    }
};