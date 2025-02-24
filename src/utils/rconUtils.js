const { Rcon } = require("rcon-client");

let rcon = null;

async function connectRcon() {
    if (rcon) return rcon; // Huwag mag-reconnect kung connected na

    try {
        rcon = await Rcon.connect({
            host: process.env.RCON_HOST,
            port: process.env.RCON_PORT,
            password: process.env.RCON_PASSWORD
        });

        console.log("✅ RCON connected successfully!");
        return rcon;
    } catch (error) {
        console.error("❌ Failed to connect to RCON:", error);
        throw error;
    }
}

async function sendRconCommand(command) {
    if (!rcon) throw new Error("❌ RCON is not connected!");
    
    try {
        const response = await rcon.send(command);
        console.log(`📡 RCON Command Sent: ${command}`);
        return response;
    } catch (error) {
        console.error("❌ Error sending RCON command:", error);
        throw error;
    }
}

module.exports = { connectRcon, sendRconCommand };
