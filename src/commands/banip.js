const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'banip',
    description: 'Ban a player by IP address.',
    async execute(message, args) {
        if (!args[0]) return message.channel.send('❌ **Please provide an IP address to ban.**');
        
        try {
            await sendRconCommand(`ban-ip ${args[0]}`);
            message.channel.send(`🚫 **Banned IP:** ${args[0]}`);
        } catch (error) {
            message.channel.send('❌ Error banning IP.');
            console.error(error);
        }
    }
};
