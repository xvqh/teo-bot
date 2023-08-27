const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const weather = require('weather-js')
const translate = require('@iamtraction/google-translate')

module.exports = {
    name: "weather",
    description: "Permet d'afficher la météo d'une ville",
    permissions: "Aucune",
    options: [
        {
            type: "string",
            name: "ville",
            description: "La Ville dont vous voulez la météo",
            required: true,
            autocomplete: true
        }
    ],
    async run(client, interaction) {
        const city = interaction.options.getString("ville")

        const Replied = await interaction.reply({ content: "Chargement...", fetchReply: true })

        weather.find({search: city, degreeType: "C"}, async function(error, result) {
            const errorembed = new EmbedBuilder()
                .setDescription("❌ La ville que vous avez indiqué est invalide !")
                .setColor("Red")

            if(result === undefined || result.length === 0) return Replied.edit({ content: null, embeds: [errorembed], ephemeral: true })

            let current = result[0].current;

            const skyText = await translate(current.skytext, { to: 'fr' })

            const embed = new EmbedBuilder()
                .setThumbnail(current.imageUrl)
                .setAuthor({ name: `Température trouvé pour ${city} (${current.observationpoint})` })
                .addFields(
                    { name: "📍 Ville", value: `\`${current.observationpoint}\``, inline: true },
                    { name: "☀️ Description :", value: `\`${skyText.text}\``, inline: true },
                    { name: "🌡️ Température :", value: `\`${current.temperature}°C\``, inline: true },
                    { name: "🌡️ Ressentie :", value: `\`${current.feelslike}°C\``, inline: true },
                    { name: "💨 Vitesse du vent :", value: `\`${current.winddisplay}\``, inline: true },
                    { name: "💧 Humidité :", value: `\`${current.humidity}%\``, inline: true },
                )
                .setColor("Random")

            Replied.edit({ content: null, embeds: [embed] })
        })
    }
};
