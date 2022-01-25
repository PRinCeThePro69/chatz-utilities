const client = require("../index");
const {
    Client,
    Collection,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");

const prefix = '>'

client.on("messageCreate", async (msg) => {
    const args = msg.content.slice(prefix.length).trim().split(' ');
    const code = args.join(" ");
   
    if(msg.content.startsWith('>eval')) {
        if(msg.member.id !== '689173890450194434' && msg.member.id !== '593696963061481532' ) return msg.delete();
        if(!code) return msg?.delete()
        const args = msg.content.slice(prefix.length).trim().split(' ');
    
    
            msg.delete()
            function clean(text) {
                if (typeof(text) === "string")
                  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                else
                    return text;
              }
            try {
              const code = args.join(" ");
              let evaled = eval(code);
        
              if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);
        
             msg.channel.send(clean(evaled), {code:"xl"});
            } catch (err) {
              msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
            }


}
});

