const fetch = require('node-fetch');

module.exports = {
    name: "joke",
    description: "Recevez une blague aléatoire en français",
    permissions: "Aucune",

    async run(client, interaction) {
        const API_URL = 'https://www.blagues-api.fr/api/random';
        const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTAwNzQyNDA3Mzc2NjI3MzA5NCIsImxpbWl0IjoxMDAsImtleSI6IlVwc1kxTG5yajNiUGNMODFWempGbnVHMG4zQ3ljQ1dWdlhGdW1mUjl4cW1wek1qQnRGIiwiY3JlYXRlZF9hdCI6IjIwMjMtMDctMjBUMTg6MjU6MDUrMDA6MDAiLCJpYXQiOjE2ODk4Nzc1MDV9.DxZ30EtxX-g5ZFLyIugzTwyWra-oqZCp55Hpn71YftE';

        try {
            await interaction.deferReply();

            const response = await fetch(API_URL, {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`
                }
            });

            const data = await response.json();

            await interaction.editReply(`${data.joke}\n\n|| ${data.answer} ||`);
        } catch (error) {
            console.error('Erreur lors de la récupération de la blague:', error);
            await interaction.editReply('Désolé, je n\'ai pas pu récupérer une blague pour le moment.');
        }
    },
};