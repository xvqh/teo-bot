const Discord = require("discord.js")

module.exports = {
    name: "hack",
    description: "Fait semblant de hacker quelqu'un pour le fun !",
    options: [
        {
            type: "user",
            name: "cible",
            description: "La personne que vous voulez 'hacker'.",
            required: true
        }
    ],

    async run(client, interaction) {
        const user = interaction.options.getUser("cible");

        function generateFakePassword(length) {
            const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let password = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                password += characters[randomIndex];
            }
            return password;
        }

        await interaction.reply({ content: `Hacking ${user.username}...` });

        setTimeout(async () => {
            await interaction.editReply({ content: "Récupération de l'email..." });
        }, 2000);

        setTimeout(async () => {
            await interaction.editReply({ content: `${user.username}'s email est : \`${user.username}@gmail.com\`` });
        }, 4000);

        setTimeout(async () => {
            await interaction.editReply({ content: "Récupération du mot de passe..." });
        }, 6000);

        setTimeout(async () => {
            const fakePassword = generateFakePassword(8); 
            await interaction.editReply({ content: `${user.username}'s mot de passe est : \`${fakePassword}\`` });
        }, 8000);

        setTimeout(async () => {
            await interaction.editReply({ content: "Hack réussi. Ce n'était qu'une blague, n'essayez jamais de pirater quelqu'un !" });
        }, 10000);
    }
};