module.exports = async(client,reaction,user) => {
    if(reaction.message.channel.id !== client.config.bot.todo_channel) return;
    if(reaction.message.author.id !== client.user.id) return;
    if(user.id === client.user.id) return;
    try{
    let content = reaction.message.content.replace(/```/g,"").replace(/\n/g,"");
    let usertag = user.tag;
    if(reaction.message.edits.length > 1){
        usertag = "";
        content = content.replace("diff", "").replace("cs", "").slice(1);
    }
    switch(reaction.emoji.name){
        case "🟢": // green
            reaction.message.edit(`!${content} ${usertag}`, { code: "diff"});
            break;
        case "🟠": // orange
            reaction.message.edit(`#${content} ${usertag}`,{code: "cs"});
            break;
        case "🔴": //red
            reaction.message.edit(`-${content} ${usertag}`,{code: "diff"});
            break;
    }
    }catch(error){
        throw error.message;
    }
};
