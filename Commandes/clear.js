const Discord = require("discord.js")

module.exports = {

    name: "clear",
    description: "Pour Effacer des messages",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    category: "Modération",
    dm: false,
    options: [
        {
            type: "number",
            name: "nombre",
            description: "le nombre de message a supprimer",
            required: true
        },{
            type: "channel",
            name: "salon",
            description: "Le salon ou effacer les messages",
            required: false
        }
    ],
    
    async run(client, message, args) {

        let channel = args.getChannel("salon")
        if(!channel) channel = message.channel;
        if(channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply("Pas de salon !")

        let number = args.getNumber("nombre")
        if(parseInt(number) <= 0 || parseInt(number) > 100) return message.reply("Il nous faut un nombre entre `0` et `100` !")

        await message.deferReply()

        try {

            let messages = await channel.bulkDelete(parseInt(number))

            await message.followUp({content: `J'ai bien supprimé \`${messages.size}\` message(s) dans le salon ${channel} !`, ephemeral: true})

        } catch (err) {

            let messages = [...(await channel.messages.fetch()).filter(msg => !msg.interaction && (Date.now() - msg.createdAt) <= 1209600000).values()]
            if(messages.length <= 0) return message.followUp("Aucun message à supprimer car ils datent tous de plus de 14 jours !")
            await channel.bulkDelete(messages)

            await message.followUp({content: `J'ai bien supprimé \`${messages.length}\`message(s) ${channel} car les autres dataient de plus de 14 jours !`, ephemeral: true})
        }
    }
}