const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'enchant',
    description: 'Mag-enchant ng item na hawak ng isang player.',
    args: true,
    usage: '<player> <enchantment> <level>',
    async execute(message, args) {
        if (args.length < 3) {
            return message.channel.send('❌ **Mali:** Kailangan mong maglagay ng player name, enchantment, at level.\n🔹 **Tamang Gamit:** `H!enchant <player> <enchantment> <level>`');
        }

        const player = args[0];
        const enchantment = args[1];
        const level = parseInt(args[2], 10);

        if (isNaN(level) || level <= 0) {
            return message.channel.send('❌ **Mali:** Ang enchantment level ay dapat isang valid na numero na higit sa 0.');
        }

        try {
            const response = await sendRconCommand(`enchant ${player} ${enchantment} ${level}`);
            message.channel.send(`✅ **Matagumpay!** Na-enchant ang item ni **${player}** gamit ang **${enchantment}** (Level ${level}).`);
            console.log(response);
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **Error:** Nabigo ang pag-enchant.');
        }
    }
};
