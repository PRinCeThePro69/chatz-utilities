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
    name: "kick",
    description: "kicks a user for breaking rules.",
    userPermissions: ['KICK_MEMBERS'],
		options: [
      {
        name: 'user',
        description: 'The user to kick.',
        type: 'USER',
        required: true,
      }, 
			{
				name: 'reason',
				description: 'The reason for the kick.',
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

    //  let duration = 24 * 30;

    //     const expires = new Date();

    //  expires.setHours(expires.getHours() + duration)
        const kickId = makeid(16)

        const target = interaction.options.getMember('user')
        const reason = interaction.options.getString('reason')
      
      if(target.id === interaction.user.id) return interaction.reply({content: 'You can\'t kick yourself.'})
   if(target.id === client.user.id) return interaction.reply({content: 'You can\'t kick me.'})
        const successful = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`:white_check_mark: ${target} has been successfully **kicked**. | \`${kickId}\``)
        const dm = new MessageEmbed()
        .setColor('BLUE')
        .setAuthor(`${client.user.username}`, client.user.avatarURL())
        
        .setTitle( `You have been kicked in ${interaction.guild.name}`)
        .addField(`Reason`, reason)
       
        .setFooter('Punishment ID:' + ` ${kickId}`)
        const log = new MessageEmbed()
        .setTitle('New kick!')
        .setColor('RED')
        .addField('User', `${target}`)
        .addField('Reason', `${reason}`)
        .addField('Moderator', `${interaction.member}`)
          // .addField('Expires in', '30 days')
          .setFooter('Punishment ID:' + ` ${kickId}`)
        .setTimestamp();
      await    target.user.send({embeds: [dm]}).catch((e) => {
       console.log(e)
     });
 
await target.kick(reason).catch((e) => {
       console.log(e)
    })
     await new warnSchema({
         _id: kickId,
         userId: target.id,
         reason,
         type: 'Kick',
         staffId: interaction.member.id,
       
         timestamp: interaction.createdTimestamp,
     
         


     }).save();
 
     interaction.reply({embeds: [successful]})
     logch.send({embeds: [log]})
   
}
}
