const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'xp',
    description: 'Magbigay ng XP sa isang player.',
    args: true,
    usage: '<player> <amount>',
    async execute(message, args) {
        if (args.length < 2) {
            return message.channel.send('❌ **Mali:** Kailangan mong maglagay ng player name at XP amount.\n🔹 **Tamang Gamit:** `H!xp <player> <amount>`');
        }

        const player = args[0];
        const amount = parseInt(args[1], 10);

        if (isNaN(amount) || amount <= 0) {
            return message.channel.send('❌ **Mali:** Ang XP amount ay dapat isang valid na numero na higit sa 0.');
        }

        try {
            const response = await sendRconCommand(`xp add ${player} ${amount}`);
            message.channel.send(`✅ **Matagumpay!** Binigyan si **${player}** ng **${amount} XP**.`);
            console.log(response);
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **Error:** Nabigo ang pagbibigay ng XP.');
        }
    }
};
