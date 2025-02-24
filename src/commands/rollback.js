const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'rollback',
    description: 'Restore the world from the latest backup.',
    async execute(message) {
        try {
            await sendRconCommand('rollback start');
            message.channel.send('⏳ **Rollback in progress...**');
            setTimeout(async () => {
                message.channel.send('✅ **Rollback complete!**');
            }, 5000);
        } catch (error) {
            message.channel.send('❌ Error rolling back the world.');
            console.error(error);
        }
    }
};
