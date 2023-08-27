const Discord = require("discord.js")
const { EmbedBuilder,  } = require("discord.js")
const intents = new Discord.IntentsBitField(3276799)
const client = new Discord.Client({intents})
const Commands = require("./Handlers/Commands")
const Events = require("./Handlers/Events")
const config = require("./config")
const fs = require("fs")
const path = require("path")
const { ChannelType } = require('discord.js');
client.initiators = {};

client.commands = new Discord.Collection()
client.noir = "#060606";
client.rouge = "#EC2A1E";
client.blanc = "#F7F9F7";
client.bleu = "#1E69EC ";

client.invites = {};

client.once('ready', () => {
  console.log('Bot en ligne !');
});

client.on('guildMemberAdd', async (member = new GuildMember) => {
  let banList;
  try {
      banList = JSON.parse(fs.readFileSync('banlist.json'));
  } catch {
      banList = [];
  }

  if (banList.includes(member.id)) {
      try {
          await member.ban({ reason: 'Utilisateur sur la liste de bannissement.' });
          console.log(`${member.user.tag} a été banni car il est sur la liste de bannissement.`);
      } catch (error) {
          console.error(`Impossible de bannir ${member.user.tag}.`);
      }
  }
});

if (!fs.existsSync('./warns.json')) {
  fs.writeFileSync('./warns.json', '{}', 'utf-8');
}

if (!fs.existsSync('./insultes.json')) {
  fs.writeFileSync('./insultes.json', JSON.stringify([]));
}

if (!fs.existsSync('./liens.json')) {
    fs.writeFileSync('./liens.json', JSON.stringify({}));
}

client.on('messageCreate', message => {
  if (message.author.bot) return;

  const insults = require('./insultes.json');
  const words = message.content.split(/\s+/);

  for (const word of words) {
      if (insults.includes(word.toLowerCase())) {
          message.delete();
          message.author.send("Votre message a été supprimé car il contient un mot interdit.");
          break;
      }
  }
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  const settings = require('./liens.json');

  
  if (settings[message.guildId]) {
      
      const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)|discord\.gg\//g;

      if (linkRegex.test(message.content)) {
          message.delete();
          message.author.send("Les liens et les invitations Discord ne sont pas autorisés dans ce serveur.");
      }
  }
});

client.on('guildMemberAdd', async (member) => {
  const settings = require('./join.json');
  const guildSettings = settings[member.guild.id];

  if (guildSettings && guildSettings.status) {
      const channel = member.guild.channels.cache.get(guildSettings.channelId);
      if (channel) {
          const embed = new EmbedBuilder()
              .setTitle("Membre expulsé")
              .setDescription(`Le membre ${member.user.tag} a essayé de rejoindre, mais le mode anti-join était activé.`)
              .setColor(client.rouge)
              .setTimestamp();
          channel.send({ embeds: [embed] });
      }

      member.kick('Mode anti-join activé.');

      if (guildSettings.attemptedJoins) {
          guildSettings.attemptedJoins.push(member.user.id);
      } else {
          guildSettings.attemptedJoins = [member.user.id];
      }

      fs.writeFileSync('./join.json', JSON.stringify(settings, null, 2));
  }
});

client.on('messageCreate', async (message) => {
    
    if (message.author.bot || !message.content) return;

    let data = {};
    if (fs.existsSync('./level.json')) {
        data = JSON.parse(fs.readFileSync('./level.json', 'utf-8'));
    }

    if (!data[message.guild.id]) data[message.guild.id] = {};

    if (!data[message.guild.id][message.author.id]) {
        data[message.guild.id][message.author.id] = {
            level: 1,
            messages: 0
        };
    }

    data[message.guild.id][message.author.id].messages += 1;

    if (data[message.guild.id][message.author.id].messages % 10 === 0) { 
        data[message.guild.id][message.author.id].level += 1;

        let levelConfig = {};
        if (fs.existsSync('./level-channel.json')) {
            levelConfig = JSON.parse(fs.readFileSync('./level-channel.json', 'utf-8'));
        }

        const notifyChannelId = levelConfig[message.guild.id];
        const notifyChannel = message.guild.channels.cache.get(notifyChannelId);
        
        if (notifyChannel && notifyChannel.type === ChannelType.GuildText) {
            await notifyChannel.send(`<@${message.author.id}> a atteint le niveau ${data[message.guild.id][message.author.id].level}!`);
        }
    }

    fs.writeFileSync('./level.json', JSON.stringify(data, null, 2));
});


client.login(config.token)
Commands(client)
Events(client)

process.on('unhandledRejection', (reason, promise) => {
    console.log('----- Unhandled Rejection at -----');
    console.log(promise);
    console.log('----- Reason -----');
    console.log(reason);
  });