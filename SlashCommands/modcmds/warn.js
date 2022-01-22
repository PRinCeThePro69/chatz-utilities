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
    name: "warn",
    description: "Warns a user for breaking rules.",
    userPermissions: ['MANAGE_MESSAGES'],
		options: [
      {
        name: 'user',
        description: 'The user to warn.',
        type: 'USER',
        required: true,
      }, 
			{
				name: 'reason',
				description: 'The reason for the warn.',
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

     let duration = 24 * 30;

        const expires = new Date();

     expires.setHours(expires.getHours() + duration)
        const warnId = makeid(16)

        const target = interaction.options.getUser('user')
        const reason = interaction.options.getString('reason')
      

        const successful = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`:white_check_mark: ${target} has been successfully **warned**. | \`${warnId}\``)
        const dm = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor(`${client.user.username}`, client.user.avatarURL())
        .setTitle( `You have been warned in ${interaction.guild.name}`)
        .addField(`Reason`, reason)
        .addField('Expires', `${duration / 24} days`)
        .setFooter('Punishment ID:' + ` ${warnId}`)
        const wlog = new MessageEmbed()
        .setTitle('New Warn!')
        .setColor('RED')
        .addField('User', `${target}`)
        .addField('Reason', `${reason}`)
        .setFooter(`Punishment ID: ` + `${warnId}`)
          .addField('Expires in', '30 days')
        .setTimestamp()
            
 

     await new warnSchema({
         _id: warnId,
         userId: target.id,
         reason,
         type: 'Warn',
         staffId: interaction.member.id,
       
         timestamp: interaction.createdTimestamp,
         expires,
         


     }).save();
 
     interaction.reply({embeds: [successful]})
     logch.send({embeds: [wlog]})
     target.send({embeds: [dm]}).catch((e) => {
       console.log(e)
     })
}
}
