const client = require("../index");
const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton  } = require("discord.js");
const warnSchema = require('../models/automodSchema')

client.on("messageCreate", async (msg) => {
    if (
        msg.author.bot ||
        !msg.guild 
				    )
        return;
});
// auto mod stuff