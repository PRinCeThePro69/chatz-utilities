
const client = require("../index");
const warnSchema = require('../models/punishments')
const autowarnSchema = require('../models/automodSchema')
client.on("ready", () => {

    console.log(`${client.user.tag} is up and ready to go!`); 
		client.user.setStatus('dnd');
		client.user.setActivity('over chat in Chat And Chill', { type: 'WATCHING' });
const checkWarns = async () => {
       const now = new Date()
    const conditional = {
        expires: {
            $lt: now
        }
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

setInterval(checkautow, 1000 * 15);
});
