module.exports = {
    name: 'tempban',
    description: 'Maglagay ng temporary ban sa isang player.',
    async execute(message, args) {
        if (args.length < 2) return message.reply('⚠️ Gamitin: `!tempban <player> <minutes>`');

        try {
            const [player, minutes] = args;
            await sendRconCommand(`ban ${player}`);
            setTimeout(async () => {
                await sendRconCommand(`pardon ${player}`);
                message.channel.send(`⏳ **${player}** ay na-unban matapos ang ${minutes} minuto.`);
            }, minutes * 60000);
            message.channel.send(`🚫 **${player}** ay na-ban ng ${minutes} minuto.`);
        } catch (error) {
            console.error(error);
            message.channel.send('❌ Error: Hindi ma-temp ban ang player.');
        }
    }
};
