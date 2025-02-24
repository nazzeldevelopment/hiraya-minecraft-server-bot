const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'cleareffects',
    description: 'Tanggalin ang lahat ng status effects ng isang player sa Minecraft server.',
    async execute(message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply('❌ **Wala kang sapat na permission para gamitin ito!**');
        }

        if (!args[0]) {
            return message.reply('⚠️ **Gamitin:** `H!cleareffects <player>`');
        }

        try {
            const player = args[0];
            const command = `effect clear ${player}`;

            await sendRconCommand(command);
            message.channel.send(`✅ **Tinanggal ang lahat ng effects ni** \`${player}\``);
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **Error:** Hindi matanggal ang effects. Siguraduhin na tama ang RCON connection.');
        }
    }
};
