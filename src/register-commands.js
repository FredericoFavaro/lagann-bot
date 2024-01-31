/*
Este arquivo serve exclusivamente para registrar slash commands (/comando). Ele será executado quando um comando é adicionado ou atualizado.

Será necessario obter o ID do servidor (GUILD_ID) e do bot (CLIENT_ID) no discord (modo desenvolvedor), e adiciona-los no .env
*/
require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

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
    {
        // Definindo um slash command com opcoes
        name: 'soma',
        description: 'Soma dois números.',
        options: [
            {
                name: 'primeiro-numero',
                description: 'Primeiro número.',
                type: ApplicationCommandOptionType.Number,
                // Usado para definir a opcao como obrigatoria. Default = false
                required: true,
            },
            {
                name: 'segundo-numero',
                description: 'Segundo número.',
                type: ApplicationCommandOptionType.Number,
                // permite que o usuário escolha uma das opcoes disponiveis ao inves de precisar digitar o valor
                choices: [
                    {
                        name: 'dois',
                        value: 2,
                    },
                    {
                        name: 'três',
                        value: 3,
                    },
                ],
                required: true,
            },
        ]
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