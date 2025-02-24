const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'backup',
    description: 'Backup the world file.',
    async execute(message) {
        try {
            await sendRconCommand('save-off');
            await sendRconCommand('save-all');
            await sendRconCommand('backup start');
            message.channel.send('✅ **World backup started!**');
            setTimeout(async () => {
                await sendRconCommand('save-on');
                message.channel.send('✅ **Backup complete!**');
            }, 5000);
        } catch (error) {
            message.channel.send('❌ Error backing up the world.');
            console.error(error);
        }
    }
};
