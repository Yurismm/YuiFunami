const {exec} = require("child_process");
const {redBright} = require("chalk");
module.exports = {
    name: "cmd",
    description: "Inject and evaluate code within the bot process.",
    args: true,
    usage: "<cmd>",
    adminOnly: true,
    category: "Administrative",
    async execute(message, args, client) {
        const cmd = args.join(" ");
        exec(cmd,(err,stdout,stderr) => {
            if(err){
                message.channel.send(err,{code: "xl"});
                client.logger.error(redBright(err));
                return;
            }
            
            message.channel.send(`Succesfully executed command:\nstdout: ${stdout}\nstderr: ${stderr}`,{code:"xl"});
     });
    
    }
    
};
