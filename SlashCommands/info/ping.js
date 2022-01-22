const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Returns websocket ping.",
    userPermissions: ['ADMINISTRATOR'],
    
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.reply({ content: `${client.ws.ping}ms!` });
    },
};
