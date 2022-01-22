const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require('ms')
const warnSchema = require('../../models/punishments')
function makeid(length) {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
   }
   return result;
}
module.exports = {
    name: "timeout",
    description: "Times a user out for a specified amount of time.",
    userPermissions: ['MODERATE_MEMBERS'],
		options: [
      {
        name: 'user',
        description: 'The user to timout.',
        type: 'USER',
        required: true,
      }, 
			{
				name: 'time',
        description: 'The amount of time the user will be timed out for.',
        type: 'STRING', 
        required: true
			}, 
			{
				name: 'reason',
				description: 'The reason for the timeout',
				type: 'STRING',
				required: true
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
       const user = interaction.options.getUser('user')
       const length = interaction.options.getString('time')
       const reason = interaction.options.getString('reason')
       const mem = interaction.guild.members.cache.get(user.id)
const muteId = makeid(16)
       const timeInMs = ms(length)
       
			        if (user === client.user) return interaction.reply({content: "You cant mute me", ephemeral: true})
			 if (mem === interaction.member) return interaction.reply({content: "You cant mute yourself", ephemeral: true})

       mem.timeout(timeInMs, `[${interaction.user.username}] ${reason}`)

        await new warnSchema({
         _id: muteId,
         userId: user.id,
         reason,
         type: 'Timeout',
         staffId: interaction.member.id,
       
         timestamp: interaction.createdTimestamp,
         
         


     }).save();
       const succ = new MessageEmbed()
       .setColor('GREEN')
       .setDescription(`:white_check_mark: Successfully timed out ${user}! || \`${muteId}\``)
       interaction.reply({embeds: [succ]})
			  const log = new MessageEmbed()
        .setTitle('New Timeout!')
        .setColor('RED')
        .addField('User', `${user}`)
        .addField('Reason', reason)
        .addField('Duration', length)
        .setFooter(`Punishment ID: ` + `${muteId}`)
        .setTimestamp()

        
				 //dis good embed? which up or down VVVVV ill say  after seeing the dm,
				 const ugotbonned = new MessageEmbed()
         .setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})
         .setColor('RANDOM')
				 .setTitle("You got timed out in Chat And Chill!")
				 .addField("**Reason**", reason)
				 .addField("**Duration**", length)
         .setFooter(`Punishment ID: ` + `${muteId}`)
         .setTimestamp()
logch.send({embeds: [log]})
				 user.send({
					 embeds: [ugotbonned]
				 })
			 .catch((e) => {
				 console.log('err'+ e)
			 })
}
}
