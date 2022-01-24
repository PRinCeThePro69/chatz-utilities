const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require('ms')
const warnSchema = require('../../models/punishments')


module.exports = {
    name: "removewarn",
    description: "Remove a specific warn by the id of it.",
    userPermissions: 'ADMINISTRATOR',
		options: [
      {
        name: 'id',
        description: 'The id of the warn to delete.',
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
      let guilld = client.guilds.cache.get('930503731974385694');
    let logch = guilld.channels.cache.get('931558609194737786')

    const warnId = interaction.options.getString('id')
		if (isNaN(warnId)) return interaction.reply("Input a number")
      const succuss = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`:white_check_mark: The warn with ID: \`${warnId}\` has been deleted.`)
  
       
      

      const data = await warnSchema.findById(
           warnId
      ).catch(err => {
        console.log(err)
      });
       const user = data.userId
         const log = new MessageEmbed()
        .setTitle(' Warn Removed')
       
        .setColor('AQUA')
        .addField('User', `<@${user}>`)
        .addField('Moderator', `${interaction.member}`)
        .setFooter('Punishment ID:' + `${warnId}`)
        .setTimestamp()
if(!data) return interaction.reply({content: `\`${warnId}\` is not a valid Id!`, ephemeral: true});
        if(data < 12) return interaction.reply({content: `\`${warnId}\` is not a valid Id!`, ephemeral: true});
        if(data > 24) return interaction.reply({content: `\`${warnId}\` is not a valid Id!`, ephemeral: true});
      await  data.delete().catch(() => {
       
        console.error
      })
      
      interaction.reply({embeds: [succuss]})
      logch.send({embeds: [log]})

 
}
}
