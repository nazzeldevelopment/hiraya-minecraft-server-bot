const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'repair',
    description: 'Ayusin ang gamit ng isang player sa Minecraft server.',
    async execute(message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply('❌ **Wala kang sapat na permission para gamitin ito!**');
        }

        if (!args[0]) {
            return message.reply('⚠️ **Gamitin:** `H!repair <player>`');
        }

        try {
            const player = args[0];
            const command = `minecraft:execute as ${player} run data merge entity @s {Item:[{Count:1b,Damage:0s}]}`;
            
            await sendRconCommand(command);
            message.channel.send(`✅ **Na-repair ang gamit ni** \`${player}\``);
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **Error:** Hindi ma-repair ang gamit. Siguraduhin na tama ang RCON connection.');
        }
    }
};
