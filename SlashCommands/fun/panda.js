const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const talkedRecently = new Set();
module.exports = {
    name: "panda",
    description: "Returns a cute panda picture.",
  
    
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
         if (talkedRecently.has(interaction.member.id)) {
            interaction.reply("Slow down!\nPlease wait 15 seconds before getting another panda");
    } else {
   const { get } = require("axios")
	 get("https://some-random-api.ml/animal/panda", {
		 headers: {
			 'User-Agent': 'ChatAndChill / Panda v1'
		 }
	 }).then( function(response) {
		 const e = new MessageEmbed()
		 .setTitle("Awww")
		 .setDescription("Got your panda")
		 .setImage(response.data.image)

		 interaction.reply({
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
