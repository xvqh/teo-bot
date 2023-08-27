const { EmbedBuilder } = require("discord.js")

const kissLinks =  [
'https://cdn.weeb.sh/images/rymvn6_wW.gif',
'https://cdn.weeb.sh/images/H1a42auvb.gif',
'https://cdn.weeb.sh/images/H1Gx2aOvb.gif',
'https://cdn.weeb.sh/images/rJrCj6_w-.gif',
'https://cdn.weeb.sh/images/B13D2aOwW.gif',
'https://cdn.weeb.sh/images/BJLP3a_Pb.gif',
'https://cdn.weeb.sh/images/Hy-oQl91z.gif',
'https://cdn.weeb.sh/images/SJINn6OPW.gif',
'https://cdn.weeb.sh/images/ByiMna_vb.gif',
'https://cdn.weeb.sh/images/rymvn6_wW.gif',
'https://cdn.weeb.sh/images/BJSdQRtFZ.gif',
'https://cdn.weeb.sh/images/S1PCJWASf.gif',
'https://cdn.weeb.sh/images/SJ3dXCKtW.gif',
'https://cdn.weeb.sh/images/HJlWhpdw-.gif',
'https://cdn.weeb.sh/images/rkde2aODb.gif',
'https://cdn.weeb.sh/images/SybPhp_wZ.gif',
'https://cdn.weeb.sh/images/rkFSiEedf.gif',
'https://cdn.weeb.sh/images/r1cB3aOwW.gif',
'https://cdn.weeb.sh/images/BJv0o6uDZ.gif',
'https://cdn.weeb.sh/images/B13D2aOwW.gif',
'https://cdn.weeb.sh/images/Skv72TuPW.gif',
'https://cdn.weeb.sh/images/S1qZksSXG.gif',
'https://cdn.weeb.sh/images/Sk1k3TdPW.gif',
'https://cdn.weeb.sh/images/S1-KXsh0b.gif',
'https://cdn.weeb.sh/images/B1yv36_PZ.gif',
'https://cdn.weeb.sh/images/BJx2l0ttW.gif'
];

module.exports = {
    name: "kiss",
    description: "Embrasse un membre",
    permissions: "Aucune",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre que vous voulez embrasser",
            required: true
        }
    ],

    async run(client, interaction) {
        const user = interaction.options.getUser('membre')
      
          const randomKiss = kissLinks[Math.floor(Math.random() * kissLinks.length)];
      
          const embed = new EmbedBuilder()
            .setDescription(`${interaction.user} embrasse ${user}`)
            .setImage(randomKiss)
            .setColor(client.blanc);
      
          interaction.reply({ embeds: [embed] });
    },
}