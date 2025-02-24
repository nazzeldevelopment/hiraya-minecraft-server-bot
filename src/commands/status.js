const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'status',
    description: 'Check the server status and uptime.',
    async execute(message) {
        try {
            const response = await sendRconCommand('status');
            message.channel.send(`📊 **Server Status:**\n\`\`\`${response}\`\`\``);
        } catch (error) {
            message.channel.send('❌ Error getting server status.');
            console.error(error);
        }
    }
};
