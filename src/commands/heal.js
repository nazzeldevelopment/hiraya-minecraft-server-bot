const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'heal',
    description: 'Pagalingin ang isang player sa server.',
    args: true,
    usage: '<player>',
    async execute(message, args) {
        if (args.length < 1) {
            return message.channel.send('❌ **Mali:** Kailangan mong maglagay ng pangalan ng player.\n🔹 **Tamang Gamit:** `H!heal <player>`');
        }

        const player = args[0];

        try {
            const response = await sendRconCommand(`effect give ${player} minecraft:instant_health 1 10`);
            message.channel.send(`✅ **Matagumpay!** Napagaling si **${player}**.`);
            console.log(response);
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **Error:** Nabigo ang pag-heal.');
        }
    }
};
