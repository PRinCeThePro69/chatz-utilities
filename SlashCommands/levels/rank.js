const { Client, CommandInteraction, MessageSelectMenu } = require("discord.js");
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
        const target = interaction.user

        const user = Levels.fetch(target.id, interaction.guild.id)
            
            const rank = new canvacord.Rank() // Build the Rank Card
            .setAvatar(target.displayAvatarURL({format: 'png', size: 512, dynamic: false}))
            .setCurrentXP(user.xp) // Current User Xp
            .setRequiredXP(Levels.xpFor(user.level + 1)) // We calculate the required Xp for the next level
            .setRank(user.position) // Position of the user on the leaderboard
            .setLevel(user.level) // Current Level of the user
            .setStatus(target.presence.status)
            .setProgressBar("#00FFFF")
            .setUsername(target.username)
            .setDiscriminator(target.discriminator);

            rank.build().then(data => {
                const attachment = new Discord.MessageAttachment(data, `${target.tag}.png`);
            })
            interaction.reply({attachments: [attachment]})

    },
};
