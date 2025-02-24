const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'clearchat',
    description: 'I-clear ang chat sa Minecraft server.',
    async execute(message) {
        try {
            // Magpapadala ng maraming empty messages para mapuno ang chat
            for (let i = 0; i < 100; i++) {
                await sendRconCommand('say ');
            }
            
            message.channel.send('🧹 **Chat Cleared!** Matagumpay na na-clear ang in-game chat.');
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **Error:** Hindi ma-clear ang chat.');
        }
    }
};
