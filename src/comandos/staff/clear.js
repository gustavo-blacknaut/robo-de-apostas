const { EmbedBuilder } = require("discord.js");
module.exports = {
    name: "clear",
    run: async (client, message, args) => {
        if(message.author.id ==! '969007324310155374') {
            return
        } else if(message.author.id ==! '1063144463888814101') {
            return
        }

        if(!args[0]) return message.reply({ content: `Já sabe ne!` })

        message.channel.bulkDelete(args[0])
        .then(messages => console.log(`Deleted ${messages.size} messages`))
    }
}