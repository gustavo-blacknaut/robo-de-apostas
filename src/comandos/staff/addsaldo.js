const { EmbedBuilder } = require("discord.js");
module.exports = {
    name: "add",
    run: async (client, message, args) => {
        if(message.author.id ==! '969007324310155374') {
            return
        } else if(message.author.id ==! '1063144463888814101') {
            return
        }

        let user = message.mentions.users.first() || client.users.cache.get(args[0])
        if(!user) return message.reply({ content: `Já sabe ne!` })
        if(!args[1]) return message.reply({ content: `Já sabe ne!` })

        client.db.set(`${user.id}.saldo`, Number(args[1]))
        message.reply({ content: `Pronto!` })
    }
}