const client = require("../index");
const{ Captcha } = require('captcha-canvas')
// path = require('path'),
// fs = require('fs') 

const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment  } = require("discord.js");


client.on("interactionCreate", async (interaction) => {
	
   if (interaction.isButton()) {
	if (interaction.customId === "verify") {
    
      
	const member = interaction.member
if (member.roles.cache.some(role => role.name === 'Verified')) {
	interaction.reply({
		content: "You are already verified.",
		ephemeral: true
	}) 
} else {
	interaction.reply({
		content: "Check your dms.",
	 	ephemeral: true
      });
//   	member.roles.add("931470565074673714")
// 		interaction.reply({
// 		content: "You are now verified.",
// 		ephemeral: true
// }) 
  const captcha = new Captcha();

  captcha.async = true;
  captcha.addDecoy()
  captcha.drawTrace()
  captcha.drawCaptcha()

const attachment = new MessageAttachment(
  await captcha.png,
  "captcha.png"
);
const embed = new MessageEmbed()
.setTitle('Please solve the captcha!')
.setDescription('Please solve the captcha in 1 minute to not get kicked and get access to the whole server.')
.setImage('attachment://captcha.png');

const msg = await member.send({
  files: [attachment],
  embeds: [embed]
});

const filter = (message) => {
  if(message.author.id !== member.id) return;
  if(message.content === captcha.text) return true;
  else member.send('That\'s the wrong captcha! Please verify again.');
};
try {
const response = await msg.channel.awaitMessages({
	filter,
	max: 1,
	time: 10000,
	errors: ['time']
});
if (response) {
member.roles.add("931470565074673714")
  member.send({
    content: "You are now verified!"
  })

}
} catch (err) {
let guilld = client.guilds.cache.get('930503731974385694');
    let logch = guilld.channels.cache.get('931558609194737786')
        const dm = new MessageEmbed()
        .setColor('BLUE')
        .setAuthor(`${client.user.username}`, client.user.avatarURL())
         .setTitle( `You have been kicked from ${interaction.guild.name}`)
        .addField(`Reason`, "[Auto] Didn't verify in time.")  .setTimestamp()
        const log = new MessageEmbed()
        .setTitle('New kick!')
        .setColor('RED')
        .addField('User', `${interaction.member}`)
        .addField('Reason', `[Auto] Didn't verify in time.`)
        .addField('Moderator', `Me lmao...`)
        .setTimestamp();
        await interaction.member.send({
          embeds: [dm]
        });
        await member.kick("[Auto] Didn't verify in time.").catch((e) => {console.log(e)})
        await logch.send({ embeds: [log]})
}

	}
	} 
}
});
//bot err a 