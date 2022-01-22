const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require('ms')
const warnSchema = require('../../models/punishments')

module.exports = {
    name: "warnings",
    description: "Shows the warnings of a user.",

    
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
     const user = interaction.member;

        const userWarnings = await warnSchema.find({
            userId: user.id,

        })
        
     if(!userWarnings?.length) return interaction.followUp({ content: `Woo Hoo! You don't have any strikes in the server.`});
   
     const embedDesc = userWarnings.map((warn) => {
        const moderator = interaction.guild.members.cache.get(warn.staffId);
        return[
            `**ID: ${warn.id} | Moderator: ${moderator}**`,
            `**${warn.type}** - ${warn.reason} - <t:${Math.round(+warn.timestamp/1000)}:F>`

        ].join("\n");
    }).join('\n\n')
    
    const rep = new MessageEmbed()
    .setTitle(`${user.user.username}'s punishment history.`)
    .setDescription(embedDesc)
    .setColor('RANDOM')
    

    interaction.followUp({ embeds: [rep]})
}
}
