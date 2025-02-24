const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: 'weather',
    description: 'Baguhin ang panahon sa Minecraft server.',
    async execute(message, args) {
        if (!args[0]) {
            return message.channel.send('⛅ **Mali!** Kailangan mong tukuyin ang uri ng panahon.\n📌 **Tamang gamit:** `H!weather <clear/rain/thunder>`');
        }

        const weatherType = args[0].toLowerCase();
        const validWeatherTypes = ['clear', 'rain', 'thunder'];

        if (!validWeatherTypes.includes(weatherType)) {
            return message.channel.send('❌ **Mali!** Maling input. Subukan ang `H!weather clear`, `H!weather rain`, o `H!weather thunder`.');
        }

        try {
            const response = await sendRconCommand(`weather ${weatherType}`);
            message.channel.send(`✅ **Matagumpay!**\n🌦 **Server Response:**\n\`\`\`${response}\`\`\``);
        } catch (error) {
            console.error(error);
            message.channel.send('❌ **Error:** Hindi mabago ang panahon.');
        }
    }
};
