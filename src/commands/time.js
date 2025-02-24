const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'time',
    description: 'Baguhin o tingnan ang oras sa Minecraft server.',
    async execute(message, args) {
        if (!args[0]) {
            return message.channel.send('⏰ **Mali!** Dapat mong ilagay ang oras o "query" upang makita ang kasalukuyang oras.\n📌 **Tamang gamit:** `H!time <set/add/query> <value>`');
        }

        const action = args[0].toLowerCase();
        let command;

        if (action === 'set' && args[1]) {
            command = `time set ${args[1]}`;
        } else if (action === 'add' && args[1]) {
            command = `time add ${args[1]}`;
        } else if (action === 'query') {
            command = `time query daytime`;
        } else {
            return message.channel.send('❌ **Mali!** Maling input. Subukan ang `H!time set <value>`, `H!time add <value>`, o `H!time query`.');
        }

        try {
            const response = await sendRconCommand(command);
            message.channel.send(`✅ **Matagumpay!**\n🕰 **Server Response:**\n\`\`\`${response}\`\`\``);
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **Error:** Hindi mabago o makita ang oras.');
        }
    }
};
