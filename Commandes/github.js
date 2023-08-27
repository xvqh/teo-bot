const axios = require("axios")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "github",
    description: "Recherche une personne sur GitHub.",
    permissions: "Aucune",
    options: [
        {
            type: "string",
            name: "utilisateur",
            description: "Nom de l\'utilisateur GitHub",
            required: true,
            autocomplete: false
        }
    ],


    async run(client, interaction) {
        const username = interaction.options.getString('utilisateur');

        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            const user = response.data;

            const embed = new EmbedBuilder()
                .setTitle(user.login)
                .setURL(user.html_url)
                .setThumbnail(user.avatar_url)
                .addFields(
                    { name: 'Nom complet', value: user.name || 'Pas de nom spécifié', inline: true },
                    { name: 'Followers', value: user.followers.toString(), inline: true },
                    { name: 'Following', value: user.following.toString(), inline: true },
                    { name: 'Repos', value: user.public_repos.toString(), inline: true },
                    { name: 'Gists', value: user.public_gists.toString(), inline: true },
                    { name: 'Date de création', value: new Date(user.created_at).toLocaleDateString(), inline: true }
                )
                .setDescription(user.bio || 'Pas de bio spécifiée')
                .setColor(client.blanc);

            interaction.reply({ embeds: [embed] });
        } catch (error) {
            if (error.response && error.response.status === 404) {
                interaction.reply('Aucun utilisateur GitHub trouvé avec ce nom.');
            } else {
                interaction.reply('Erreur lors de la recherche sur GitHub.');
                console.error('Erreur avec la commande GitHub:', error);
            }
        }
    }
}