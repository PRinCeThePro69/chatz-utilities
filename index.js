const { Client, Collection, MessageEmbed } = require("discord.js");
require('dotenv').config()
const client = new Client({
    intents: 32767,
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
module.exports = client;
client.commands = new Collection();
const Levels = require('discord-xp')
Levels.setURL(process.env.mongo)
require("./handler/index.js")(client);

const antiAd = require('./automod/anti-ad')
const badwords = require('./automod/badwords')
const antiLink = require('./automod/anti-link')
const antispam = require('./automod/antispam');
const antiSpamping = require("./automod/anti-spamping");
const antilongMessage = require('./automod/anti-longmessage')
const anticaps = require('./automod/anti-caps')




antiAd(client)
badwords(client)
antiLink(client)
antispam(client)
antiSpamping(client)
antilongMessage(client)
anticaps(client)
client.login(process.env.token);
