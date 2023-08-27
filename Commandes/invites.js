const Discord = require("discord.js")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "invites",
    description: "Permet de voir combien un membre a d'invitation",
    permission: "Aucune",
    dm: true,
    options: [
      {
        type: "user",
        name: "membre",
        description: "Le membre",
        required: false
      },
    ],
  
    async run(bot, interaction) {
      
      if (!interaction.guild) {
        return interaction.reply("Cette interaction ne provient pas d'un serveur (guild).", { ephemeral: true });
      }
  
      try {
       
        const user = interaction.options.getUser('membre');
  
        
        if (!user) {
          return interaction.reply("L'utilisateur spécifié est invalide.", { ephemeral: true });
        }
  
        
        let invites = await interaction.guild.invites.fetch();
  
        
        invites = invites.filter(invite => invite.inviter.id === user.id);
  
       
        let totalInvites = 0;
        invites.forEach(invite => totalInvites += invite.uses);
  
        
        const embed = new EmbedBuilder()
          .setColor(0x2f3136)
          .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true }) })
          .setTitle("Nombre d'invitations de l'utilisateur")
          .setDescription(`${user.tag} a **${totalInvites}** invites.`)
          .setTimestamp();
  
        
        await interaction.reply({ embeds: [embed], ephemeral: true });
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des invitations :", error);
        await interaction.reply("Une erreur s'est produite lors de la récupération des invitations.", { ephemeral: true });
      }
    },
  };
