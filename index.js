const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const SimplDB = require('simpl.db');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
    fetchReply: true
});

client.login('');

client.commands = new Collection();
client.aliases = new Collection();
client.db = new SimplDB();

client.color = "#00ff00";
client.prefix = ".";

readdirSync("./src/comandos/").forEach(dir => {
    const commands = readdirSync(`./src/comandos/${dir}/`).filter(file => file.endsWith(".js"));
    for (let file of commands) {
        let pull = require(`./src/comandos/${dir}/${file}`);
        if (pull.name) {
            client.commands.set(pull.name, pull);
        } else {
            continue;
        }
        if (pull.aliases && Array.isArray(pull.aliases)) {
            pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    }
});

readdirSync('./src/eventos/').forEach(f => {
    let pull = require(`./src/eventos/${f}`);
    client.on(f.split('.')[0], pull.bind(null, client));
});
