const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'worldborder',
    description: 'Baguhin ang world border sa Minecraft server.',
    async execute(message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply('❌ **Wala kang sapat na permission para gamitin ito!**');
        }

        if (!args[0]) {
            return message.reply('⚠️ **Gamitin:** `H!worldborder <set/add/damage/warning> <value>`');
        }

        try {
            let command;
            const action = args[0].toLowerCase();

            switch (action) {
                case 'set':
                    if (!args[1]) return message.reply('⚠️ **Gamitin:** `H!worldborder set <size>`');
                    command = `worldborder set ${args[1]}`;
                    break;
                case 'add':
                    if (!args[1]) return message.reply('⚠️ **Gamitin:** `H!worldborder add <blocks>`');
                    command = `worldborder add ${args[1]}`;
                    break;
                case 'damage':
                    if (!args[1]) return message.reply('⚠️ **Gamitin:** `H!worldborder damage amount <value>`');
                    command = `worldborder damage amount ${args[1]}`;
                    break;
                case 'warning':
                    if (!args[1]) return message.reply('⚠️ **Gamitin:** `H!worldborder warning distance <value>`');
                    command = `worldborder warning distance ${args[1]}`;
                    break;
                default:
                    return message.reply('⚠️ **Invalid action!** Gamitin: `set`, `add`, `damage`, o `warning`.');
            }

            await sendRconCommand(command);
            message.channel.send(`✅ **Successfully executed:** \`${command}\``);
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **Error:** Hindi ma-apply ang world border settings. Siguraduhin na tama ang RCON connection.');
        }
    }
};
