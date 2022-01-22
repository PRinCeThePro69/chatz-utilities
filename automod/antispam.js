const { MessageEmbed } = require('discord.js')
module.exports = (client) => {
const usersMap = new Map();
const LIMIT = 3;
const DIFF = 5000;
client.on('message', async message => {
  let guilld = client.guilds.cache.get('930503731974385694');
    let logch = guilld.channels.cache.get('931558609194737786')
    if(message.author.bot || !message.guild) return;
    if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;
        if(difference > DIFF) {
            clearTimeout(timer);
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
                console.log('Removed from map.')
            }, DIFF); 
            usersMap.set(message.author.id, userData)
        }
        else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {
         const e = new MessageEmbed()
        .setColor('RED')
	.setDescription(`${message.author} has been muted for spamming.`)
         const log = new MessageEmbed()
        .setTitle('New Mute!')
        .setColor('RED')
        .addField('User', `${message.author}`)
        .addField('Reason', 'Spamming')
          .addField('Duration', '3 hours')
        .setTimestamp()
               message.channel.send({embeds: [e]});
              message.channel.bulkDelete(LIMIT);
	       message.member.timeout(180 * 60 * 1000, '[Automod] Spam').catch((e) => console.log(e))
              logch.send({embeds: [log]})
               var yougotmuted = new MessageEmbed()
                .setColor('RED')
                .setTitle(`You have been muted in ${message.guild.name}`)
                .setDescription('You have been muted for violating our rules!')
                .addField('Reason' , '[AutoMod] Spamming in the chat which is not allowed in the server.')
                .addField('Expires' , '3 hours')
                    message.author.send({embeds: [yougotmuted]}).catch((e) => {
                      console.log(e)
                    })
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
        }
    }
    else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
        }, DIFF);
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage : message,
            timer : fn
        });
    }
})
}
