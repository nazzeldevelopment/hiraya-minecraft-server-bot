const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'purge',
    description: 'Kick lahat ng players mula sa Minecraft server.',
    async execute(message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply('�7�4 **Wala kang sapat na permission para gamitin ito!**');
        }

        try {
            // Kunin ang listahan ng players sa server
            const playerList = await sendRconCommand('list');
            
            // I-extract ang mga pangalan ng players
            const match = playerList.match(/There are \d+\/\d+ players online: (.+)/);
            if (!match || !match[1]) {
                return message.channel.send('�7�2�1�5 **Walang players sa server!**');
            }

            const players = match[1].split(', ');

            // Kick lahat ng players
            for (const player of players) {
                await sendRconCommand(`kick ${player} Emergency server maintenance.`);
            }

            message.channel.send(`�7�3 **Successfully kicked ${players.length} players from the server!**`);
        } catch (error) {
            console.error(error);
            message.channel.send('�7�4 **Error:** Hindi ma-kick ang mga players. Siguraduhin na tama ang RCON connection.');
        }
    }
};
