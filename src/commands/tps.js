const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'tps',
    description: 'I-check ang TPS (Ticks Per Second) ng Minecraft server.',
    async execute(message) {
        try {
            const response = await sendRconCommand('tps');
            message.channel.send(`✅ **TPS Status:**\n\`\`\`${response}\`\`\``);
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **Error:** Hindi ma-fetch ang TPS ng server.');
        }
    }
};
