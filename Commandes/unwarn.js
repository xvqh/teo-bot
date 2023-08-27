const warnModel = require('../warns.json')
const { Success } = require('../utils/Success')
const { Error } = require('../utils/Error')
const Discord = require("discord.js")
const fs = require("fs")

module.exports = {
    name: "unwarn",
    description: "Enlève un avertissement d'un utilisateur",
    permissions: Discord.PermissionFlagsBits.ModerateMembers,
    options: [
      {
        type: "user",
        name: "user",
        description: "Identifiant d'avertissement",
        required: true,
      }
    ],
    async run(client, interaction) {
        const target = interaction.options.getUser('user');

        if (!warnModel[target.id]) return Error(interaction, `${target.user.tag} n'a pas d'avertissement.`);
    
        delete warnModel[target.id];
    
        fs.writeFileSync('../warns.json', JSON.stringify(warnModel, null, 4), 'utf-8');
        Success(interaction, `L'avertissement de ${target.tag} a été enlevé avec succès !`);
    }
}