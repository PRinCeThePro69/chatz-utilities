const { MessageEmbed } = require('discord.js')


  
module.exports = (client) => {


      client.on('messageCreate', msg => {
          if (
        msg.author.bot || !msg.guild) return;
        let guilld = client.guilds.cache.get('930503731974385694');
    let logch = guilld.channels.cache.get('931558609194737786')

      if(msg.mentions.size > 3) {
		
           const log = new MessageEmbed()
        .setTitle('New Mute!')
        .setColor('RED')
        .addField('User', `${msg.author}`)
        .addField('Reason', 'Pinging too many people in one message.')
          .addField('Duration', '6 hours')
        .setTimestamp()
          const e = new MessageEmbed()
        .setColor('RED')
				.setDescription(`${msg.author} You are not allowed to ping more than 3 people in this server!`)

        msg.channel.send({
					embeds: [e]
    
          
				})
        msg.member.timeout(360 * 60 * 1000, '[Automod] Pinging too many people').catch((e) => console.log(e))
        logch.send({embeds: [log]})
  
          try {
 var yougotmuted = new MessageEmbed()
                .setColor('RED')
                .setTitle(`You have been muted in ${msg.guild.name}`)
                .setDescription('You have been muted for violating our rules!')
                .addField('Reason' , '[AutoMod] Pinging too many people in one message.')
                .addField('Expires' , '6 hours')
                    msg.author.send({embeds: [yougotmuted]})
 
                }catch(err) {
                    console.log(err)
                }
      }




})
}
