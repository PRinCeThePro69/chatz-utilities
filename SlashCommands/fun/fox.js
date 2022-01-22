const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const talkedRecently = new Set();
module.exports = {
    name: "fox",
    description: "Returns a cute fox picture.",
  
    
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
         if (talkedRecently.has(interaction.member.id)) {
            interaction.deferReply("Slow down!\nPlease wait 15 seconds before getting another fox");
    } else {
   const { get } = require("axios")
	 get("https://randomfox.ca/floof/", {
		 headers: {
			 'User-Agent': 'ChatAndChill / Fox v1'
		 }
	 }).then( function(response) {
		 const e = new MessageEmbed()
		 .setTitle("Howl")
		 .setDescription("Got your fox")
		 .setImage(response.data.image)

		 interaction.deferReply({
			 embeds: [e]
		 })
	 })
        talkedRecently.add(interaction.member.id);
        setTimeout(() => {
          talkedRecently.delete(interaction.member.id);
        }, 15000);
    }
    },
};
