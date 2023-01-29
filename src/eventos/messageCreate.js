const { EmbedBuilder, Embed } = require("discord.js");
module.exports = async (client, message) => {
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {
        let embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`<:block:1039688364103827496> **|** Olá eu me chamo **Block Bot** eu sou um bot feito para ajudar outros servidores e tenho varias funções!\n<:warn:1039688369585803344> **|** Para saber todas minhas funções use o meu comando \`!info\``)
        .setFooter({ text: `${client.foo}` })
        
       return message.reply({ embeds: [embed] });
    }

    if(message.channel.type === 'dm') return 
    if(message.author.bot) return;
    if(!message.content.toLowerCase().startsWith(client.prefix)) return;
    if(!message.guild) return;
      
    let args = message.content.slice(client.prefix.length).trim().split(/ +/g)
    let cmd = args.shift().toLowerCase()
    if(cmd.length == 0) return;
    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd))
      
    if(command) {
        let embed = new EmbedBuilder()
        .setColor(client.color)
        .setTitle(`Novo comando utilizado!`)
        .setDescription(`**${message.author.tag} (${message.author.id})** acabou de usar o comando \`${cmd}\`\n\n\`\`\`${message.content}\`\`\``)

        client.channels.cache.get('1067964641826832414').send({ embeds: [embed] })

        return command.run(client, message, args)
    }
} 