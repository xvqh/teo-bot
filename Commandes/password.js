const crypto = require("crypto")

module.exports = {
    name: "password",
    description: "Génère un mot de passe aléatoire.",
    permissions: "Aucune",
    dm: true,
    options: [
        {
            type: "integer",
            name: "nombre",
            description: "le nombre de lettres par défaut 12 caractères.",
            required: false
            
        }
    ],

    async run(client, interaction) {
        const nombre = interaction.options.getInteger('nombre') || 12;
        
        const password = crypto.randomBytes(nombre).toString('hex').slice(0, nombre);

        await interaction.reply({content: `Votre mot de passe généré : \`${password}\``, ephemeral: true});
    }
};