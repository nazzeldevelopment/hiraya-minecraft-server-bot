const { sendRconCommand } = require('../utils/rconUtils');

let autoResetInterval = null;

module.exports = {
    name: 'autoreset',
    description: 'I-set ang auto-reset timer ng server.',
    args: true,
    usage: '<minutes>',
    async execute(message, args) {
        const minutes = parseInt(args[0]);

        if (isNaN(minutes) || minutes <= 0) {
            return message.channel.send('❌ **Mali:** Kailangan mong maglagay ng valid na oras sa minuto.\n🔹 **Tamang Gamit:** `H!autoreset <minutes>`');
        }

        if (autoResetInterval) {
            clearInterval(autoResetInterval);
            autoResetInterval = null;
            message.channel.send('⏹️ **Auto-reset timer ay na-cancel.**');
            return;
        }

        message.channel.send(`⏳ **Auto-reset timer ay nakaset sa ${minutes} minuto.** Ang server ay magre-restart kada cycle.`);

        autoResetInterval = setInterval(async () => {
            try {
                message.channel.send('⚠️ **Server Restarting...**');
                await sendRconCommand('say Server is restarting in 10 seconds!');
                setTimeout(async () => {
                    await sendRconCommand('save-all');
                    await sendRconCommand('stop');
                }, 10000);
            } catch (error) {
                console.error(error);
                message.channel.send('❌ **Error:** Hindi gumana ang auto-reset.');
            }
        }, minutes * 60000);
    }
};
