require('dotenv').config();
const { Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const roles = [
    {
        id: '1194029092740280340',
        label: 'Fap 2023'
    },
    {
        id: '1194029313192898681',
        label: 'Fap 2024'
    },
];

client.on('ready', async (c) => {
    try {
        const channel = await client.channels.cache.get('1194028538488168564');
        if (!channel) return;

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Secondary)
            )
        });

        await channel.send({
            content: 'Adicione ou remora um cargo.',
            components: [row]
        });
        process.exit();
    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.TOKEN);