const { EmbedBuilder } = require("discord.js");

async function Success(interaction, description) {
    if(!interaction) return console.log("Il n'y a pas la variable interaction !")
    
    await interaction.reply({ content: null, embeds: [
        new EmbedBuilder()
            .setTitle("Chargement...")
            .setColor('Random')
    ], ephemeral: true })

    interaction.editReply({ content: null, embeds: [
        new EmbedBuilder()
            .setDescription(`${description}`)
            .setColor('Green')], ephemeral: true})
} 

module.exports = { Success };