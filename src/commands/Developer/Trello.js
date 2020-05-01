

const {MessageEmbed} = require("discord.js");
const Trello = require("trello");
const config = require("../../config");
const trello = new Trello(config.trello_key,config.trello_token);
const Command = require("../../struct/Command");
const colors = require("../../util/Colors");

module.exports = class Trello extends Command{
    constructor(client){
        super(client, {
    name: "trello",
    description: "Add or show stuff from the trello board.",
    usage: "<add|show> <info|todo|doing|done> <description>",
    permissions: "Bot Admin",
        });
    }
    async run(message, args) {
        
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
                    .setTitle("Posted to the Trello board")
                    .setURL(card.shortUrl)
                    .setDescription(`New Card in ${listNames[card.idList]}: ${card.name}`)
                    .setColor(colors.embeds);
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
                if(list.length < 1) return msg.edit(new MessageEmbed().setTitle(`Nothing in list ${listNames[idList[args[1]]]}`).setURL("https://trello.com/b/MoygwbXE/yui-funami").setColor(colors.embeds));
                let description = "";
                const embed = new MessageEmbed()
                    .setTitle(`${listNames[idList[args[1]]]} list`)
                    .setURL("https://trello.com/b/MoygwbXE/yui-funami")
                    .setColor(colors.embeds);
                const cards  = list.filter(c => c.idList === idList[args[1].toLowerCase()]);
                
                description = cards.map(c => {
                    return `[\`${c.shortLink}\`](${c.shortUrl}): ${c.name}`;
                }).join("\n");
                embed.setDescription(description);
                await msg.edit("",{embed:embed});
                
            }
        
    }
};