const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'restart',
    description: 'I-restart ang Minecraft server.',
    async execute(message) {
        try {
            // Magpadala ng warning sa lahat ng players bago i-restart
            await sendRconCommand('say 📢 Server restart in 10 seconds!');
            message.channel.send('⚠️ **Babala:** Ang server ay mare-restart sa loob ng 10 segundo.');

            // Maghintay ng 10 segundo bago mag-restart
            setTimeout(async () => {
                try {
                    const response = await sendRconCommand('restart');
                    message.channel.send('✅ **Matagumpay!** Ang server ay ni-restart.');
                    console.log(response);
                } catch (error) {
                    console.error(error);
                    message.channel.send('❌ **Error:** Nabigo ang pag-restart ng server.');
                }
            }, 10000);
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **Error:** Hindi ma-execute ang restart command.');
        }
    }
};
