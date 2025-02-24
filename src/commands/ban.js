const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'ban',
    description: 'Ban a player from the server.',
    async execute(message, args) {
        if (!args[0]) return message.channel.send('❌ **Please provide a player name to ban.**');

        const reason = args.slice(1).join(' ') || 'No reason provided';
        
        try {
            await sendRconCommand(`ban ${args[0]} ${reason}`);
            message.channel.send(`🚫 **${args[0]} has been banned.**\n📝 **Reason:** ${reason}`);
        } catch (error) {
            message.channel.send('❌ **Error banning the player.**');
            console.error(error);
        }
    }
};
