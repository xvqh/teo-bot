const axios = require("axios")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "covid",
    description: "Affiche les statistiques du COVID-19.",
    permission: "Aucune",
    options: [
        {
            type: "string",
            name: "pays",
            description: "Le pays pour lequel vous voulez les statistiques.",
            required: false,
        }
    ],

    async run(client, interaction) {
        const country = interaction.options.getString('pays');
        let response;
        let isWorld = true;

        if (country) {
            try {
                response = await axios.get(`https://disease.sh/v3/covid-19/countries/${country}`);
                isWorld = false;
            } catch (error) {
                return interaction.reply('Pays non trouvé ou erreur lors de la récupération des données.');
            }
        } else {
            try {
                response = await axios.get('https://disease.sh/v3/covid-19/all');
            } catch (error) {
                return interaction.reply('Erreur lors de la récupération des données mondiales.');
            }
        }

        const data = response.data;

        const embed = new EmbedBuilder()
            .setTitle(isWorld ? 'Statistiques mondiales sur le COVID-19 🌎' : `Statistiques du COVID-19 pour ${data.country}`)
            .setColor(client.blanc)
            .addFields(
                { name: 'Cas confirmés', value: data.cases.toLocaleString(), inline: true },
                { name: 'Rétablis', value: data.recovered.toLocaleString(), inline: true },
                { name: 'Décès', value: data.deaths.toLocaleString(), inline: true }
            )
            .setTimestamp();

        interaction.reply({ embeds: [embed] });
    },
};