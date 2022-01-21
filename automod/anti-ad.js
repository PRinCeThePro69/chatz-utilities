const { MessageEmbed } = require('discord.js')


module.exports = (client) => {
  const isInvite = async (guild, code) => {
    return await new Promise((resolve) => {
      guild.invites.fetch().then((invites) => {
        for (const invite of invites) {
          if (code === invite[0]) {
            resolve(true)
            return
          }
        }

        resolve(false)
      })
    })
  }

  client.on('messageCreate', async (message) => {
    let guilld = client.guilds.cache.get('930503731974385694');
    let logch = guilld.channels.cache.get('931558609194737786')
    if (
        message.author.bot || !message.guild) return;
    
    const { guild, member, content } = message

    const code = content.split('discord.gg/')[1]

    if (content.includes('discord.gg/')) {
      const isOurInvite = await isInvite(guild, code)
      if (!isOurInvite && !message.member.permissions.has('ADMINISTRATOR')) {
        const e = new MessageEmbed()
				.setTitle("Warning!")
				.setDescription(`${message.author} You are not allowed to advertise another discord server in this server!`)
        const log = new MessageEmbed()
        .setTitle('New Mute!')
        .setColor('RED')
        .addField('User', `${message.author}`)
        .addField('Reason', 'Advertising')
        .addField('Duration', '30 mins')
        .setTimestamp()





        message.channel.send({
					embeds: [e]
				})
        message.delete().catch((e))
      message.member.timeout(30 * 60 * 1000, '[Automod] Advertising').catch((e) => console.log(e))
      logch.send({embeds: [log]})
      }
    }
  })
}

// wat do
//checking  alt, found a used 2m xbox gamepass ultimate code
