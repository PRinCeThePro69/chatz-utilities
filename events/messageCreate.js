const client = require("../index");
const {
    Client,
    Collection,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const sentmsgSchema = require('../models/sentonemsg');


client.on("messageCreate", async (msg) => {
    if (
        msg.author.bot ||
        !msg.guild
    )
        return;

    if (msg.channel.id === "934082965774925824") {

        msg.member.roles.add("934082996481437746");
        new sentmsgSchema({
            userId: msg.author.id,
            sent: true,
        }).save();
    }
});

// auto mod stuff
