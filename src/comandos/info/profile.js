const { EmbedBuilder } = require("discord.js");
module.exports = {
    name: "profile",
    aliases: ["perfil", "saldo"],
    run: async (client, message, args) => {
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.member

        let saldo = client.db.get(`${user.id}.saldo`)  || 0
        let valorcolocado = client.db.get(`${user.id}.valorcolocado`)  || 0
        let valorganhado = client.db.get(`${user.id}.valorganhado`) || 0
        let retirado = client.db.get(`${user.id}.retirado`) || 0
        let aposta = client.db.get(`${user.id}.vezes`) || 0

        if(user.id === message.author.id) {
            let embed = new EmbedBuilder()
            .setColor(client.color)
            .setTitle(`**⚽ Seu Perfil de Apostas**`)
            .setDescription(`Seu Saldo: \`${saldo.toFixed(2)}\`
Total Depositado: \`${valorcolocado.toFixed(2)}\`
Total ganhado: \`${valorganhado.toFixed(2)}\`
Total retirado: \`${retirado.toFixed(2)}\`
Vezes que você apostou: \`${aposta}\`
    
**Valor mínimo de saque e 5 reais para sacar entre no ->** https://discord.gg/kbcJeRZcpe`)
          
            message.reply({ embeds: [embed] })        
        } else {
            let embed = new EmbedBuilder()
            .setColor(client.color)
            .setTitle(`**⚽ Perfil de Apostas do: ${user.username}**`)
            .setDescription(`Saldo: \`${saldo.toFixed(2)}\`
Total Depositado: \`${valorcolocado.toFixed(2)}\`
Total ganhado: \`${valorganhado.toFixed(2)}\`
Total retirado: \`${retirado.toFixed(2)}\``)
          
            message.reply({ embeds: [embed] })             
        }
    }
}