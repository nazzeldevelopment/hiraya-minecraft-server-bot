const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'speed',
    description: 'Change player movement speed.',
    async execute(message, args) {
        if (!args[0] || isNaN(args[0])) return message.channel.send('❌ **Please provide a speed value (e.g. 1.5).**');
        
        try {
            await sendRconCommand(`attribute @p minecraft:generic.movement_speed base set ${args[0]}`);
            message.channel.send(`⚡ **Player speed set to ${args[0]}.**`);
        } catch (error) {
            message.channel.send('❌ Error changing speed.');
            console.error(error);
        }
    }
};
