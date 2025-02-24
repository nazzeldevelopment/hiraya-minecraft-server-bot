const { sendRconCommand } = require('../utils/rconUtils');

module.exports = {
    name: "gamemode",
    description: "Palitan ang gamemode ng isang player.",
    async execute(message, args) {
        if (args.length < 2) {
            return message.reply("❌ Usage: `H!gamemode <survival|creative|adventure|spectator> <player>`");
        }

        const mode = args[0].toLowerCase();
        const player = args[1];

        // Listahan ng valid game modes
        const validModes = ["survival", "creative", "adventure", "spectator"];
        if (!validModes.includes(mode)) {
            return message.reply(`❌ **Invalid gamemode.** Valid options: \`${validModes.join(", ")}\``);
        }

        try {
            await sendRconCommand(`gamemode ${mode} ${player}`);
            message.reply(`🎮 **${player}**'s gamemode changed to **${mode}**!`);
        } catch (error) {
            console.error("❌ Error changing gamemode:", error);
            message.reply("❌ Hindi mapalitan ang gamemode. Siguraduhin na ang player ay online at may tamang permissions.");
        }
    }
};
