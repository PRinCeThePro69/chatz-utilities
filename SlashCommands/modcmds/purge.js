const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");


module.exports = {
    name: "purge",
    description: "Clears a number of messages from a channel.",
    userPermissions: 'MANAGE_MESSAGES',
    options: [
      {
        name: 'count',
        description: 'The number of messages you want to delete.',
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
      const count = interaction.options.getInteger('count')

		 if (count > 99) return interaction.reply({content: "Error: maximum count is 99 messages.", ephemeral: true});
     if (count < 1) return interaction.reply({content: "Error: minimum count is 1 message.", ephemeral: true});
      
		interaction.channel.bulkDelete(count + 1)
    		    let guilld = client.guilds.cache.get('930503731974385694');
    let logch = guilld.channels.cache.get('931558609194737786')
            const log = new MessageEmbed()
        .setTitle('Messages purged!')
        .setColor('RED')
        .addField('User', `${interaction.member}`)
        .addField('Channel', `${interaction.channel}`)
        .addField('Amount', `${count}`)
        .setTimestamp()

				logch.send({embeds: [log]})
}
}