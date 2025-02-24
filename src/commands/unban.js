const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'unban',
    description: 'Alisin ang ban ng isang player sa Minecraft server.',
    args: true,
    usage: '<player>',
    async execute(message, args) {
        if (!args.length) {
            return message.channel.send('❌ **Mali:** Kailangan mong maglagay ng player name.\n🔹 **Tamang Gamit:** `H!unban <player>`');
        }

        const player = args[0];

        try {
            const response = await sendRconCommand(`pardon ${player}`);
            message.channel.send(`✅ **Matagumpay!** Inalis ang ban ni **${player}**.`);
            console.log(response);
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **Error:** Nabigo ang pag-unban ng player.');
        }
    }
};
