
const client = require("../index");
const warnSchema = require('../models/punishments')
const autowarnSchema = require('../models/automodSchema')
client.on("ready", () => {
const members = client.guilds.cache.get('930503731974385694').memberCount
    console.log(`${client.user.tag} is Online and ready to go!`); 
		client.user.setStatus('dnd');
        const statusArray = ['over chat in Chat And Chill, WATCHING', 'Minecraft Console Edition, PLAYING', 'Chat And Chill, LISTENING', 'Chat and Chill: https://discord.gg/A2aMZy9fDP, WATCHING', `over ${members} members, WATCHING`, 'with my cool moderation, PLAYING', 'invite your friends!, LISTENING']
		setInterval(() => {
            const random = statusArray[Math.floor(Math.random() * statusArray.length)].split(", ");
            const status = random[0]
            const type = random[1]
            client.user.setActivity(status, { type });


        }, 45000);
        
        

const checkWarns = async () => {
       const now = new Date()
    const conditional = {
        expires: {
            $lt: now
        },
        type: 'Warn'
    }
    const results = await warnSchema.find(conditional)
    if(results && results.length) {
       await warnSchema.deleteMany(conditional).catch(err => console.log(err))
        console.log('deleted some warns :D')
    }  
}
setInterval(checkWarns, 1000 * 60 * 5);
const checkautow = async () => {
    const now = new Date()
 const conditional = {
     expires: {
         $lt: now
     }
 }
 const results = await autowarnSchema.find(conditional)
 if(results && results.length) {
    await autowarnSchema.deleteMany(conditional).catch(err => console.log(err))
     console.log('deleted some auto-warns :D')
 }                          
}                                               

setInterval(checkautow, 1000 * 120);
const checkBans = async () => {
    const now = new Date()
 const conditional = {
     expires: {
         $lt: now
     },
     type: 'Ban'
 }
 const results = await warnSchema.find(conditional)
for (const result of results) {
    const {userId} = result
    const guild = client.guilds.cache.get('930503731974385694')
    await guild.members.unban(userId, 'Ban Expired').then(console.log(`unbanned ${userId}`))
}  

await warnSchema.deleteMany(conditional)
}
setInterval(checkBans, 1000 * 15);
});
