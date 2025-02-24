const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'whitelistremove',
    description: 'Alisin ang isang player sa whitelist ng Minecraft server.',
    async execute(message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply('❌ **Wala kang sapat na permission para gamitin ito!**');
        }

        if (!args[0]) {
            return message.reply('⚠️ **Gamitin:** `H!whitelistremove <player>`');
        }

        try {
            const player = args[0];
            const command = `whitelist remove ${player}`;

            await sendRconCommand(command);
            message.channel.send(`✅ **Matagumpay na inalis si** \`${player}\` **sa whitelist ng server!**`);
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **Error:** Hindi maalis sa whitelist. Siguraduhin na tama ang RCON connection.');
        }
    }
};
