const Discord = require("discord.js")
const mongoose = require("mongoose")
const SlashCommands = require("../Handlers/SlashCommands")
const config = require("../config")
const { ActivityType } = require("discord.js")
const afkCommand  = require("../Commandes/afk")

module.exports = async client => {

await SlashCommands(client)



client.on('messageCreate', message => {

  
  if (message.author.bot) return;

  
  const isOnlyBotMention = message.content.replace(/<@!?(\d+)>/g, '').trim() === '' && message.mentions.users.has(client.user.id);

  
  const isReplyToBot = message.reference && message.reference.messageId ? (message.channel.messages.cache.get(message.reference.messageId)?.author.id === client.user.id) : false;


  if (isOnlyBotMention && !isReplyToBot) {
      message.reply('Pourquoi me mentionnez-vous? 😊');
  }
});

client.on('messageCreate', async (message) => {
  if (!message.guild) return; 
  if (message.author.bot) return;  

  if (afkCommand.afkUsers.has(message.author.id)) {
      afkCommand.afkUsers.delete(message.author.id);
      await message.reply('Je vous ai bien enlevé le mode AFK.');
  }
});

    console.log(`${client.user.tag} est bien en ligne`)
    console.log(`> [INVITE]: https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
    client.user.setStatus('dnd');

    client.user.setActivity("Protect Bot", {
      type: ActivityType.Streaming,
      url : "https://twitch.tv/emilioottv"
    });
}