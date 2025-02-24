const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'kick',
    description: 'Kick a player from the server.',
    async execute(message, args) {
        if (!args[0]) return message.channel.send('❌ **Please provide a player name to kick.**');

        const reason = args.slice(1).join(' ') || 'No reason provided';
        
        try {
            await sendRconCommand(`kick ${args[0]} ${reason}`);
            message.channel.send(`👢 **${args[0]} has been kicked.**\n📝 **Reason:** ${reason}`);
        } catch (error) {
            message.channel.send('❌ **Error kicking the player.**');
            console.error(error);
        }
    }
};
