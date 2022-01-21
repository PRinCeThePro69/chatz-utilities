const {
  MessageEmbed
} = require('discord.js')
const warnSchema = require('../models/automodSchema')
const Fs = require('fs')
const ms = require('ms');

module.exports = async (client) => {


  client.on('messageCreate', async (msg) => {
    if (
      msg.author.bot || !msg.guild) return;
    let guilld = client.guilds.cache.get('930503731974385694');
    let logch = guilld.channels.cache.get('931558609194737786')

    const user = msg.member;




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
    const wlog = new MessageEmbed()
      .setTitle('New Warn!')
      .setColor('RED')
      .addField('User', `${msg.author}`)
      .addField('Reason', 'Bad words')
      .addField('Expires in', '1 hour')
      .setTimestamp()
    const dm = new MessageEmbed()
      .setColor('PURPLE')
      .setAuthor(`${client.user.username}`, client.user.avatarURL())
      .setTitle(`You have been warned in **Chat And Chill.**`)
      .addField(`Reason`, `[AutoMod] Using a banned word in the chat. Using bad words in public is forbidden in the server.`)
      .addField('Expires', `1 Hours`)
      .setFooter({
        text: 'Punishment ID:' + ` ${warnId}`
      })
    const axios = require('axios')
    axios.get("https://api.jmgcoding.com/checkphrase", {
      headers: {
        message: `${msg.content}`,
        'Content-Type': 'application/json',
        'User-Agent': 'ChatAndChill / AntiSwear v1.2'
      }
    }).then(function (response) {

      if (response.data.toString().includes("true")) {
        msg.delete()
        logch.send({
          embeds: [wlog]
        })
        const e = new MessageEmbed()
          .setTitle("Warning!")
          .setDescription(`${msg.author} That word is not allowed in this server! Please don't swear to not face consequences.`)
        msg.channel.send({
          embeds: [e]
        }).then(m => {
          setTimeout(() => {
            m.delete()
          }, 10000)
        })



        new warnSchema({
          _id: warnId,
          userId: user.user.id,
          reason: '[AutoMod] Using a banned word in the chat. Using bad words in public is forbidden in the server.',
          timestamp: msg.createdTimestamp,
          expires
        }).save();

        
        warnSchema.find({
          userId: user.user.id
        }, (err, data) => {
          if(err) console.log(e)
          

          if(data) {
         //   if(data.content.length > 2) {
          //     const log = new MessageEmbed()
          //   .setTitle('New Mute!')
          //   .setColor('RED')
          //   .addField('User', `${msg.author}`)
          //   .addField('Reason', 'Multiple AutoMod Infractions')
          //   .addField('Duration', '1 hour')
          //   .setTimestamp()
console.log(data.content.length)

          // var mutedEm = new MessageEmbed()
          //   .setColor('RED')
          //   .setDescription(`**${msg.author.username}** has been muted for continuous infractions`)
          // msg.channel.send({
          //   embeds: [mutedEm]
          // }).then(m => {
          //   setTimeout(() => {
          //     m.delete()
          //   }, 10000)
          // })
          // msg.member.timeout(60 * 60 * 1000, '[Automod] Innapropriate language').catch((e) => {
          //   console.log(e)
          // })
          // logch.send({
          //   embeds: [log]
          // })
          // try {
          //   var yougotmuted = new MessageEmbed()
          //     .setColor('RED')
          //     .setTitle(`You have been muted in ${msg.guild.name}`)
          //     .setDescription('You have been muted after 3 continuous infractions')
          //     .addField('Reason', 'Multiple AutoMod Infractions')
          //     .addField('Expires', '1h')
          //   msg.author.send({
          //     embeds: [yougotmuted]
          //   })

          // } catch (err) {
          //   console.log(err)
          // }
          //   } 
        }
        })

         // end of 3 ...

        //  msg.member.timeout(5 * 60 * 1000, '[Automod] Innapropriate language').then(() => {
        // 	 try {
        // 		 const dm = new MessageEmbed()
        // 		 .setTitle("You have recieved a mute.")
        // 		 .setDescription("Our automoderation systems have muted you for 5 minutes for innapropriate language.")
        try {
          msg.author.send({
            embeds: [dm]
          })
        } catch (e) {

        }








      } else {
        const array = ['kys', 'kill yourself', 'kill urself', 'go die', 'kill ur self', 'kill your self', 'die']
        if (array.some(w => ` ${msg.content.toLowerCase()} `.includes(` ${w} `))) { //thatll see if it includes the array
          const blog = new MessageEmbed()
            .setTitle('New BAN!')
            .setColor('RED')
            .addField('User', `${msg.author}`)
            .addField('Reason', 'Telling someone to die')
            .addField('Duration', 'Permanent')
            .setTimestamp()
          msg.delete()
          logch.send({
            embeds: [blog]
          })
          msg.member.ban({
            'reason': '[Automod] Telling users to kill themselves'
          }).catch((e) => {
            console.log(e)
          })


        }
      }
    }).catch((e) => {
      console.log("An error occoured" + e)
    })

  })


}
