module.exports = {
    name: 'unlockchat',
    description: 'I-enable ulit ang global chat.',
    async execute(message) {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply('❌ Wala kang sapat na permission!');
        }

        try {
            await sendRconCommand('gamerule commandBlockOutput true');
            await sendRconCommand('gamerule sendCommandFeedback true');
            message.channel.send('🔓 Global chat ay na-enable ulit!');
        } catch (error) {
            console.error(error);
            message.channel.send('❌ Error: Hindi ma-enable ang chat.');
        }
    }
};
