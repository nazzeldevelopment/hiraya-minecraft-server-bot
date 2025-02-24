const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'spawn',
    description: 'I-teleport ang player pabalik sa spawn point.',
    args: true,
    usage: '<player>',
    async execute(message, args) {
        if (!args.length) {
            return message.channel.send('❌ **Mali:** Kailangan mong maglagay ng player name.\n🔹 **Tamang Gamit:** `H!spawn <player>`');
        }

        const player = args[0];

        try {
            const response = await sendRconCommand(`tp ${player} 0 64 0`);
            message.channel.send(`✅ **Matagumpay!** Na-teleport si **${player}** sa spawn.`);
            console.log(response);
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **Error:** Nabigo ang pag-teleport ng player sa spawn.');
        }
    }
};
