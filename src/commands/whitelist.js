const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'whitelist',
    description: 'Manage the server whitelist (add, remove, list, reload).',
    async execute(message, args) {
        if (!args.length) {
            return message.channel.send('❌ **Usage:** `H!whitelist <add/remove/list/reload> [player]`');
        }

        const action = args[0].toLowerCase();
        const player = args[1];

        if ((action === 'list' || action === 'reload') && args.length > 1) {
            return message.channel.send(`❌ **Usage:** \`H!whitelist ${action}\` (no extra arguments allowed)`);
        }

        try {
            switch (action) {
                case 'add':
                    if (!player) return message.channel.send('❌ **Please specify a player to add to the whitelist.**');
                    console.log(`[WHITELIST] Adding ${player} to the whitelist...`);
                    await sendRconCommand(`whitelist add ${player}`);
                    message.channel.send(`✅ **${player} has been added to the whitelist.**`);
                    console.log(`[WHITELIST] ${player} added successfully.`);
                    break;

                case 'remove':
                    if (!player) return message.channel.send('❌ **Please specify a player to remove from the whitelist.**');
                    console.log(`[WHITELIST] Removing ${player} from the whitelist...`);
                    await sendRconCommand(`whitelist remove ${player}`);
                    message.channel.send(`✅ **${player} has been removed from the whitelist.**`);
                    console.log(`[WHITELIST] ${player} removed successfully.`);
                    break;

                case 'list':
                    console.log(`[WHITELIST] Fetching whitelist...`);
                    const response = await sendRconCommand('whitelist list');
                    message.channel.send(`📜 **Whitelisted Players:**\n\`\`\`${response}\`\`\``);
                    console.log(`[WHITELIST] Current whitelist:\n${response}`);
                    break;

                case 'reload':
                    console.log(`[WHITELIST] Reloading whitelist...`);
                    await sendRconCommand('whitelist reload');
                    message.channel.send('🔄 **Whitelist has been reloaded.**');
                    console.log(`[WHITELIST] Whitelist reloaded successfully.`);
                    break;

                default:
                    message.channel.send('❌ **Invalid command. Use:** `H!whitelist <add/remove/list/reload> [player]`');
            }
        } catch (error) {
            console.error(`[WHITELIST ERROR] ${error.message}`);
            message.channel.send(`❌ **Error executing whitelist command: ${error.message}**`);
        }
    }
};
