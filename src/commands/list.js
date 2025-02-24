const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'list',
    description: 'Shows the list of online players.',
    async execute(message) {
        try {
            const response = await sendRconCommand('list');
            message.channel.send(`📜 Online Players: \`\`\`${response}\`\`\``);
        } catch (error) {
            message.channel.send('❌ Error fetching player list.');
            console.error(error);
        }
    }
};
