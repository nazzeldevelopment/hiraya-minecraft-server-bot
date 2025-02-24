const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'lock',
    description: 'Enable whitelist mode (lock the server).',
    async execute(message) {
        try {
            await sendRconCommand('whitelist on');
            message.channel.send('🔒 **Server is now locked (Whitelist Only).**');
        } catch (error) {
            message.channel.send('❌ Error locking the server.');
            console.error(error);
        }
    }
};
