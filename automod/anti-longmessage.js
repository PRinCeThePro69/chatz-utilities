const { MessageEmbed } = require('discord.js')
const warnSchema = require('../models/automodSchema')

  
module.exports = (client) => {


      client.on('messageCreate', msg => {
          if (
        msg.author.bot || !msg.guild || msg.content.startsWith(">eval")) return;
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
				.setDescription(`${msg.author} You are not allowed to send too large messages in this server!`)
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
                  }).save().then 
                  ( warnSchema.find({
                     userId: user.user.id
                   }, (err, data) => {
                     if(err) console.log(e)
                     if(data) {
                    const   warncount = data.length + 1
                      if(Number.isInteger(warncount / 3)) {
                         const log = new MessageEmbed()
                       .setTitle('New Mute!')
                       .setColor('RED')
                       .addField('User', `${msg.author}`)
                       .addField('Reason', 'Multiple AutoMod Infractions')
                       .addField('Duration', '1 hour')
                       .setTimestamp()
                     var mutedEm = new MessageEmbed()
                       .setColor('RED')
                       .setDescription(`**${msg.author.username}** has been muted for continuous infractions`)
                     msg.channel.send({
                       embeds: [mutedEm]
                     }).then(m => {
                       setTimeout(() => {
                         m.delete()
                       }, 10000)
                     })
                     msg.member.timeout(60 * 60 * 1000, '[Automod] 3 continuous infractions.').catch((e) => {
                       console.log(e)
                     }).then(warnSchema.deleteMany({ userId: user.user.id}))
                     logch.send({
                       embeds: [log]
                     })
                     try {
                       var yougotmuted = new MessageEmbed()
                         .setColor('RED')
                         .setTitle(`You have been muted in ${msg.guild.name}`)
                         .setDescription('You have been muted after 3 continuous infractions')
                         .addField('Reason', 'Multiple AutoMod Infractions')
                         .addField('Expires', '1h')
                       msg.author.send({
                         embeds: [yougotmuted]
                       })
                     } catch (err) {
                       console.log(err)
                     }  
                       }
                   }
                   }))
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
