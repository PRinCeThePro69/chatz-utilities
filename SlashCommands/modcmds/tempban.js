const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require('ms')
const warnSchema = require('../../models/punishments')
function makeid(length) {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
   }
   return result;
}
module.exports = {
    name: "tempban",
    description: "Temporarily bans a user for breaking rules.",
    userPermissions: 'BAN_MEMBERS',
		options: [
      {
        name: 'user',
        description: 'The user to ban.',
        type: 'USER',
        required: true,
      }, 
      {
        name: 'duration',
        description: 'The time to ban the user for.',
        type: 'STRING',
        required: true,
      },
      {
        name: 'reason',
        description: 'The reason for the ban.',
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
     
  let guilld = client.guilds.cache.get('930503731974385694');
    let logch = guilld.channels.cache.get('931558609194737786')

      let duration = interaction.options.getString('duration');
let time;
let type
try {
    const split = duration.match(/\d+|\D+/g)
    time = parseInt(split[0])
    type = split[1].toLowerCase()
} catch (e) {
    interaction.deferReply({ ephemeral: true})
    return interaction.followUp({content: 'You need to specify a valid format! (Example: 1m, 1d, 1h etc)', ephemeral: true})

}
if(type === 'h'){
    time *= 60
} else if (type === 'd') {
    time *= 60 * 24
} else if (type !== 'm') {
    interaction.deferReply({ ephemeral: true})
  return  interaction.followUp({content: 'You need to specify a valid format! (Example: 1m, 1d, 1h etc)', ephemeral: true})
}
         const expires = new Date();
  expires.setMinutes(expires.getMinutes() + time)
        const banId = makeid(16)

        const target = interaction.options.getMember('user')
        const reason = interaction.options.getString('reason')
      
      if(target.id === interaction.user.id) return interaction.reply({content: 'You can\'t ban yourself.'})
   if(target.id === client.user.id) return interaction.reply({content: 'You can\'t ban me.'})
        const successful = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`:white_check_mark: ${target} has been successfully **banned**. | \`${banId}\``)
        const dm = new MessageEmbed()
        .setColor('BLUE')
        .setAuthor(`${client.user.username}`, client.user.avatarURL())
        
        .setTitle( `You have been banned in ${interaction.guild.name}`)
        .addField(`Reason`, reason)
         .addField('Duration', `${duration}`)
        .setFooter('Punishment ID:' + ` ${banId}`)
        const log = new MessageEmbed()
        .setTitle('New Ban!')
        .setColor('RED')
        .addField('User', `${target}`)
        .addField('Reason', `${reason}`)
        .addField('Moderator', `${interaction.member}`)
          .addField('Expires in', `${duration}`)
          .setFooter('Punishment ID:' + ` ${banId}`)
        .setTimestamp();
      await    target.user.send({embeds: [dm]}).catch((e) => {
       console.log(e)
     });
 
await target.ban({reason}).catch((e) => {
       console.log(e)
    })
     await new warnSchema({
         _id: banId,
         userId: target.id,
         reason,
         type: 'Ban',
         staffId: interaction.member.id,
         expires,
       
         timestamp: interaction.createdTimestamp,
     
         


     }).save();
 
     interaction.reply({embeds: [successful]})
     logch.send({embeds: [log]})
   
}
}
