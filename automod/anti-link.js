const { MessageEmbed } = require('discord.js')


  
module.exports = (client) => {

 function isValidURL(string) {
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
      };
      client.on('messageCreate', msg => {
          if (
        msg.author.bot || !msg.guild) return;
        let guilld = client.guilds.cache.get('930503731974385694');
    let logch = guilld.channels.cache.get('931558609194737786')
      var testContent = msg.content;
      if(isValidURL(testContent) && !msg.member.permissions.has('ADMINISTRATOR')) {
		
           const log = new MessageEmbed()
        .setTitle('New Mute!')
        .setColor('RED')
        .addField('User', `${msg.author}`)
        .addField('Reason', 'Sending external links')
          .addField('Duration', '30 mins')
        .setTimestamp()
          const e = new MessageEmbed()
        .setColor('RED')
				.setDescription(`${msg.author} You are not allowed to send external links in this server!`)

        msg.channel.send({
					embeds: [e]
    
          
				})
        msg.member.timeout(30 * 60 * 1000, '[Automod] Advertising').catch((e) => console.log(e))
        logch.send({embeds: [log]})
        msg.delete().catch((e))
          try {
 var yougotmuted = new MessageEmbed()
                .setColor('RED')
                .setTitle(`You have been muted in ${msg.guild.name}`)
                .setDescription('You have been muted for violating our rules!')
                .addField('Reason' , '[AutoMod] Sending external links which is not allowed in this server.')
                .addField('Expires' , '30 minutes')
                    msg.author.send({embeds: [yougotmuted]})
 
                }catch(err) {
                    console.log(err)
                }
      }




})
}
