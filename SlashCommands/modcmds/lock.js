const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "lock",
    description: "Locks the provided channel. Locks current if none provided.",
    userPermissions: 'MANAGE_MESSAGES',
    options: [
      {
        name: 'channel',
        description: 'the channel to lock',
        type: 'CHANNEL',
        required: false,
      },
      {
        name: 'text',
        description: 'the reason/information for the members to know why the channel is locked.',
        type: 'STRING',
        required: false,
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
       const channel = interaction.options.getChannel('channel') || interaction.channel;
       const msg = interaction.options.getString('text') || 'None provided';
       const succuss = new MessageEmbed()
.setTitle('Success!')
.setColor('GREEN')
.setDescription(`${channel} has been locked.`)
.setTimestamp()
const chinfo = new MessageEmbed()
.setColor('RED')
.setTitle(':lock: Channel Locked!')
.setDescription(`This channel has been locked by the staff team.\nMore Info: ${msg}`)
   const log = new MessageEmbed()
        .setTitle('Channel Locked!')
        .setColor('RED')
        .addField('Channel', `${channel}`)
        .addField('Reason', `${msg}`)
     
        .setTimestamp()
if (channel.permissionsFor('931470565074673714').has('SEND_MESSAGES') === false) {interaction.reply("The channel is already locked.")
 // otherwise, unlock it
 } else {
       channel.permissionOverwrites.edit('931470565074673714', {
    VIEW_CHANNEL: true,
    SEND_MESSAGES: false,
    READ_MESSAGE_HISTORY: true,
    ADD_REACTIONS: false

})
interaction.reply({embeds: [succuss]})
    channel.send({embeds: [chinfo]})
    logch.send({embeds: [log]})
    }

    

    },
};