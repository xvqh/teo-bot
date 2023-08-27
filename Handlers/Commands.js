const fs = require("fs")

module.exports = async bot => {

    fs.readdirSync("./Commandes").filter(f => f.endsWith("js")).forEach(async file => {

        let command = require(`../Commandes/${file}`)
        if(!command.name || typeof command.name !== "string") throw new TypeError(`La commande ${file.slice(0, file.length - 3)}n'a pas encore de nom !`)
        bot.commands.set(command.name, command)
        console.log(`${file} chargée avec succès !`)
    })
}