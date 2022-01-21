const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const talkedRecently = new Set();
module.exports = {
    name: "meme",
    description: "Returns a funny meme.",
  
    
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
         if (talkedRecently.has(interaction.member.id)) {
            interaction.followUp("Slow down!\nPlease wait 30 seconds before getting another meme");
    } else {
   const { get } = require("axios")
	 get("https://some-random-api.ml/meme", {
		 headers: {
			 'User-Agent': 'ChatAndChill / Meme v1'
		 }
	 }).then( function(response) {
		 const e = new MessageEmbed()
		 .setTitle(response.data.caption)
		 .setDescription("Got your meme")
		 .setImage(response.data.image)

		 interaction.followUp({
			 embeds: [e]
		 })
	 })
        talkedRecently.add(interaction.member.id);
        setTimeout(() => {
          talkedRecently.delete(interaction.member.id);
        }, 30000);
    }
    },
};
