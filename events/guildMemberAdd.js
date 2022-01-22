const client = require("../index");



const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment  } = require("discord.js");
const sentmsgSchema = require('../models/sentonemsg');


client.on('guildMemberAdd', (mem) => {
   sentmsgSchema.find({
        userId: mem.user.id,
    }, (err, data) => {
        if(data && data.length) {
            mem.roles.add("934082996481437746")
        }
    });
 
       let guilld = client.guilds.cache.get('930503731974385694');
    let general = guilld.channels.cache.get('930503731974385697')
  
     
		
           const gc = new MessageEmbed()
        .setTitle('Someone has joined us!')
        .setColor('GREEN')
        .addField('User', `${mem}`)
        .setTimestamp()
           
           general.send({
              embeds: [gc]
           })
	   
})
