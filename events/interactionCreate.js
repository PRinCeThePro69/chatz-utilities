const client = require("../index");



const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment  } = require("discord.js");


client.on("interactionCreate", async (interaction) => {
	
    // Slash Command Handling
    if (interaction.isCommand()) {
      
        // await interaction.deferReply({ ephemeral: false }).catch(() => {});
if(!interaction.guild) return interaction.reply('You can\'t use cmds in DMs.')
        const cmd = client.commands.get(interaction.commandName);
        if (!cmd)
            return interaction.reply({ content: "An error has occured", ephemeral: true });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }
		//verify
// moved to /verify.js
    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.commands.get(interaction.commandName);
        if (command) command.run(client, interaction);
				
    }
});
//bot err a 