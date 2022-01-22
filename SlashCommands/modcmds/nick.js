const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require('ms')
const warnSchema = require('../../models/punishments')


module.exports = {
    name: "nick",
    description: "Change a user's nickname to the name requested by a user.",
    userPermissions: ['MANAGE_NICKNAMES'],
		options: [
      {
        name: 'user',
        description: 'The user you want to change nickname of.',
        type: 'USER',
        required: true,
      }, 
      {
        name: 'nickname',
        description: 'The nickname you want to set. Resets if provided \'0\'',
        type: 'STRING',
        required: true
      }
     
		
    ],
    
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      const rand = Math.random().toString(16).substr(2, 8)
      let guilld = client.guilds.cache.get('930503731974385694');
    let logch = guilld.channels.cache.get('931558609194737786')

    const user = interaction.options.getMember('user')
		const nick = interaction.options.getString('nickname');

    

      const succuss = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`:white_check_mark: Changed ${user}'s nickname to \`${nick}\`.`);
  const reset = new MessageEmbed()
      
        .setColor('GREEN')
        .setDescription(`:white_check_mark: Reset ${user}'s nickname.`);
  const log = new MessageEmbed()
        .setTitle('Nickname changed')
        .setColor('AQUA')
        .addField('Username', `${user.user.username}`)
        .addField('New Nickname', `${nick}`)
        .addField('Moderator', `${interaction.member}`)
        
        .setTimestamp()
       const rlog = new MessageEmbed()
        .setTitle('Nickname Reset!')
        .setColor('AQUA')
        .addField('Username', `${user.user.username}`)
        .addField('Moderator', `${interaction.member}`)
        
        .setTimestamp()
if(nick === '0') { 
  user.setNickname(null)
interaction.reply({embeds: [reset]})
 logch.send({embeds: [rlog]})
} else { user.setNickname(nick)
 interaction.reply({embeds: [succuss]})
 logch.send({embeds: [log]})}


      
      
      
      

 
}
}
