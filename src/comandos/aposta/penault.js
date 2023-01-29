const { EmbedBuilder } = require("discord.js");
const BigNumber = require('bignumber.js');
module.exports = {
    name: "pênalti",
    aliases: ["penalti", "penalt", 'penault', 'penaulte', 'apostar', 'aposta'],
    run: async (client, message, args) => {
        var saldo = client.db.get(`${message.author.id}.saldo`)  || 0
        if(saldo < 1) return message.reply({ content: `Você não possue saldo suficiente para jogar!` })

        if(!args[0]) return message.reply({ content: `Quantos você quer apostar!\nlembrando que o minimo e 1 real\n\`exemplo: .penalti 1 40\`` })
        if(!Number(args[0])) return message.reply({ content: `Isso não e um número!` })
        if(Number(args[0]) < 1) return message.reply({ content: `O mínimo para apostar e 1 real!` })

        if(!args[1]) return message.reply({ content: `Fale quantos % de chance você quer ter a chance de ganhar!\nlembrando que o mínimo e 40 e o máximo e 1 e quanto menor a chance se você ganha você mais multiplicara seu dinheiro!\n\`exemplo: .penalti 1 40\`` })
        if(!Number(args[1])) return message.reply({ content: `Isso não e um número!` })
        if(Number(args[1]) > 40) return message.reply({ content: `O máximo e de 40% de chance escolhido pelos jogadores!` })
        if(Number(args[1]) < 10) return message.reply({ content: `O mínimo e de 10% de chance escolhido pelos jogadores!` })

        client.db.add(`${message.author.id}.vezes`, 1)
        let chance = Number(args[1])
        if(chance){
            chance = parseFloat(chance);
            if(chance >=0 && chance <=100){
                let randomNumber = Math.random();
                let threshold = chance/100;
                if(randomNumber <= threshold){
                    if(Number(args[0]) < 40) {
                        let calc = Number(args[0]) * 1.1
                        client.db.add(`${message.author.id}.saldo`, Number(calc.toFixed(6)))
                    } else if(Number(args[0]) < 35) {
                        let calc = Number(args[0]) * 1.2
                        client.db.add(`${message.author.id}.saldo`, Number(calc.toFixed(6)))
                    } else if(Number(args[0]) < 30) {
                        let calc = Number(args[0]) * 1.3
                        client.db.add(`${message.author.id}.saldo`, Number(calc.toFixed(6)))
                    } else if(Number(args[0]) < 25) {
                        let calc = Number(args[0]) * 1.4
                        client.db.add(`${message.author.id}.saldo`, Number(calc.toFixed(6)))
                    } else if(Number(args[0]) < 20) {
                        let calc = Number(args[0]) * 1.5
                        client.db.add(`${message.author.id}.saldo`, Number(calc.toFixed(6)))
                    } else if(Number(args[0]) < 11) {
                        let calc = Number(args[0]) * 1.6
                        client.db.add(`${message.author.id}.saldo`, Number(calc.toFixed(6)))
                    } else if(Number(args[0]) === 10) {
                        let calc = Number(args[0]) * 2
                        client.db.add(`${message.author.id}.saldo`, Number(calc.toFixed(6)))
                    } 

                    let saldonovo = client.db.get(`${message.author.id}.saldo`)  || 0
                    
                    client.db.add(`${message.author.id}.ganha`, 1)

                    let ganha = client.db.get(`${message.author.id}.ganha`)

                    let embedgol = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`Parabéns você acertou o gol!`)
                    .setDescription(`Seu novo saldo e de \`R$ ${saldonovo}\`, lembra-se que saque mínimo de 5 reais no discord -> https://discord.gg/kbcJeRZcpe`)

                    message.reply({ content: `https://giphy.com/gifs/soccer-gol-futebol-495S7vcopTiZDp11ZV` });
                    message.channel.send({ embeds: [embedgol] })

                    let ganhaembed = new EmbedBuilder()
                    .setColor(client.color)
                    .setDescription(`**${message.author.tag}** apostou e **ganhou**, é a **${ganha}** que ele ganha!`)
                    
                    client.channels.cache.get('1067964663700148257').send({ embeds: [ganhaembed] })
                } else {
                    let calcnegativo = Number(saldo) - Number(args[0])
                    client.db.set(`${message.author.id}.saldo`, Number(calcnegativo))

                    client.db.add(`${message.author.id}.perdeu`, 1)

                    let perdeu = client.db.get(`${message.author.id}.perdeu`)

                    let saldonovovelho = client.db.get(`${message.author.id}.saldo`)  || 0

                    let embednaogol = new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle(`O Atacante tacou na trave`)
                    .setDescription(`Infelizmente você errou o gol, seu novo saldo e de \`R$ ${saldonovovelho}\``)

                    message.reply({ embeds: [embednaogol] })

                    let perdeuembed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setDescription(`**${message.author.tag}** apostou e **perdeu**, é a **${perdeu}** que ele perde!`)

                    client.channels.cache.get('1067964663700148257').send({ embeds: [perdeuembed] })
                }
            }
        }
    }
}