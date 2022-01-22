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
    name: "unban",
    description: "Unbans a banned user.",
    userPermissions: ['BAN_MEMBERS'],
		options: [
      {
        name: 'userid',
        description: 'The user\'s id to unban.',
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

    //  let duration = 24 * 30;

    //     const expires = new Date();

    //  expires.setHours(expires.getHours() + duration)
        const unbanId = makeid(16)


        const target = interaction.options.getString('userid')
        const reason = interaction.options.getString('reason')
      const targetuser = client.users.cache.get(`${target}`)
      if(target === interaction.user.id) return interaction.folldeferReplyowUp({content: 'You can\'t unban yourself.'})
   if(target === client.user.id) return interaction.deferReply({content: 'You can\'t unban me smh.'})
        
    
      
 
await interaction.guild.members.unban(target).then(async(user) => {
const successful = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`:white_check_mark: ${user.tag} has been successfully **unbanned**. | \`${unbanId}\``)
          const log = new MessageEmbed()
        .setTitle('Member Unbanned!')
        .setColor('RED')
        .addField('User', `${user.tag}`)
        .addField('Moderator', `${interaction.member}`)
        .addField('Reason', `${reason}`)
          // .addField('Expires in', '30 days')
          .setFooter(' ID:' + ` ${unbanId}`)
        .setTimestamp();
             await new warnSchema({
         _id: unbanId,
         userId: target,
         reason,
         type: 'Unban',
         staffId: interaction.member.id,
       
         timestamp: interaction.createdTimestamp,
     
         


     }).save();
 
     interaction.deferReply({embeds: [successful]})
     logch.send({embeds: [log]})
  
}).catch((e) => {
  console.log(e)
      interaction.deferReply({content: 'Specify a valid banned members ID.'})
    })

   
}
}
