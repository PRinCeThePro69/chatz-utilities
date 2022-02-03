const { Client, CommandInteraction, MessageSelectMenu, MessageAttachment } = require("discord.js");
const Levels = require('discord-xp')
const canvacord = require('canvacord');
module.exports = {
    name: "rank",
    description: "Show the level info of the executor of the command.",
    
    
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {


        const user = await Levels.fetch(interaction.user.id, interaction.guild.id, true)
            
            const rank = new canvacord.Rank() // Build the Rank Card
            .setAvatar(interaction.user.displayAvatarURL({format: 'png', size: 512, dynamic: false}))
            .setCurrentXP(user.xp) // Current User Xp
            .setRequiredXP(Levels.xpFor(user.level + 1)) // We calculate the required Xp for the next level
            .setRank(user.position) // Position of the user on the leaderboard
            .setLevel(user.level) // Current Level of the user
            
            .setProgressBar("#00FFFF")
            .setUsername(interaction.user.username)
            .setDiscriminator(interaction.user.discriminator);

            rank.build().then(data => {
                const attachment = new MessageAttachment(data, `${target.tag}.png`);
                interaction.reply({attachments: [attachment]})
            })
            

    },
};
