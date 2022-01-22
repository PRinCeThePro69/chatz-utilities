const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "unlock",
    description: "Locks the provided channel. Locks current if none provided.",
    userPermissions: ['ADMINISTRATOR'],
    options: [
      {
        name: 'channel',
        description: 'the channel to unlock',
        type: 'CHANNEL',
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
       let id = '931470565074673714'
 let ow = channel.permissionOverwrites.cache.get('931470565074673714'); 
 const log = new MessageEmbed()
        .setTitle('Channel Unlocked!')
        .setColor('GREEN')
        .addField('Channel', `${channel}`)
        .addField('Moderator', `${interaction.member}`)
     
        .setTimestamp()

if (!channel.permissionsFor('931470565074673714').has('SEND_MESSAGES') === false) {interaction.reply("The channel is already unlocked.")
 // otherwise, unlock it
 } else{ channel.permissionOverwrites.edit('931470565074673714', { VIEW_CHANNEL: true,
    SEND_MESSAGES: null,
    READ_MESSAGE_HISTORY: true,
     ADD_REACTIONS: null} );
   interaction.reply(`Channel unlocked`)
   channel.send(':unlock: The channel has been unlocked, you can chat again.')
   };
},
};