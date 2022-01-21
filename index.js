const { Client, Collection, MessageEmbed } = require("discord.js");
require('dotenv').config()
const client = new Client({
    intents: 32767,
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
module.exports = client;
client.commands = new Collection();
client.slashCommands = new Collection();
require("./handler")(client);
const antiAd = require('./automod/anti-ad')
const badwords = require('./automod/badwords')
const antiLink = require('./automod/anti-link')
const antispam = require('./automod/antispam')
antiAd(client)
badwords(client)
antiLink(client)
antispam(client)
client.login(process.env.token);
const express = require("express")
const app = express()
app.get("/", (req, res) => {
	res.send("ok")
})
app.listen("8080", () => {
	console.log("express")
})
