const client = require("../index");
const {
    Client,
    Collection,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    MessageFlags
} = require("discord.js");
const sentmsgSchema = require('../models/sentonemsg');
const Levels = require('discord-xp')

client.on("messageCreate", async (msg) => {
    if (
        msg.author.bot ||
        !msg.guild
    )
        return;
const randomXp = Math.floor(math.random() * 24) + 1;
const hasLeveledUp = await Levels.appendXp(msg.author.id, msg.guild.id, randomXp)
if(hasLeveledUp) {
    const user = await Levels.fetch(msg.author.id, msg.guild.id)
    msg.channel.send({
        content: `**GG, ${msg.author}! You have just reached level __${user.level}__!**`
    })
}

});

// auto mod stuff
