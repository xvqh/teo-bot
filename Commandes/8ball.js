const Discord = require("discord.js")

module.exports = {
    name: '8ball',
    description: 'Posez une question et la boule magique 8 vous répondra !',
    permissions: "Aucune",
    options: [
        {
            type: "string",
            name: "question",
            description: "Quelle question voulez-vous poser à la boule magique ?",
            required: true,
            autocomplete: false

        }
    ],

    async run(client, interaction) {
        const answers = [
            "C'est certain.",
            "C'est décidément sûr.",
            "Sans aucun doute.",
            "Oui, définitivement.",
            "Vous pouvez compter dessus.",
            "Comme je le vois, oui.",
            "Probablement.",
            "Les perspectives sont bonnes.",
            "Oui.",
            "Les signes indiquent que oui.",
            "La réponse est floue, essayez à nouveau.",
            "Demandez plus tard.",
            "Mieux vaut ne pas vous dire maintenant.",
            "Impossible de prédire maintenant.",
            "Concentrez-vous et demandez à nouveau.",
            "Ne comptez pas dessus.",
            "Ma réponse est non.",
            "Mes sources disent non.",
            "Les perspectives ne sont pas bonnes.",
            "Très douteux."
        ];

        await interaction.reply('La boule magique réfléchit...');
        setTimeout(async () => {
            const answer = answers[Math.floor(Math.random() * answers.length)];
            await interaction.editReply(`La boule magique repond :  ${answer}`);
        }, 2000);
    },
};