/* eslint-disable indent */
require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
// Crieando um novo bot
const client = new Client({
    // Dando permicoes ao bot, acesso ao servidor, membros, escutar msgs e ler o conteudo das mensagens respectivamente.
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});
// Criando um event listener. O "on" e um metodo com varios eventos, no caso "ready", que realiza uma acao quando o bot esta pronto
// c referencia para client
client.on('ready', (c) => {
	console.log(`Rejeite o bom senso para tornar o impossível possível!\n${c.user.username} chegou com tudo!!!`);
});

// esse event listener/command listener que escuta as interacoes, ele que é acionado quando um slash command é executado
client.on('interactionCreate', (interaction) => {
    // testa se a interacao nao (!) foi slash command. Se for um slash command (True), ele nega o resultado, tornando um False. Assim o resto do comando é executado.
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'hey') {
        interaction.reply('hey!!');
    };
    if (interaction.commandName === 'ping') {
        interaction.reply('pong!');
    };

    if (interaction.commandName === 'soma') {
        const num1 = interaction.options.get('primeiro-numero').value;
        const num2 = interaction.options.get('segundo-numero').value;
        
        interaction.reply(`O resultado da soma é ${num1 + num2}`);
    };

    if (interaction.commandName === 'embed') {
        const embed = new EmbedBuilder()
            .setTitle('Teste Embed')
            .setDescription('Esse é um teste de uso do embed!!!')
            .setColor('Random')
            .addFields({
                name: 'botao1',
                value: '[  ]',
                inline: true
            },{
                name: 'botao2',
                value: '[  ]',
                inline: true
            },{
                name: 'botao3',
                value: '[  ]',
                inline: true
            });

            interaction.reply({embeds: [embed]});
    };
});

// event listener ativado quando uma nova mensagem é criada
client.on('messageCreate', (message) => {
    if (message.author.bot) {
        console.log(`Lagaan respondeu "${message.content}"`);
    } else {
    // retorna uma mensagem com o nome do usuário e a mensagem que ele mandou
    console.log(`O usuário ${message.author.globalName} disse: "${message.content}"`);
    };
});

// bot responde a uma mensagem específica
client.on('messageCreate', (message) => {
    // testa se a mensagem foi enviada pelo bot para evitar um loop de respostas
    if (message.author.bot) {
        return;
    }
    if (message.content === 'aew') {
        message.reply('E AEW!!!');
    }
    if (message.content === 'embed') {
        const embed = new EmbedBuilder()
            .setTitle('Teste Embed')
            .setDescription('Esse é um teste de uso do embed!!!')
            .setColor('Random')
            .addFields({
                name: 'botao1',
                value: '[  ]',
                inline: true
            },{
                name: 'botao2',
                value: '[  ]',
                inline: true
            },{
                name: 'botao3',
                value: '[  ]',
                inline: true
            });

            message.channel.send({embeds: [embed]});
    }
});
// obtem o Token do bot no arquico .env
client.login(process.env.TOKEN);