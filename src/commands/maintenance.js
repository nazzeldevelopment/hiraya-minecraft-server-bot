const { sendRconCommand } = require('../utils/rconUtils');
let maintenanceMode = false; // Default: naka-off

module.exports = {
    name: 'maintenance',
    description: 'I-toggle ang maintenance mode ng server.',
    args: false,
    usage: '',
    async execute(message) {
        maintenanceMode = !maintenanceMode; // Palitan ang state

        try {
            if (maintenanceMode) {
                await sendRconCommand('whitelist on'); // I-on ang whitelist
                await sendRconCommand('kick @a[team=!staff] "Server under maintenance. Please try again later."'); // Kick lahat maliban sa staff
                message.channel.send('⚠️ **Maintenance Mode ON!** Whitelist is enabled, and non-staff players have been kicked.');
            } else {
                await sendRconCommand('whitelist off'); // I-off ang whitelist
                message.channel.send('✅ **Maintenance Mode OFF!** Whitelist is disabled, and players can join.');
            }
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **Error:** Hindi ma-toggle ang maintenance mode.');
        }
    }
};
