const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "help",
    description: "Listahan ng lahat ng available na commands.",
    execute(message) {
        // Siguraduhin na may commands si client
        if (!message.client.commands || message.client.commands.size === 0) {
            return message.channel.send("❌ Walang available na commands.");
        }

        // I-format ang listahan ng commands
        const commands = message.client.commands.map(cmd => `**\`${cmd.name}\`** - ${cmd.description || "Walang deskripsyon."}`).join("\n");

        // Embed ng commands list
        const embed = new EmbedBuilder()
            .setColor("#00AAFF")
            .setTitle("📜 HirayaCraftBot Commands 📜")
            .setDescription(commands)
            .setFooter({ text: "ℹ️ Usage: H!<command>" })
            .setTimestamp();

        message.channel.send({ embeds: [embed] }).catch(console.error);
    }
};
