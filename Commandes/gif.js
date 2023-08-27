const { EmbedBuilder } = require("discord.js")
const giphy = require("giphy-api")("W8g6R14C0hpH6ZMon9HV9FTqKs4o4rCk");

module.exports = {
    name: "gif",
    description: "Envoie un gif basé sur le sujet que vous choisissez!",
    permissions: "Aucune",
    options: [
        {
            type: "string",
            name: "sujet",
            description: "Sujet du gif que vous souhaitez",
            required: true,
            autocomplete: false
        }
    ],

    async run(client, interaction) {
        const term = interaction.options.getString('sujet');

        giphy.search(term).then(function (res) {
            if (!res.data[0]) {
                return interaction.reply({ content: `Aucun résultat trouvé pour \`${term}\`. Essayez un autre terme!`, ephemeral: true });
            }

            let id = res.data[0].id;
            let msgurl = `https://media.giphy.com/media/${id}/giphy.gif`;
            const embed = new EmbedBuilder()
                .setTitle(`Résultat pour \`${term}\``)
                .setImage(msgurl)
                .setColor(client.blanc); 

            interaction.reply({ embeds: [embed] });
        }).catch(error => {
            console.error("Erreur lors de la récupération du GIF:", error);
            interaction.reply({ content: "Erreur lors de la récupération du GIF. Veuillez réessayer plus tard.", ephemeral: true });
        });
    },
};