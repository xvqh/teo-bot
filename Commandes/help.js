const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "help",
    description: "Affiche le menu help",
    permission: "Aucune",
    dm: true,
	async run(client, interaction) {
		const select = new StringSelectMenuBuilder()
        .setCustomId('help')
        .setPlaceholder('Quel type de commande souhaitez-vous voir ?')
			.addOptions(
				new StringSelectMenuOptionBuilder()
                    .setEmoji("📝")
					.setLabel('Tout')
					.setDescription('Recevoir toute les commandes dans ce salon')
					.setValue('tout'),
				new StringSelectMenuOptionBuilder()
                    .setEmoji("🤖")  
					.setLabel('Robot')
					.setDescription('Toutes les commandes concernant Téo')
					.setValue('robot'),
				new StringSelectMenuOptionBuilder()
                    .setEmoji("⚙️")
					.setLabel('Utilitaire')
					.setDescription('Toutes les commandes Utiles')
					.setValue('utilitaire'),
                new StringSelectMenuOptionBuilder()
                    .setEmoji("👮‍♂️")
					.setLabel('Modération')
					.setDescription('Toutes les commandes concernant la Modération')
					.setValue('modération'),
                new StringSelectMenuOptionBuilder()
                    .setEmoji("🎊")
					.setLabel('Fun-Amusement')
					.setDescription('Toutes les commandes concernant le divertissement, l\'amusement')
					.setValue('fun'),
                new StringSelectMenuOptionBuilder()
                    .setEmoji("❓")
					.setLabel('Sondage')
					.setDescription('Toutes les commandes concernant les sondages et les suggestions')
					.setValue('sondage'),
                new StringSelectMenuOptionBuilder()
                    .setEmoji("🎉")
					.setLabel('Giveaway')
					.setDescription('Toutes les commandes concernant les Giveaways')
					.setValue('gws'),
                new StringSelectMenuOptionBuilder()
                    .setEmoji("🖥️")
					.setLabel('Système')
					.setDescription('Toutes les commandes permettant d\'activer un système (Ex : L\'économie, level, ticket, sugg,...)')
					.setValue('sys'),
                new StringSelectMenuOptionBuilder()
                    .setEmoji("🎫")
					.setLabel('ticket')
					.setDescription('Toutes les commandes concernant le système de ticket')
					.setValue('tic'),
                new StringSelectMenuOptionBuilder()
                    .setEmoji("🎚️")
					.setLabel('level')
					.setDescription('Toutes les commandes concernant le système de level')
					.setValue('lev'),
                new StringSelectMenuOptionBuilder()
                    .setEmoji("🔗")
					.setLabel('Liens')
					.setDescription('Toutes les commandes concernant les liens utiles du bot')
					.setValue('lin'),
			);
            const row = new ActionRowBuilder()
			.addComponents(select);

            const user = interaction.user;

            const embed = new EmbedBuilder()
            .setTitle("**Quelles commandes souhaitez-vous afficher ?**")
            .setDescription(`📝: Dans ce salon

            <a:fun:1139543236386492426> Hey , je suis un bot Multifonctions remade par <@1122215934665445547>
            <:image:1139543720891531284> AJOUT DE LA COMMANDE /stats pour avoir les stats du seveur :)
            
            Besoin d'une aide plus approfondie ? avec le bot <@${client.user.id}>  utilise la commande **/call** dans ton serveur !
            `)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor(client.blanc)


		await interaction.reply({
            embeds: [embed],
			components: [row],
        });
        client.initiators[interaction.id] = interaction.user.id;
	},
};