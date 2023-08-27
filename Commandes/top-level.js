const fs = require('fs');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "top-level",
    description: "Affiche les membres ayant les niveaux les plus élevés",
    permissions: "Aucune",
    
    async run(client, interaction) {

        const guildId = interaction.guild.id;

        if (!fs.existsSync('./level.json')) {
            return interaction.reply({ content: 'Aucune donnée de niveau trouvée.', ephemeral: true });
        }
        
        const allLevelData = JSON.parse(fs.readFileSync('./level.json', 'utf-8'));
        
        
        if (!allLevelData[guildId]) {
            return interaction.reply({ content: 'Aucune donnée de niveau trouvée pour cette guilde.', ephemeral: true });
        }
        
        const guildUserData = allLevelData[guildId];
        
        
        const sortedUsers = Object.entries(guildUserData).sort((a, b) => b[1].level - a[1].level).slice(0, 10);
        
        let description = '';
        for (let [id, data] of sortedUsers) {
            let user = await client.users.fetch(id);
            description += `<@${user.id}> - Niveau ${data.level}\n`;
        }
        
        const embed = new EmbedBuilder()
            .setTitle('Top 10 des membres')
            .setDescription(description)
            .setColor(client.blanc);
        
        interaction.reply({ embeds: [embed] });
    }
}