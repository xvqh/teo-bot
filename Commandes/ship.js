const Discord = require("discord.js")
const { description } = require("./gif")

module.exports = {
    name: "ship",
    description: "Crée un nom de couple à partir de deux pseudos.",
    permissions: "Aucune",
    options: [
        {
            type: "user",
            name: "première-personne",
            description: "La première personne du couple.",
            required: true
        },{
            type: "user",
            name: "deuxième-personne",
            description: "La deuxième personne du couple.",
            required: true
        }
    ],

    async run(client, interaction) {
        const firstPerson = interaction.options.getUser('première-personne');
    const secondPerson = interaction.options.getUser('deuxième-personne');

    if(!firstPerson || !secondPerson) {
        return interaction.reply({ content: "Veuillez sélectionner deux utilisateurs pour générer un nom de couple!", ephemeral: true });
    }

    const shipName = generateShipName(firstPerson.username, secondPerson.username);
    function generateShipName(name1, name2) {
        const part1 = name1.substring(0, name1.length / 2);
        const part2 = name2.substring(name2.length / 2);
        return part1 + part2;
    }

    interaction.reply({ content: `Le nom de couple pour ${firstPerson.username} et ${secondPerson.username} est... **${shipName}**!`, ephemeral: true });
    }
}