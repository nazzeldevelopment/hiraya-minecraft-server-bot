const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'restart',
    description: 'I-restart ang Minecraft server.',
    async execute(message) {
        try {
            // Magpadala ng warning sa lahat ng players bago i-restart
            await sendRconCommand('say �9�0 Server restart in 10 seconds!');
            message.channel.send('�7�2�1�5 **Babala:** Ang server ay mare-restart sa loob ng 10 segundo.');

            // Maghintay ng 10 segundo bago mag-restart
            setTimeout(async () => {
                try {
                    const response = await sendRconCommand('restart');
                    message.channel.send('�7�3 **Matagumpay!** Ang server ay ni-restart.');
                    console.log(response);
                } catch (error) {
                    console.error(error);
                    message.channel.send('�7�4 **Error:** Nabigo ang pag-restart ng server.');
                }
            }, 10000);
        } catch (error) {
            console.error(error);
            message.channel.send('�7�4 **Error:** Hindi ma-execute ang restart command.');
        }
    }
};
