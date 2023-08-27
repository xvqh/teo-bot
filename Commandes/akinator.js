const akinator = require('discord.js-akinator')

module.exports = {
    name: "akinator",
    description: "Jouez au jeu Akinator !",
    permissions: "Aucune",

    async run(client, interaction) {
        akinator(interaction, {
            title: 'Akinator',
            color: "BLUE",
            footer: 'Powered by Akinator',
            loadingMessage: 'Chargement...',
            noGuess: 'Désolé, je ne peux pas trouver une réponse à cela.',
            timeEndMessage: 'Vous avez mis trop de temps à répondre! Fin du jeu.',
            stepsString: 'Question {0} sur {1}',
            winTitle: 'J\'ai gagné!',
            winDescription: 'J\'ai deviné **{0}** en **{1}** étapes',
            loseTitle: 'Vous avez gagné!',
            loseDescription: 'Je n\'ai pas pu deviner ce que vous pensiez en 20 étapes'
        });
    },
};