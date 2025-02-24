const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'op',
    description: 'Bigyan ng operator (OP) status ang isang player.',
    async execute(message, args) {
        if (!args[0]) {
            return message.channel.send('⚠️ **Mali!** Dapat mong ilagay ang pangalan ng player.\n📌 **Tamang gamit:** `H!op <player>`');
        }

        const playerName = args[0];

        try {
            const response = await sendRconCommand(`op ${playerName}`);
            message.channel.send(`✅ **Matagumpay!** Si **${playerName}** ay ngayon ay OP.\n📝 **Server Response:**\n\`\`\`${response}\`\`\``);
        } catch (error) {
            console.error(error);
            message.channel.send(`❌ **Error:** Hindi mabigyan ng OP si **${playerName}**.`);
        }
    }
};
