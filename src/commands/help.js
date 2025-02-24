const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "help",
    description: "List all available commands.",
    execute(message, args, rcon) {
        // Kunin ang commands mula sa `bot.commands`
        const commands = message.client.commands ?? new Map();

        // I-check kung may laman ang commands
        if (commands.size === 0) {
            return message.channel.send("❌ Walang available na commands.");
        }

        // Gawin ang listahan ng commands
        const commandList = Array.from(commands.values())
            .map(cmd => `**\`${cmd.name}\`** - ${cmd.description || "No description available."}`)
            .join("\n");

        // I-format ang embed message
        const embed = new EmbedBuilder()
            .setColor("#00AAFF")
            .setTitle("📜 HirayaCraftBot Commands 📜")
            .setDescription(commandList)
            .setFooter({ text: "ℹ️ Usage: H!<command>" })
            .setTimestamp();

        // I-send ang embed message
        message.channel.send({ embeds: [embed] });
    }
};
