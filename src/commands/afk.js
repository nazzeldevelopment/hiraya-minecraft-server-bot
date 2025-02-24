const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'afk',
    description: 'Mark a player as AFK (away from keyboard).',
    async execute(message, args) {
        if (!args[0]) return message.channel.send('❌ **Please mention a player to mark as AFK.**');
        
        try {
            await sendRconCommand(`tellraw @a {"text":"🌙 ${args[0]} is now AFK.","color":"gray"}`);
            message.channel.send(`🌙 **${args[0]} is now marked as AFK.**`);
        } catch (error) {
            message.channel.send('❌ Error setting AFK status.');
            console.error(error);
        }
    }
};
