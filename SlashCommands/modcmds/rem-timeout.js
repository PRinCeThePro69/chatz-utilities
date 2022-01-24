const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require('ms')

module.exports = {
    name: "rem-timeout",
    description: "Remmoves timeout from a user if the user is timed out.",
    userPermissions: 'MODERATE_MEMBERS',
		options: [
      {
        name: 'user',
        description: 'The user to remove timeout from.',
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
       const mem = interaction.guild.members.cache.get(user.id)
       
       
			        if (user === client.user) interaction.reply({content: "You can't unmute me", ephemeral: true})
			 if (mem === interaction.member) interaction.reply("You can't unmute yourself")

       const succ = new MessageEmbed()
       .setColor('GREEN')
       .setDescription(`:white_check_mark: Successfully removed timeout from ${user}!`)
      
			  const log = new MessageEmbed()
        .setTitle('Removed Timeout!')
        .setColor('GREEN')
        .addField('User', `${user}`)
        .addField('Moderator', `${interaction.member}`)
        
        .setTimestamp()
        
				 //dis good embed? which up or down VVVVV ill say  after seeing the dm,
				 const ugotunbonned = new MessageEmbed()
         .setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})
         .setColor('RANDOM')
				 .setTitle("Your time out got removed in Chat And Chill!")
			
         .setTimestamp()
if(mem.isCommunicationDisabled(true)) {
    mem.timeout(null)
  interaction.reply({embeds: [succ]})
  logch.send({embeds: [log]})
				 user.send({
					 embeds: [ugotunbonned]
				 })
			 .catch((e) => {
				 console.log('err'+ e)
			 })

  

} else { 
 return  interaction.reply({content: 'They are not muted.'});
 
}
}
}
