module.exports = {
    name: 'muteplayer',
    description: 'I-mute ang isang player sa chat.',
    async execute(message, args) {
        if (!args[0]) return message.reply('⚠️ Gamitin: `!muteplayer <player>`');

        try {
            const player = args[0];
            await sendRconCommand(`tellraw @a {"text":"🔇 ${player} has been muted!","color":"red"}`);
            message.channel.send(`🔇 Na-mute si **${player}** sa server.`);
        } catch (error) {
            console.error(error);
            message.channel.send('❌ Error: Hindi ma-mute ang player.');
        }
    }
};
