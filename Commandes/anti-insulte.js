const fs = require("fs")
const Discord = require("discord.js")

module.exports = {
    name: "anti-insulte",
    description: "Ajoute un mot à la liste des mots interdits",
    permissions: Discord.PermissionFlagsBits.Administrator,
    options: [
        {
            type: "string",
            name: "mot",
            description: "Le mot que vous voulez interdire",
            required: true,
        }
    ],
    async run(client, interaction) {
        const word = interaction.options.getString("mot");
        
        let insults = require('../insultes.json');
        if (insults.includes(word)) {
            return interaction.reply({ content: "Ce mot est déjà interdit.", ephemeral: true });
        }
        
        insults.push(word);
        fs.writeFileSync('./insultes.json', JSON.stringify(insults, null, 4));
        
        interaction.reply({ content: "Le mot a été ajouté à la liste des mots interdits.", ephemeral: true });
    }
};