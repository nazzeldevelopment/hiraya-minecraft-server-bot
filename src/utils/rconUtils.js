const { Rcon } = require("rcon-client");

async function sendRconCommand(command) {
    const rcon = new Rcon({
        host: process.env.RCON_HOST,
        port: process.env.RCON_PORT,
        password: process.env.RCON_PASSWORD,
    });

    try {
        console.log("🔄 Connecting to RCON server...");
        await rcon.connect();
        console.log("✅ Successfully connected to RCON!");

        console.log(`📤 Sending command: ${command}`);
        const response = await rcon.send(command);
        console.log(`📥 Response received: ${response}`);

        console.log("🔌 Disconnecting from RCON...");
        await rcon.end();
        console.log("✅ Successfully disconnected from RCON!");

        return response;
    } catch (error) {
        console.error("❌ Error sending RCON command:", error);
        throw error;
    }
}

module.exports = { sendRconCommand };
