

const {MessageEmbed} = require("discord.js");
const Trello = require("trello");

module.exports = {
    name: "trello",
    description: "Inject and evaluate code within the bot process.",
    args: true,
    usage: "<add|show> <info|todo|doing|done> <description>",
    permissions: ["DEVELOPER"],
    category: "Developer",
    async execute(message, args, client) {
        const trello = new Trello(client.config.secret["trello-key"], client.config.secret["trello-token"]);
        const idList = {
           "info": "5ea147439683cb49d80f0a3d",
           "todo": "5ea141d20cd9607af62ff09c",
           "doing": "5ea141d20cd9607af62ff09d",
           "done": "5ea141d20cd9607af62ff09e"
       };
        const listNames = {
         "5ea147439683cb49d80f0a3d": "Basic info/rules" ,
         "5ea141d20cd9607af62ff09c": "To Do",
         "5ea141d20cd9607af62ff09d": "Doing",
         "5ea141d20cd9607af62ff09e": "Done"
    };
       const name = args.slice(2).join(" ");
       
            
            if(args[0] === "add"){
                try{
               
                let msg = await message.channel.send("Posting to the board...");
                let card  = await trello.addCard(name,"",idList[args[1].toLowerCase()]);
                const embed = new MessageEmbed()
                    .setTitle("Posted to the trello board")
                    .setURL(card.shortUrl)
                    .setDescription(`New Card in ${listNames[card.idList]}: ${card.name}`)
                    .setColor("2f3136");
                    await msg.edit("",{embed:embed});
                        
                    }catch(error){
                        message.error;
                    }        
                }
            if(args[0]=== "show"){
                if(!args[1]){
                    args[1] = "todo";
                }
                let msg = await message.channel.send("Fetching from the list...");
                const list = await trello.getCardsOnList(idList[args[1].toLowerCase()]);
                if(list.length < 1) return msg.edit(new MessageEmbed().setTitle(`Nothing in list ${listNames[idList[args[1]]]}`).setURL("https://trello.com/b/MoygwbXE/yui-funami").setColor("2f3136"));
                let description = "";
                const embed = new MessageEmbed()
                    .setTitle(`${listNames[idList[args[1]]]} list`)
                    .setURL("https://trello.com/b/MoygwbXE/yui-funami")
                    .setColor("2f3136");
                const cards  = list.filter(c => c.idList === idList[args[1].toLowerCase()]);
                
                description = cards.map(c => {
                    return `[\`${c.shortLink}\`](${c.shortUrl}): ${c.name}`;
                }).join("\n");
                embed.setDescription(description);
                await msg.edit("",{embed:embed});
                
            }
        
    }
};