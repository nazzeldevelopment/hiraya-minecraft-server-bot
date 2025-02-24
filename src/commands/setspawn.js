const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'setspawn',
    description: 'Itakda ang global spawn point ng Minecraft server.',
    async execute(message) {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply('❌ **Wala kang sapat na permission para gamitin ito!**');
        }

        try {
            const command = `minecraft:setworldspawn`;
            await sendRconCommand(command);
            message.channel.send('✅ **Matagumpay na naitakda ang spawn point ng server!**');
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **Error:** Hindi ma-set ang spawn point. Siguraduhin na tama ang RCON connection.');
        }
    }
};
