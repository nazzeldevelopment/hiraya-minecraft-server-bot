const { sendRconCommand } = require("../utils/rconUtils");

module.exports = {
    name: "stop",
    description: "I-shutdown ang Minecraft server.",
    async execute(message) {
        try {
            await sendRconCommand("say ⚠️ SERVER SHUTTING DOWN IN 10 SECONDS!");
            await new Promise(resolve => setTimeout(resolve, 10000)); // 10-second delay
            await sendRconCommand("stop");

            message.channel.send("🛑 **Server is shutting down...**");
        } catch (error) {
            console.error(error);
            message.channel.send("❌ Error: Hindi ma-stop ang server.");
        }
    }
};
