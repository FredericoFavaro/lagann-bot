/*
Este arquivo serve exclusivamente para registrar slash commands (/comando). Ele será executado quando um comando é adicionado ou atualizado.

Será necessario obter o ID do servidor (GUILD_ID) e do bot (CLIENT_ID) no discord (modo desenvolvedor), e adiciona-los no .env
*/
require('dotenv').config();
const { REST, Routes } = require('discord.js');

// Definindo os comandos. Cada objeto dentro de commands representa um comando
const commands = [
    {
        name: 'hey',
        description: 'Replies with hey!',
    },
    {
        name: 'ping',
        description: 'pong!',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
// Essa funcao registra os slash commands
(async () => {
    try {
        console.log('Registering slash commands...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );
        console.log('Slash commands were registered successfully!');
    } catch (error) {
        console.log(`ERRO: ${error}`);
    }
})();