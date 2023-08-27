const Discord = require('discord.js');
const QRCode = require('qrcode');
const { AttachmentBuilder } = require("discord.js")

module.exports = {
    name: "qrcode",
    description: "Génère un QR Code à partir du texte fourni.",
    options: [
        {
            type: 'string',
            name: 'text',
            description: 'Le texte à convertir en QR Code.',
            required: true,
            autocomplete: false
        }
    ],
    async run(client, interaction) {
        const text = interaction.options.getString('text');

        try {
            const qrBuffer = await QRCode.toBuffer(text);

            const attachment = new AttachmentBuilder(qrBuffer, 'qrcode.png');
            
            const replyOptions = {
                content: "Voici votre QR Code:",
                files: [attachment]
            };
            
            interaction.reply(replyOptions);

        } catch (error) {
            console.error(error);
            interaction.reply("Une erreur s'est produite lors de la création du QR Code.");
        }
    }
};