const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js'); // Remplacez 'chemin-vers-vos-constructeurs' par le chemin réel
const Discord = require("discord.js")
const config = require("../config")
const fs = require("fs")
const { ChannelType } = require("discord.js")

module.exports = async (client, interaction) => {

    if(interaction.type === Discord.InteractionType.ApplicationCommand) {

        let command = require(`../Commandes/${interaction.commandName}`)
        command.run(client, interaction, interaction.options)
    }
    if (interaction.isStringSelectMenu()) {
        if (interaction.customId === 'help') {
            if (interaction.user.id !== client.initiators[interaction.message.interaction.id]) {
                return interaction.reply({
                    content: "Vous n'avez pas l'autorisation de faire cela.",
                    ephemeral: true
                });
            }
            let embed;
            const commands = ['/ping', '/invite', '/botinfo', '/uptime', '/support'];
            const formattedCommands = commands.map(cmd => `\`${cmd}\``).join(', ');


            const utils = ['/help', '/date', '/userinfo', '/covid', '/clear', '/weather', '/timer', '/github', '/afk', '/firstmessage', '/annonce', '/invites', '/nuke', '/serverinfo','/slowmode', '/create-invite', '/bin', '/emoji-info', '/google', '/qrcode', '/calculate', '/call', '/autorole on-off', '/password'];
            const util = utils.map(cmd => `\`${cmd}\``).join(', ');

            const mods = ['/kick', '/ban', '/mute', '/unmute', '/warn', '/infraction', '/unwarn', '/lock', '/unlock', '/anti insulte', '/anti lien', '/anti spam', '/anti join', '/unban'];
            const mod = mods.map(cmd => `\`${cmd}\``).join(', ');

            const funs = ['8ball', 'say', 'gif', 'ship', 'hack', 'translate', 'howgay', 'akinator', 'joke', 'snake', '/pendu', 'memory', 'demineur', 'find-emoji'];
            const fun = funs.map(cmd => `\`${cmd}\``).join(', ');

            const sondages = ['/suggest', 'config-suggest', '/simple-poll'];
            const sondage = sondages.map(cmd => `\`${cmd}\``).join(', ');

            const gws = ['/gcreate', '/greroll', '/gend', '/gdelete'];
            const gw = gws.map(cmd => `\`${cmd}\``).join(', ');


            const systèmes = ['/config suggestion', '/config level', '/config ticket'];
            const système = systèmes.map(cmd => `\`${cmd}\``).join(', ');

            const tics = ['/ticket', '/add', '/remove'];
            const tic = tics.map(cmd => `\`${cmd}\``).join(', ');

            const levs = ['rank', 'top-level', 'resetlevel', 'add-xp'];
            const lev = levs.map(cmd => `\`${cmd}\``).join(', ');

            switch (interaction.values[0]) {
                case 'robot':
                    embed = new EmbedBuilder()
                        .setTitle('🤖 Bot ✅ Version avec les slash disponible')
                        .setDescription(formattedCommands)
                    break;
                case 'utilitaire':
                    embed = new EmbedBuilder()
                        .setTitle("⚙️ Utilitaire ✅ Version avec les slash disponible")
                        .setDescription(util)
                    break;
                case 'modération':
                    embed = new EmbedBuilder()
                        .setTitle("👮 Modération ✅ Version avec les slash disponible")
                        .setDescription(mod)
                    break;
                case 'fun':
                    embed = new EmbedBuilder()
                        .setTitle("🎊 Fun")
                        .setDescription(fun)
                    break;
                case 'sondage':
                    embed = new EmbedBuilder()
                        .setTitle("❓ Sondage/Suggestion ✅ Version avec les slash disponible")
                        .setDescription(sondage)
                    break;
                case 'gws':
                    embed = new EmbedBuilder()
                        .setTitle("🎉 Giveaway ⚠️ Ces commandes sont uniquement utilisables avec les slash / ⚠️")
                        .setDescription(gw)
                    break;
                case 'sys':
                    embed = new EmbedBuilder()
                        .setTitle("🖥️ Système ✅ Version avec les slash disponible")
                        .setDescription(système)
                    break;
                case 'tic':
                    embed = new EmbedBuilder()
                        .setTitle("🎫 Ticket ⚠️ Ces commandes sont uniquement utilisables avec les slash / ⚠️")
                        .setDescription(tic)
                    break;
                case 'lev':
                    embed = new EmbedBuilder()
                        .setTitle(`🎚️Level 
                        NOTE : Si le config-level est désactivé, aucune des autres commandes de levels vont fonctionner !`)
                        .setDescription(lev)
                    break;
                case 'lin':
                    embed = new EmbedBuilder()
                        .setTitle("🔗Liens utiles")
                        .setDescription(`[serveur de support](${config.inviteLink}), [invite moi](${config.botinvite}).`)

            }

            if (embed) {
                await interaction.reply({ embeds: [embed], ephemeral: true });
            } else {
                await interaction.reply({ content: 'Option non reconnue.', ephemeral: true });
            }
        }
    }
    if (interaction.isButton()) {
        if (interaction.customId === 'open') {
    
            
            let ticketConfig = {};
            if (fs.existsSync('./ticket.json')) {
                ticketConfig = JSON.parse(fs.readFileSync('./ticket.json', 'utf-8'));
            }
            const categoryId = ticketConfig.categoryId;
    
            const channel = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: categoryId,  
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone,
                        deny: ['ViewChannel'],
                      },
                      {
                        id: interaction.user.id,
                        allow: ['ViewChannel'],
                      },
                ]
            });
    
            const embed = new EmbedBuilder()
                .setTitle('Ticket Ouvert')
                .setDescription('Décrivez votre problème pour que le support puisse vous aider.');
    
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('close')
                        .setLabel('Fermer le ticket')
                        .setStyle(Discord.ButtonStyle.Danger)
                );
    
            await channel.send({ content: `<@${interaction.user.id}>`, embeds: [embed], components: [row] });
            await interaction.reply({ content: `Ticket crée ${channel} !`, ephemeral: true });
    
        } else if (interaction.customId === 'close') {
            interaction.channel.delete();
        }
    }
}