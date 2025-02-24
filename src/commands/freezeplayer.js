module.exports = {
    name: 'freezeplayer',
    description: 'I-freeze ang isang player (hindi makagalaw).',
    async execute(message, args) {
        if (!args[0]) return message.reply('⚠️ Gamitin: `H!freezeplayer <player>`');

        try {
            const player = args[0];
            await sendRconCommand(`effect give ${player} minecraft:slowness 1000000 255 true`);
            await sendRconCommand(`effect give ${player} minecraft:jump_boost 1000000 128 true`);
            message.channel.send(`❄️ Na-freeze si **${player}**.`);
        } catch (error) {
            console.error(error);
            message.channel.send('❌ Error: Hindi ma-freeze ang player.');
        }
    }
};
