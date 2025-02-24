const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'lockchat',
    description: 'I-disable ang global chat sa Minecraft server.',
    async execute(message) {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply('❌ Wala kang sapat na permission!');
        }

        try {
            await sendRconCommand('gamerule commandBlockOutput false');
            await sendRconCommand('gamerule sendCommandFeedback false');
            message.channel.send('🔒 Global chat ay na-disable na!');
        } catch (error) {
            console.error(error);
            message.channel.send('❌ Error: Hindi ma-disable ang chat.');
        }
    }
};
