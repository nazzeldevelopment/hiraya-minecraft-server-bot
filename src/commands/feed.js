const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'feed',
    description: 'Punuin ang hunger bar ng isang player.',
    args: true,
    usage: '<player>',
    async execute(message, args) {
        if (args.length < 1) {
            return message.channel.send('❌ **Mali:** Kailangan mong maglagay ng pangalan ng player.\n🔹 **Tamang Gamit:** `H!feed <player>`');
        }

        const player = args[0];

        try {
            const response = await sendRconCommand(`effect give ${player} minecraft:saturation 1 10`);
            message.channel.send(`✅ **Matagumpay!** Napuno ang hunger bar ni **${player}**.`);
            console.log(response);
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **Error:** Nabigo ang pag-feed.');
        }
    }
};
