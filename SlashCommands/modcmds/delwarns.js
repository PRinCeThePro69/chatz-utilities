const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require('ms')
const warnSchema = require('../../models/punishments')


module.exports = {
    name: "delwarns",
    description: "Remove all of the warns from a user.",
    userPermissions: ['ADMINISTRATOR'],
		options: [
      {
        name: 'user',
        description: 'The user you want to delete the warns from.',
        type: 'USER',
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

    const user = interaction.options.getUser('user')
		
      const succuss = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`:white_check_mark: All the warns for ${user} have been deleted.`)
  const log = new MessageEmbed()
        .setTitle(' Warns Removed')
        
        .setColor('AQUA')
        .addField('User', `${user}`)
        .addField('Moderator', `${interaction.member}`)
        .setTimestamp()
      

 await warnSchema.find({
           userId: user.id,
          
     }, async (err, data) => {
       if(err) console.log(err)

       if(data){
          await warnSchema.deleteMany({
             userId: user.id,
           
          })
          interaction.followUp({embeds: [succuss]})
          logch.send({embeds: [log]})
       } else {
         interaction.followUp({content: `**${user.tag}** doesn't have any strikes in the server.`})
       }
     } ).catch(err => {
        console.log(err)
      });


      
      
      
      

 
}
}
