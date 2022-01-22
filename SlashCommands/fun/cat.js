const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const talkedRecently = new Set();
module.exports = {
    name: "cat",
    description: "Returns a cute cat picture.",
  
    
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
         if (talkedRecently.has(interaction.member.id)) {
            interaction.deferReply("Slow down!\nPlease wait 15 seconds before getting another cat");
    } else {
   const { get } = require("axios")
	 get("https://aws.random.cat/meow", {
		 headers: {
			 'User-Agent': 'ChatAndChill / Cat v1'
		 }
	 }).then( function(response) {
		 const e = new MessageEmbed()
		 .setTitle("Meow")
		 .setDescription("Got your cat")
		 .setImage(response.data.file)

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
