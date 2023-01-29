const { EmbedBuilder } = require("discord.js");
module.exports = {
    name: "help",
    aliases: ["ajuda", "info"],
    run: async (client, message, args) => {
        let embed = new EmbedBuilder()
        .setColor(client.color)
        .setTitle(`**⚽ Robo Do Pênalti**`)
        .setDescription(`\`.penalti [Valor] [Chance de ganhar (apenas)]\n.addsaldo [Quantidade]\n.perfil [User]\`\n\n**Lembrando que o bot não e feito para roubar, quanto menos chance você colocar mais dinheiro você ganha se conseguir ganhar!**`)
      
        message.reply({ embeds: [embed] })        
    }
}