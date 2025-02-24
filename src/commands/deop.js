const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'deop',
    description: 'Tanggalan ng operator (OP) status ang isang player.',
    async execute(message, args) {
        if (!args[0]) {
            return message.channel.send('⚠️ **Mali!** Dapat mong ilagay ang pangalan ng player.\n📌 **Tamang gamit:** `H!deop <player>`');
        }

        const playerName = args[0];

        try {
            const response = await sendRconCommand(`deop ${playerName}`);
            message.channel.send(`✅ **Matagumpay!** Tinanggalan ng OP si **${playerName}**.\n📝 **Server Response:**\n\`\`\`${response}\`\`\``);
        } catch (error) {
            console.error(error);
            message.channel.send(`❌ **Error:** Hindi matanggal ang OP status ni **${playerName}**.`);
        }
    }
};
