const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'give',
    description: 'Bigyan ng item ang isang player sa Minecraft server.',
    async execute(message, args) {
        if (args.length < 3) {
            return message.channel.send('🎁 **Mali!** Kulang ang impormasyon.\n📌 **Tamang gamit:** `H!give <player> <item> <amount>`');
        }

        const [player, item, amount] = args;

        if (isNaN(amount) || amount <= 0) {
            return message.channel.send('❌ **Mali!** Ang dami ng item ay dapat isang valid na numero.');
        }

        try {
            const response = await sendRconCommand(`give ${player} ${item} ${amount}`);
            message.channel.send(`✅ **Matagumpay!**\n🎁 **Binibigyan si ${player} ng ${amount}x ${item}**\n\`\`\`${response}\`\`\``);
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **Error:** Hindi maibigay ang item.');
        }
    }
};
