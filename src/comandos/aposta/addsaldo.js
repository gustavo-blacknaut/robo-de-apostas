const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const mercadopago = require('mercadopago');
const { v4: uuidv4 } = require('uuid');
module.exports = {
    name: "addsaldo",
    aliases: ["saldoadd", "saldo-add", "add-saldo", "adicionar", "adicionar-dinheiro"],
    run: async (client, message, args) => {
        if(!args[0]) return message.reply({ content: `Fala qual valor você quer adicionar!` })
        if(!Number(args[0])) return message.reply({ content: `Isso não e um número!` })
        if(Number(args[0]) < 1) return message.reply({ content: `Valor Mínimo de recarga e de 5 reais!` })

        mercadopago.configure({
            access_token: ''
        });
        
        const paymentData = {
            description: 'Adicionar saldo',
            transaction_amount: Number(args[0]),
            payment_method_id: 'pix',
            payer: {
              email: 'emailrandol@gmail.com',
              first_name: `${message.author.id}`,
            }
        }

        await mercadopago.payment.create(paymentData)
        .then(async function (payment) {
            const fs = require('fs')
            const img2url = require("img-to-url");

            const data = `data:image/png;base64,${payment.body.point_of_interaction.transaction_data.qr_code_base64}`;
            const base64Data = data.replace(/^data:image\/png;base64,/, '');
            fs.writeFile('image.png', base64Data, 'base64', (err) => { if (err) { console.error(err); } })
            const result = await img2url.upload('./image.png').then(x => x)

            let id = uuidv4()    
            const date = new Date();
            const day = date.getDate();
            const month = date.getMonth()+1;
            const hour = date.getHours();
            const minutes = date.getMinutes();
            client.db.set(`${id}.valor`, `${Number(args[0])}`)    
            client.db.set(`${id}.user`, `${message.author.id}`)  
            client.db.set(`${id}.data`, `${day}/${month} ${hour}:${minutes}`)    
            client.db.set(`${id}.pago`, `não`)   

            let embed = new EmbedBuilder()
            .setColor(client.color)
            .setTitle(`**<a:681543065588334724:1067965042387058719> Sistema de Adicionar Saldo**`)
            .setDescription(`> **<:1040835023579926579:1067965235350224936> | VALOR:**\n\`${args[0]} reais\`\n\n> **<:1052406583394578513:1067965245311701032> | ID DO PAGAMENTO:** \n\`${id}\`\n\n> **<:1063242872616394843:1067965237212495955> | Assim que o PIX for efetuado o saldo será adicionado imediatamente**`)

            let embed2 = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`\`\`\`${payment.body.point_of_interaction.transaction_data.qr_code}\`\`\``)
            .setImage(result.result.url)

            message.author.send({ embeds: [embed, embed2] })

            var a = setInterval(async() => {
                const res = await mercadopago.payment.get(payment.body.id);
                const pagamentoStatus = res.body.status;
        
                if (pagamentoStatus === 'approved') {
                  clearInterval(a)
                  client.db.add(`${message.author.id}.saldo`, Number(args[0]).toFixed(2))
                  client.db.set(`${id}.pago`, `Sim`)   

                  let sucess = new EmbedBuilder()
                  .setDescription(`> **Pagamento confirmado** Seu saldo agora é de: \`${client.db.get(`${message.member}.saldo`).toFixed(2)} reais\``)
                  .setColor(client.color)

                  message.author.send({ embeds: [sucess] })
                }
            }, 30000)

            message.reply({ content: `⚠ **|** Verifique o seu privado, se não chegou nada abilite receber mensagens no privado!` })
        })
        .catch(console.log)
    }
}