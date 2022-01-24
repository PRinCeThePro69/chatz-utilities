const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const axios = require('axios')
module.exports = {
    name: "ip", //are there aliases?
    description: "Check info about and IP",
    options: [
      {
        name: 'ip',
        description: 'The ip you want to look for.',
        type: 'STRING',
        required: true,
      },
    ],
    
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

      const ip = interaction.options.getString('ip')
        axios.get(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,timezone,isp,as,mobile,proxy,hosting,query`) .then(function (response) {
            if (response.data.message) return interaction.reply(`An error occoured, error: ${response.data.message}`)
            const e = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`${response.data.query} - IP info`)
            .setDescription(`Country: ${response.data.countryCode}/${response.data.country}\nRegion: ${response.data.regionName}, ${response.data.city}\nTimezone: ${response.data.timezone}\nISP: ${response.data.isp}\nASN: ${response.data.as}\nProxy: ${response.data.proxy}\nCellular: ${response.data.mobile}\nData center: ${response.data.hosting}`)
            interaction.reply({embeds: [e]})
          })
    },
};


      
    

