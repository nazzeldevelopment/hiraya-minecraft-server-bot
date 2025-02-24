const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'broadcast',
    description: 'Send a server-wide message.',
    async execute(message, args) {
        if (!args.length) return message.channel.send('❌ **Please provide a message to broadcast.**');

        const announcement = args.join(' ');

        try {
            await sendRconCommand(`broadcast ${announcement}`);
            message.channel.send(`📢 **Broadcast sent:** ${announcement}`);
        } catch (error) {
            message.channel.send('❌ **Error sending broadcast message.**');
            console.error(error);
        }
    }
};
