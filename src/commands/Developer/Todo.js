module.exports = {
    name: "todo",
    description: "Create a todo message with reactions.",
    args: true,
    usage: "<task>",
    permissions: ["DEVELOPER"],
    category: "Developer",
    async execute(message, args, client) {
        if(message.channel.id !== client.config.bot.todo_channel) return;   
        let msg = await message.channel.send(args.join(" "),{code:""});
        message.delete();
        await msg.react("🟢"); //green
        await msg.react("🟠"); //orange
        await msg.react("🔴"); //red
    }
};
