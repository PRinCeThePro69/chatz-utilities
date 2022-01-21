const client = require("../index");
const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton  } = require("discord.js");
const warnSchema = require('../models/automodSchema')

client.on("messageCreate", async (msg) => {
    if (
        msg.author.bot ||
        !msg.guild 
				    )
        return;

        if(msg.channel.id === "934082965774925824") {
            msg.member.roles.add("934082996481437746")
        }
});
// auto mod stuff
