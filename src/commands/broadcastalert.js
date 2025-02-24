const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'broadcastalert',
    description: 'Magpadala ng importanteng alert message sa lahat ng players.',
    async execute(message, args) {
        if (!args.length) {
            return message.channel.send('⚠️ **Mali!** Dapat mong ilagay ang mensahe.\n📌 **Tamang gamit:** `H!broadcastalert <message>`');
        }

        const alertMessage = `[⚠️ ALERT] ${args.join(' ')}`;

        try {
            const response = await sendRconCommand(`broadcast ${alertMessage}`);
            message.channel.send(`🚨 **Alert Sent!**\n📝 **Server Response:**\n\`\`\`${response}\`\`\``);
        } catch (error) {
            console.error(error);
            message.channel.send(`❌ **Error:** Hindi maipadala ang alert message.`);
        }
    }
};
