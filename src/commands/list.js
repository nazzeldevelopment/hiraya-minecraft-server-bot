const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'list',
    description: 'Shows the list of online players.',
    async execute(message) {
        try {
            const response = await sendRconCommand('list');
            message.channel.send(`�9�4 Online Players: \`\`\`${response}\`\`\``);
        } catch (error) {
            message.channel.send('�7�4 Error fetching player list.');
            console.error(error);
        }
    }
};
