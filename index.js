import dotenv from 'dotenv';
dotenv.config();

import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify();
await fastify.register(cors);

import { Client, IntentsBitField } from 'discord.js';
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds
    ]
});

client.on('ready', () => {

    console.log(`Logged in as ${client.user.tag}, serving ${client.guilds.cache.size} guilds.`);

});

fastify.get(`/:guildId`, async (request, reply) => {

    const guildId = request.params.guildId;
    const guild = client.guilds.cache.get(guildId);

    if (!guild) {
        reply.code(200);
        return {
            error: 'Guild not found'
        }
    }

    return {
        name: guild.name,
        icon_url: guild.iconURL(),
        member_count: guild.memberCount
    }

});

// handle 404
fastify.setNotFoundHandler((request, reply) => {
    reply.code(404);
    return {
        error: 'Not found'
    }
});

client.on('guildCreate', async (guild) => {

    console.log(`Joined guild ${guild.name} (${guild.id})`);

});

client.on('guildDelete', async (guild) => {

    console.log(`Left guild ${guild.name} (${guild.id})`);

});

await fastify.listen({ port: process.env.PORT || 3000 });
await client.login(process.env.DISCORD_BOT_TOKEN);
