module.exports = {
    name: "todo",
    description: "Inject and evaluate code within the bot process.",
    args: true,
    usage: "<task>",
    permissions: ["DEVELOPER"],
    category: "Developer",
    async execute(message, args, client) {
        if(message.channel.id !== client.config.bot.todo_channel) return;   
        message.channel.send(args.join(" "),{code:""});
        message.delete();
    }
};