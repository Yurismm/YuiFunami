const {PREFIX} = require('../config.json')
module.exports = {
    name: "help",
    description: "help command",
    execute(message, args) {
      let core = [];
      let misc = [];
      let fun = [];
      let dev = [];
  
      if (args.length == 0) {
        for (var i = 0; i < message.client.commands.array().length; i++) {
          let type = message.client.commands.array()[i].config.type;
          let name = message.client.commands.array()[i].name;
          if (type === 'core') core.push(name);
          else if (type.toLowerCase() === 'misc') misc.push(name);
          else if (type.toLowerCase() === 'fun') fun.push(name);
          else if (type.toLowerCase() === 'dev') dev.push(name);
          else return false;
        }
  
        message.channel.send({
          embed: {
            fields: [
              { name: "Core:", value: `\`${core.join("` `")}\``, inline: false },
              { name: "Misc:", value: `\`${misc.join("` `")}\``, inline: false },
              { name: "Fun:", value: `\`${fun.join("` `")}\``, inline: false },
              { name: "developer", value:`\`${dev.join("` `")}\``, inline: false }
            ],
            footer: { text: `use ${PREFIX}help [command] for more info on a command`},
            color: 0x000FFF,
            timestamp: message.createdAt.toISOString()
          }
        });
      } else {
        for (var i = 0; i < message.client.commands.array().length; i++) {
          if (message.client.commands.array()[i].name === args[0]) {
            message.channel.send({
              embed: {
                fields: [
                  {
                    name: args[0],
                    value: message.client.commands.array()[i].description,
                    inline: false
                  }
                ],
                color: 0x000FFF,
                timestamp: message.createdAt.toISOString()
              }
            });
          }
        }
      }
    }
  };
  
  module.exports.config = {
    type: 'core'
  };
  