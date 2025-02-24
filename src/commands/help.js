const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'List all available commands.',
    execute(message, args, client) {
        const commands = client.commands.map(cmd => `**\`${cmd.name}\`** - ${cmd.description}`).join('\n');

        const embed = new EmbedBuilder()
            .setColor('#00AAFF')
            .setTitle('📜 HirayaCraftBot Commands 📜')
            .setDescription(commands)
            .setFooter({ text: 'ℹ️ Usage: H!<command>' })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
};
