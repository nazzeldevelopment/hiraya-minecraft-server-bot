const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "help",
    description: "List all available commands.",
    execute(message, args, rcon) {
        const commands = Array.from(message.client.commands?.values() || [])
            .map(cmd => `**\`${cmd.name}\`** - ${cmd.description || "No description available."}`)
            .join("\n");

        const embed = new EmbedBuilder()
            .setColor("#00AAFF")
            .setTitle("📜 HirayaCraftBot Commands 📜")
            .setDescription(commands.length > 0 ? commands : "Walang available na commands.")
            .setFooter({ text: "ℹ️ Usage: H!<command>" })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
};
