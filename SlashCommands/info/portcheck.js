const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "portcheck",
    description: "Says if the specified port is open on the specified domain.",
		options: [
      {
        name: 'ip',
        description: 'The ip you want to look for.',
        type: 'STRING',
        required: true,
      },
			{
				name: 'port',
				description: 'The port you want to check for',
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
        const ip = interaction.options.getString('ip')
				const port = interaction.options.getString('port')
				const axios = require("axios")

				axios.get(`https://api.openportcheck.net/check?ip=${ip}&port=${port}`).then(function (response) {
					var open = response.data.open;
					if (open === "true") {
						open = "open"
          } else if (open = "false"){
						open = "not open"
					}

					const e = new MessageEmbed()
					.setTitle(`Results of portcheck - ${ip}:${port}`)
					.setDescription(`Port ${port} is ${open} on ${ip}`)

					interaction.reply({
						embeds: [e]
					})
				})
    },
};

// add emot for decoration
