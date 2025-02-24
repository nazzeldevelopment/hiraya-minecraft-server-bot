const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'save',
    description: 'I-save ang progress ng Minecraft server.',
    async execute(message) {
        try {
            // I-enable ang save
            await sendRconCommand('save-all');
            message.channel.send('✅ **Matagumpay!** Lahat ng progress ay naisave.');
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **Error:** Nabigo ang pag-save ng progress.');
        }
    }
};
