const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'whitelistadd',
    description: 'Magdagdag ng isang player sa whitelist ng Minecraft server.',
    async execute(message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply('�7�4 **Wala kang sapat na permission para gamitin ito!**');
        }

        if (!args[0]) {
            return message.reply('�7�2�1�5 **Gamitin:** `H!whitelistadd <player>`');
        }

        try {
            const player = args[0];
            const command = `whitelist add ${player}`;

            await sendRconCommand(command);
            message.channel.send(`�7�3 **Matagumpay na nadagdag si** \`${player}\` **sa whitelist ng server!**`);
        } catch (error) {
            console.error(error);
            message.channel.send('�7�4 **Error:** Hindi maidagdag sa whitelist. Siguraduhin na tama ang RCON connection.');
        }
    }
};
