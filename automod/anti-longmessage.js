const { MessageEmbed } = require('discord.js')
const warnSchema = require('../models/automodSchema')

  
module.exports = (client) => {


      client.on('messageCreate', msg => {
          if (
        msg.author.bot || !msg.guild) return;
        let guilld = client.guilds.cache.get('930503731974385694');
    let logch = guilld.channels.cache.get('931558609194737786')
    function makeid(length) {
        var result = '';
        var characters = '0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }
      let duration = 1;
      const expires = new Date();
      expires.setHours(expires.getHours() + duration)
      const warnId = '[AutoMod]' + makeid(16)
      if(msg.content.length >= 500) {
          const user = msg.member
		
           const log = new MessageEmbed()
        .setTitle('New Warn!')
        .setColor('RED')
        .addField('User', `${msg.author}`)
        .addField('Reason', 'Sending too large messages in the server.')
          .addField('Expires In', '1 hour')
        .setTimestamp()
          const e = new MessageEmbed()
        .setColor('RED')
				.setDescription(`${msg.author} You are not allowed to send too large in this server!`)
        msg?.delete()
        msg.channel.send({
					embeds: [e]
    
          
				})
                new warnSchema({
                    _id: warnId,
                    userId: user.user.id,
                    reason: '[AutoMod] Sending too large messages in the server.',
                    timestamp: msg.createdTimestamp,
                    expires
                  }).save()
        logch.send({embeds: [log]})
  
          try {
            const dm = new MessageEmbed()
            .setColor('PURPLE')
            .setAuthor(`${client.user.username}`, client.user.avatarURL())
            .setTitle(`You have been warned in **Chat And Chill.**`)
            .addField(`Reason`, `Sending too large messages in the server.`)
            .addField('Expires', `1 Hour`)
            .setFooter({
              text: 'Punishment ID:' + ` ${warnId}`
            })
                    msg.author.send({embeds: [dm]})
 
                }catch(err) {
                    console.log(err)
                }
      }




})
}
