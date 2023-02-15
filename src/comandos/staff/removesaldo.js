const { EmbedBuilder } = require("discord.js");
module.exports = {
    name: "remove",
    run: async (client, message, args) => {
        if(message.author.id ==! '969007324310155374') {
            return
        } else if(message.author.id ==! '1063144463888814101') {
            return
        }

        if(!args[0]) return message.reply({ content: `Já sabe ne!` })

        let embed = new EmbedBuilder()
        .setColor(client.color)
        .setTitle(`**⚽ Conferir Pênalti**`)
        .setDescription(`
**Valor: \`${client.db.get(`${args[0]}.valor`).toFixed(2)}\`
User: \`${client.db.get(`${args[0]}.user`)}\`
Data: \`${client.db.get(`${args[0]}.data`)}\`
Pago: \`${client.db.get(`${args[0]}.pago`)}\`**
        `)
          
        message.reply({ embeds: [embed] })        
    }
}