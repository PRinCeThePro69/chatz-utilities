const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "eval", //are there aliases?
    description: "Check info about and IP",
    options: [
      {
        name: 'code',
        description: 'Run a code for the bot from discord. (Owner only)',
        type: 'STRING',
        required: true,
      },
    ],
    
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const command = await client.commands.get(this.name);
        command.defaultPermission = false
        const permissions = [
            {
                id: '593696963061481532',
                type: 'USER',
                permission: true,
            },
            {
                id: '689173890450194434',
                type: 'USER',
                permission: true,
            }
        ];
        
        await command.permissions.add({ permissions });
      const code = interaction.options.getString('code')

            function clean(text) {
                if (typeof(text) === "string")
                  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                else
                    return text;
              }
            try {
             
              let evaled = eval(code);
        
              if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);
        
             // msg.channel.send(clean(evaled), {code:"xl"});
            } catch (err) {
              msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
            }
    },
};


      
    

