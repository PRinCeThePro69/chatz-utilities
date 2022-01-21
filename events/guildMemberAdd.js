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
 

})