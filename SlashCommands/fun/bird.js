const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const talkedRecently = new Set();
module.exports = {
    name: "bird",
    description: "Returns a cute bird picture.",
  
    
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
         if (talkedRecently.has(interaction.member.id)) {
            interaction.followUp("Slow down!\nPlease wait 15 seconds before getting another bird");
    } else {
   const { get } = require("axios")
	 get("https://some-random-api.ml/animal/birb", {
		 headers: {
			 'User-Agent': 'ChatAndChill / Bird v1'
		 }
	 }).then( function(response) {
		 const e = new MessageEmbed()
		 .setTitle("Awww")
		 .setDescription("Got your bird")
		 .setImage(response.data.image)

		 interaction.followUp({
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
