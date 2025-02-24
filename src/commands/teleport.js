const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'teleport',
    description: 'I-teleport ang isang player sa ibang player o coordinates.',
    async execute(message, args) {
        if (args.length < 2) {
            return message.channel.send('📌 **Mali!** Kulang ang impormasyon.\n📝 **Tamang gamit:** `H!teleport <player> <target/x y z>`');
        }

        const player = args[0];
        const targetOrCoords = args.slice(1).join(' ');

        // Check kung ang input ay target player o coordinates
        const isCoordinates = targetOrCoords.split(' ').length === 3 && targetOrCoords.split(' ').every(coord => !isNaN(coord));

        let command;
        if (isCoordinates) {
            command = `tp ${player} ${targetOrCoords}`;
        } else {
            command = `tp ${player} ${targetOrCoords}`;
        }

        try {
            const response = await sendRconCommand(command);
            message.channel.send(`✅ **Matagumpay!**\n🌀 **Na-teleport si ${player} papunta kay/o sa ${targetOrCoords}**\n\`\`\`${response}\`\`\``);
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **Error:** Hindi ma-teleport ang player.');
        }
    }
};
