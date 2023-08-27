const { translate } = require('@vitalets/google-translate-api');

module.exports = {
    name: "translate",
    description: "Traduit un text",
    options: [
        {
            type: "string",
            name: "texte",
            description: "Texte à traduire",
            required: true,
            autocomplete: false
        },{
            type: "string",
            name: "langue",
            description: "Code langue (ex: 'en' pour anglais). Par défaut: 'en'.",
            required: false,
            autocomplete: true
        }
    ],

    async run(client, interaction) {
        const text = interaction.options.getString('texte');
        const language = interaction.options.getString('langue') || 'en';

        try {
            const result = await translate(text, { to: language });
            await interaction.reply(result.text);
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'Une erreur est survenue lors de la traduction. Assurez-vous que le code de la langue est correct.', ephemeral: true});
        }
    }
};