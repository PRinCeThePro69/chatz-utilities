const { Client, Collection, MessageEmbed } = require("discord.js");
require('dotenv').config()

const client = new Client({
    intents: 32767,
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
// client.config = require("./config.json");

// Initializing the project
require("./handler")(client);

// auto mod
const antiAd = require('./automod/anti-ad')
const badwords = require('./automod/badwords')
const antiLink = require('./automod/anti-link')
const antispam = require('./automod/antispam')



antiAd(client)
badwords(client)
antiLink(client)
antispam(client)
// bad words moved to automod/anti-swear.js






client.login(process.env.token);


console.log("NodeJS Version: " + process.version);
const express = require("express")
const app = express()
app.get("/", (req, res) => {
	res.send("ok")
})
app.listen("8080", () => {
	console.log("express")
})