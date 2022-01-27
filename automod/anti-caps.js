const { MessageEmbed } = require('discord.js')


  
module.exports = (client) => {
    client.on("messageCreate", async msg => {
        let guilld = client.guilds.cache.get('930503731974385694');
        let logch = guilld.channels.cache.get('931558609194737786')
      
        if (!msg.guild || msg.author.bot || msg.content.length <= 17) return;
        // Use `||` (OR) to make it cleaner.
      
        let non_caps=0, caps=0;
        // Create the variables.
      
        for (x=0;x<msg.content.length;x++) {

          if (msg.content[x].toUpperCase() === msg.content[x] && !isNaN(msg.content[x])) caps++;
          else non_caps++;
        }
        // `caps` is the amount of capital letters, while `non_caps` is the amount of non-capital letters. This checks for each letter of the message and gets the amount of `caps` and `non_caps`.
      
        const textCaps = (caps / msg.content.length) * 100;
        // Gets a percentage of the capital letters.
      console.log(textCaps)
        if (textCaps >= 75 && !msg.mentions.users.first() && !msg.mentions.channels.first() && !msg.content.includes(Number)) {
        // If the capital letters is over or equals to 60% of the message,
        // and if the user isn't an ADMINISTRATOR, then...
      
        const e = new MessageEmbed()
        .setColor('RED')
	.setDescription(`${msg.author} has been muted for too many caps in one message.`)
         const log = new MessageEmbed()
        .setTitle('New Mute!')
        .setColor('RED')
        .addField('User', `${msg.author}`)
        .addField('Reason', 'Too many caps')
          .addField('Duration', '1 hour')
        .setTimestamp()

          
          msg.delete(); 
          msg.member.timeout(60 * 60 * 1000, '[Automod] Sending too many capital letters in one message.').catch((e) => console.log(e))
          try {
            var yougotmuted = new MessageEmbed()
                           .setColor('RED')
                           .setTitle(`You have been muted in ${msg.guild.name}`)
                           .setDescription('You have been muted for violating our rules!')
                           .addField('Reason' , `[AutoMod] Sending too many capital letters in one message. Your message had \`${textCaps}%\` of capital letters. Max is \`75%\` per message.`)
                           .addField('Expires' , '1 hour')
                               msg.author.send({embeds: [yougotmuted]})
                           }catch(err) {
                               console.log(err)
                           }
          
                           msg.channel.send({embeds: [e]})
                           logch.send({embeds: [log]})
          
           
        }
      })

     
}
