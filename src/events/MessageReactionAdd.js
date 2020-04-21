module.exports = async(client,reaction,user) => {
    if(!reaction.message.channel.id === client.config.bot.todo_channel) return;
    if(!reaction.message.author === client.user) return;
    const content = reaction.message.content.replace(/```/g,"").replace(/\n/g,"").replace("!", "").replace("#", "").replace("-", "");
    let usertag = user.tag;
    if(reaction.message.edits.length > 1){
        usertag = "";
    }
    switch(reaction.emoji.name){
        case "🟢": // green
            reaction.message.edit(`!${content.replace("diff", "").replace("cs", "")} ${usertag}`, { code: "diff"});
            break;
        case "🟠": // orange
            reaction.message.edit(`#${content.replace("diff", "")} ${usertag}`,{code: "cs"});
            break;
        case "🔴": //red
            reaction.message.edit(`-${content.replace("diff", "").replace("cs", "")} ${usertag}`,{code: "diff"});
            break;
    }
};