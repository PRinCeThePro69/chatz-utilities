const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const talkedRecently = new Set();
module.exports = {
    name: "dog",
    description: "Returns a cute dog picture.",
  
    
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
         if (talkedRecently.has(interaction.member.id)) {
            interaction.reply("Slow down!\nPlease wait 15 seconds before getting another dog");
    } else {
   const { get } = require("axios")
	 get("https://dog.ceo/api/breeds/image/random", {
		 headers: {
			 'User-Agent': 'ChatAndChill / Dog v1'
		 }
	 }).then( function(response) {
		 const e = new MessageEmbed()
		 .setTitle("Woof")
		 .setDescription("Got your dog")
		 .setImage(response.data.message)

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
