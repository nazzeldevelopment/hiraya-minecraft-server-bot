module.exports = {
    name: 'unmuteplayer',
    description: 'I-unmute ang isang player.',
    async execute(message, args) {
        if (!args[0]) return message.reply('⚠️ Gamitin: `!unmuteplayer <player>`');

        try {
            const player = args[0];
            await sendRconCommand(`tellraw @a {"text":"🔊 ${player} has been unmuted!","color":"green"}`);
            message.channel.send(`🔊 Na-unmute si **${player}** sa server.`);
        } catch (error) {
            console.error(error);
            message.channel.send('❌ Error: Hindi ma-unmute ang player.');
        }
    }
};
