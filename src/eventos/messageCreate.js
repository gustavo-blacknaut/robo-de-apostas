const { EmbedBuilder, Embed } = require("discord.js");
module.exports = async (client, message) => {
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