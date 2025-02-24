const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'unlock',
    description: 'Disable whitelist mode (unlock the server).',
    async execute(message) {
        try {
            await sendRconCommand('whitelist off');
            message.channel.send('🔓 **Server is now open for everyone.**');
        } catch (error) {
            message.channel.send('❌ Error unlocking the server.');
            console.error(error);
        }
    }
};
