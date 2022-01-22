const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");


module.exports = {
    name: "slowmode",
    description: "Sets the slowmode of a current channel",
    userPermissions: ['MANAGE_MESSAGES'],
    options: [
      {
        name: 'time',
        description: 'The time of slowmode you want to set.',
        type: 'INTEGER',
        required: true,
      }
    ],

    
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
          let guilld = client.guilds.cache.get('930503731974385694');
    let logch = guilld.channels.cache.get('931558609194737786')
      const time = interaction.options.getInteger('time')

		 if (time > 21600) return interaction.followUp({content: "Error: maximum time is 21600 seconds (6 hours)", ephemeral: true});
     if (time < 0) return interaction.followUp({content: "Error: minimum time is 0 seconds.", ephemeral: true});
      if (time === 0){
interaction.followUp({content: "Slowmode has been disabled."})
      }  else {
      interaction.followUp({content: `Slowmode has been set to \`${time}\` seconds.`})
      }
		interaction.channel.setRateLimitPerUser(time)
		
        const log = new MessageEmbed()
        .setTitle('Slowmode changed!')
        .setColor('RED')
        .addField('User', `${interaction.member}`)
        .addField('Channel', `${interaction.channel}`)
        .addField('Time', `${time} seconds`)
        

		logch.send({embeds: [log]})
}
}