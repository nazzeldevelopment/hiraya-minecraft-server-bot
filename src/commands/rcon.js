const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'rcon',
    description: 'Send a custom RCON command to the Minecraft server.',
    async execute(message, args) {
        if (!args.length) return message.reply('⚠️ Please provide an RCON command.');

        const command = args.join(' ');
        try {
            const response = await sendRconCommand(command);
            message.channel.send(`✅ RCON Response: \`\`\`${response}\`\`\``);
        } catch (error) {
            message.channel.send('❌ Error sending RCON command.');
            console.error(error);
        }
    }
};
