const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require('ms')
const warnSchema = require('../../models/punishments')


module.exports = {
    name: "find",
    description: "Find a specific warn by the id of it.",
    userPermissions: ['ADMINISTRATOR'],
		options: [
      {
        name: 'id',
        description: 'The id of the warn to find.',
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
      

    const warnId = interaction.options.getString('id')
		if (isNaN(warnId)) return interaction.deferReply("Input a number.")
      const succuss = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`:white_check_mark: The warn with ID: \`${warnId}\` has been deleted.`)
  
      

      const data = await warnSchema.find({
          _id: warnId
      }).catch(err => {
        console.log(err)
      });

if(!data) return interaction.deferReply({content: `\`${warnId}\` is not a valid Id!`, ephemeral: true});
        if(data < 12) return interaction.deferReply({content: `\`${warnId}\` is not a valid Id!`, ephemeral: true});
        if(data > 24) return interaction.deferReply({content: `\`${warnId}\` is not a valid Id!`, ephemeral: true});
     const embedDesc = data.map((warn) => {
       
        const moderator = interaction.guild.members.cache.get(warn.staffId);
          
   
    
        return[
           `**ID: ${warn.id} | Moderator: ${moderator}**`,
            `<@${warn.userId}> - **${warn.type}** - ${warn.reason} - <t:${Math.round(+warn.timestamp/1000)}:F>`

        ].join("\n");
    }).join('\n\n')

// const user = data.map((warn) => {
//    warn.userId
// })
const rep = new MessageEmbed()
    .setTitle(`Found a punishment.`)
    .setColor('RANDOM')
    .setDescription(embedDesc)
   
 interaction.deferReply({embeds: [rep]})
}
} 