const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "eval", //are there aliases?
    description: "Run a code for the bot from discord. (Owner only)",
    options: [
      {
        name: 'code',
        description: 'The code to run.',
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
       
      const code = interaction.options.getString('code')
        interaction.deferReply().then(m => m.deleteReply())
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
        
              interaction.channel.send(clean(evaled), {code:"xl"});
            } catch (err) {
              interaction.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
            }
    },
};


      
    

